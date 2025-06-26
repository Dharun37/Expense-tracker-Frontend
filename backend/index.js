const express=require('express');
const mongoose=require('mongoose');
const bodypraser =require('body-parser')
const {title}=require('process')
const app = express();
const Port =3000;
// const PORT = process.env.PORT || 3000;
const cors=require('cors');
app.use(cors());
app.use(express.urlencoded({extended:true}));
const MONGO_URI="mongodb+srv://vdharun11:dharun@cluster0.ig3xaka.mongodb.net/expense?retryWrites=true&w=majority&appName=Cluster0"

const expenseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
})
const Expense = mongoose.model('expense',expenseSchema);    

mongoose.connect(MONGO_URI)
.then(()=>{
    console.log('connected to database')
})
.catch((err)=>{
    console.log('error connecting to database',err)
})
app.use(bodypraser.json());
const schema = mongoose.Schema({

})

app.post('/expense',async(req,res)=>{
    const {title,amount}=req.body;
    if(!title||!amount){
        return res.status(400).json({error:'Title and amount are required'})
    }
    try{
        const expense =new Expense({title,amount});
        await expense.save();
        res.status(201).json(expense);
    }catch(error){
        res.status(500).json({error:'Failed to create expense'});

    }
});

app.get('/expense',async(req,res)=>{
    try{
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    }catch(error){
        res.status(500).json({error:'Failed to fetch expenses'});
    }
});
app.delete('/expense/:id',async(req,res)=>{
    const{id}=req.params;
    try{
        const deleteExpense =await Expense.findByIdAndDelete(id);
        if(!deleteExpense){
            return res.status(404).json({error:'Expense not found'});
        }
        res.status(200).json({message:'Expense delete successfully'});
    }catch(error){
        res.status(500).json({error:'Failed to delete expense'});
    }
})
app.listen(Port,(error)=>{
    if(!error)
    console.log(`server is running at http://localhost:${Port}`);
    else
    console.log("error occured, server can't start",error);

});