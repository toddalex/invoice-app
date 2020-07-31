import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

export default function InvoiceCard(props) {

 
  return (
    <div className="invoice-card-container">
      <ul className="invoice-card-list">
        <li>Name: {props.name}</li>
        <li>Email: {props.email}</li>
        <li>Due Date: {props.dueDate.split('T')[0]}</li>
        <li>Total: {props.total}</li>
      </ul>
      <div className="edit-button-container">
        <Link to="/:id"><button type="submit">EDIT</button></Link>
      </div>
    </div>
  )
}