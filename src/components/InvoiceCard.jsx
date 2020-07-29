import React from 'react';
import '../App.css'

export default function InvoiceCard(props) {
  return (
    <div className="invoice-card-container">
      <ul className="invoice-card-list">
        <li>Name: </li>
        <li>Email: </li>
        <li>Due Date: </li>
        <li>Total: </li>
      </ul>
      <div className="edit-button-container">
        <button type="submit">EDIT</button>
      </div>
    </div>
  )
}