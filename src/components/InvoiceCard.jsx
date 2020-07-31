import React from 'react';
import EditInvoiceModal from './EditInvoiceModal';
import '../App.css'

export default function InvoiceCard({ invoice }) {
  return (
    <div className="invoice-card-container">
      <ul className="invoice-card-list">
        <li>Name: {invoice.name}</li>
        <li>Email: {invoice.email}</li>
        <li>Due Date: {invoice.due_date.split('T')[0]}</li>
        <li>Total: {invoice.total}</li>
      </ul>
      <div className="edit-button-container">
        <EditInvoiceModal 
          invoice={invoice}
        />
      </div>
    </div>
  )
}