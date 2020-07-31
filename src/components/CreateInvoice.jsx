import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import LineItemList from './LineItemList'
import '../App.css'

const CreateInvoice =() => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [total, setTotal] = useState("")

  useEffect(() => {
    setTotal(0.00)
  }, []); 

  const handleInvoiceFormSave = async (e) => {
    e.preventDefault();
    const body = { name , email, dueDate, total}
    console.log(body)
    try {
      const response = await fetch('http://localhost:8080/invoices', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
      console.log(body, response)
    } catch (err) {
      console.error(err.message); 
    }  
  }
  
  return(
    <div className="invoice-container">
      <form className="invoice-form">
        <div className="input-wrapper">
          <label className="input-label">Name</label>
          <input type="text" name="name" className="input" onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div className="input-wrapper">
          <label className="input-label">Email</label>
          <input type="text" name="email" className="input"onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className="input-wrapper">
          <label className="input-label">Due Date</label>
          <input type="date" name="dueDate" onChange={(e) => setDueDate(e.target.value)}></input>
        </div>
      </form>
      {/* <LineItemList /> */}
      <div className="totals-wrapper">
        <label>TOTAL</label>
        <p>{total}</p>
      </div>
      <div className="buttonContainer">
        <Link to="/"><button type="submit">BACK</button></Link>
        <button type="submit" onClick={handleInvoiceFormSave}>CREATE</button>
      </div>
    </div>
  )
}

export default CreateInvoice;