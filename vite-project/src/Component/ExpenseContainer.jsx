import React, { useEffect, useState } from 'react'
import Expenseform from './Expenseform.jsx'
import History from './History.jsx'
import {v4 as uid} from "uuid";
import Balancecontainer from './Balancecontainer.jsx';

function ExpenseContainer() {
    const [expense, setExpense] = useState([]);
    async function fetchExpense(){
        try{
            const response = await fetch('http://localhost:3000/expense');
            if(!response.ok){
                throw new Error('network error');
            }
            const data = await response.json();

            setExpense(data);
        }catch(error){
            console.log('error fetching expenses',error);
        }
    }
    // const EXPENSE=[
    //     {
    //     id:uid(),
    //     title:"Expense 1",
    //     amount:100,
    //     },{
    //         id:uid(),
    //         title:"Expense 2",
    //         amount:-200,
    //     }
    // ]   

useEffect(()=>{
    fetchExpense();
},[]);

async function postExpense(expense){
    try{
        const response = await fetch('http://localhost:3000/expense',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
        },
    body:JSON.stringify(expense),
});
fetchExpense();
if(!response.ok){
    throw new Error('network respose was not ok');
}
    }
    catch(error){
        console.log('error posting expense',error);
    }
}
async function deleteExpensedb(id){
    try{
        const response = await fetch(`http://localhost:3000/expense/${id}`,{
            method:'DELETE',
        });

        fetchExpense();
        if(!response.ok){
            throw new Error('network response was not ok');
        }
    }
    catch(error){
        console.log('error deleting expense',error);
    }
        

}


    const addexpense=(title,amount)=>{
        postExpense({'title':title,'amount':amount})
        setExpense([
            ...expense,{
                id: uid(),
                title,
                amount,
            },
        ]);
    }
  console.log(expense);
  const deleteExpense=(id)=>{
    deleteExpensedb(id);
  }
  return (
    <div className="expense-container">
        <h1>Expense Tracker</h1>
        <Balancecontainer expense={expense}/>
        <History expense={expense} deleteExpense={deleteExpense}/>
        <Expenseform addexpense={addexpense}/>
    </div>
  )
}
export default ExpenseContainer