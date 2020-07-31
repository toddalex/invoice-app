import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InvoiceCard from './InvoiceCard';
import '../App.css'

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  const getInvoices = async () => {
    try {
      const response = await fetch('http://localhost:8080/invoices');
      const data = await response.json();
      setInvoices(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    
    getInvoices()
  }, []); 
  
  return(
    <div className="invoice-list-container">
      <Link to='/invoice'><button type="submit">Create Inovice</button></Link>
      {invoices.map(invoice => {
        return (
          <InvoiceCard 
            invoice={invoice}
            key={invoice.invoice_id}
          />
        )
      })}
    </div>
  )
}

export default InvoiceList; 