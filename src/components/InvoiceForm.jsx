import React from 'react';
import LineItemList from './LineItemList'
import '../App.css'

export default function InvoiceForm(){
  return(
    <div className="invoice-container">
      <form className="invoice-form">
        <div className="input-wrapper">
          <label className="input-label">Name</label>
          <input type="text" name="name" className="input"></input>
        </div>
        <div className="input-wrapper">
          <label className="input-label">Email</label>
          <input type="text" name="email" className="input"></input>
        </div>
        <div className="input-wrapper">
          <label className="input-label">Due Date</label>
          <input type="date" name="date"></input>
        </div>
      </form>
      <LineItemList />
      <div className="totals-wrapper">
        <label>TOTAL</label>
        <p>$0.00</p>
      </div>
      <div className="buttonContainer">
        <button type="submit">BACK</button>
        <button type="submit">DELETE</button>
        <button type="submit">SAVE</button>
      </div>
    </div>
  )
}
