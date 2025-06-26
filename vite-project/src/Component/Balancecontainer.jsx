import React from 'react'
import Currencyitem from './Currencyitem';

function Balancecontainer(props) {
    const{expense}=props;
    let income=0;
    let expenses=0;

    expense.forEach((item)=>{
        let {amount}=item;
        if(amount>0){
            income+=parseInt(amount)
        }
        else{
            expenses-=parseInt(amount)
        }
    })

  return (
    <div className='balance-container'>
        <Currencyitem title="Income" amount={income} type="income"/>
        <Currencyitem title="Expense" amount={expenses} type="income"/>
        <Currencyitem title="Balance" amount={income-expenses} type="income"/>

    </div>
  )
}

export default Balancecontainer