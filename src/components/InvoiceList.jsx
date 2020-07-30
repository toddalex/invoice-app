import React from 'react';
import InvoiceCard from './InvoiceCard';
import '../App.css'

class InvoiceList extends React.Component {

  render() {
    // const invoices = this.state.invoices.map((invoice, index) => {
    //   return <InvoiceCard name={invoice.name} email={invoice.email} date={invoice.dueDate} amout={invoice.amount}/>
    // })
    return(
      <div className="invoice-list-container">
        <InvoiceCard />
      </div>
    )
  }

}

export default InvoiceList;