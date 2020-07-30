import React from 'react';
import InvoiceCard from './InvoiceCard';
import '../App.css'

class InvoiceList extends React.Component {


 

  render() {
    return(
      <div className="invoice-list-container">
        <InvoiceCard />
      </div>
    )
  }

}

export default InvoiceList;