import React from 'react';
import EditInvoiceModal from './EditInvoiceModal';
import '../App.css'

export default function InvoiceCard({ invoice }) {
  // format date dd-mm-yyyy
  const shortenedDate = invoice.due_date.split('T')[0].split('-');
  const formattedDate = `${shortenedDate[1]}-${shortenedDate[2]}-${shortenedDate[0]}`

  return (
    <div className="invoice-card-container">
      <ul className="invoice-card-list">
        <li>Name: {invoice.name}</li>
        <li>Email: {invoice.email}</li>
        <li>Due Date: {formattedDate}</li>
        <li>Total: {invoice.total}</li>
      </ul>
      <div className="edit-button-container">
        <EditInvoiceModal invoice={invoice} />
      </div>
    </div>
  )
}