import React from 'react';

export default function LineItem(props){
  return (
    <div className="line-item-wrapper">
      <div className="line-item-input">
        <label className="input-label">Description</label>
        <input type="text" name="description"></input>
      </div>
      <div className="line-item-input">
        <label className="input-label">Amount</label>
        <input type="number" name="amount"></input>
      </div>`
    </div>
  )
}