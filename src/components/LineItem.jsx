import React from 'react';

const LineItem = (props) => {

  return (
    <div className="line-items-container">
      <p>Description: {props.description}</p>
      <p>Amount: {props.amount}</p>
    </div>
  )
}

export default LineItem;