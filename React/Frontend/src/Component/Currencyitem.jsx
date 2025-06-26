import React from 'react'

function Currencyitem(props) {
  return (
    <div className='Currency-item'>
    <div className='title'>{props.title}</div>
    <div className={`amount ${props.type}`}>${props.amount}</div>

    </div>
  )
}

export default Currencyitem