import React from 'react';
import '../App.css'

const LineItem = (props) => {

  return (
  
    <div className="line-item-display">
      <p>{props.description}</p>
      <p>{props.amount}</p>
    </div>
  )
}

export default LineItem;