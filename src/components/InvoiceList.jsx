import React from 'react';
import InvoiceCard from './InvoiceCard';
import '../App.css'

class InvoiceList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      dueDate: '',
      description: '',
      amount: '',
      total: '',
    }
  }

  render() {
    return(
      <div className="invoice-list-container">
        <InvoiceCard />
      </div>
    )
  }

}

export default InvoiceList;