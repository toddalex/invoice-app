import React from 'react';
import LineItemList from './LineItemList'
import '../App.css'

class InvoiceForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      dueDate: '',
      total: 0.00,
      invoices: [],
    }
  }

  handleInvoiceFormChange = (event) => {
    const key = event.target.name;
    this.setState({
      [key]: event.target.value
    })
  }

  handleInvoiceFormSave = () => {
    console.log(this.state)
    this.state.invoices.push(this.state)
  }

  render() {
    return(
      <div className="invoice-container">
        <form className="invoice-form">
          <div className="input-wrapper">
            <label className="input-label">Name</label>
            <input type="text" name="name" className="input" onChange={this.handleInvoiceFormChange}></input>
          </div>
          <div className="input-wrapper">
            <label className="input-label">Email</label>
            <input type="text" name="email" className="input"onChange={this.handleInvoiceFormChange}></input>
          </div>
          <div className="input-wrapper">
            <label className="input-label">Due Date</label>
            <input type="date" name="dueDate"onChange={this.handleInvoiceFormChange}></input>
          </div>
        </form>
        <LineItemList />
        <div className="totals-wrapper">
          <label>TOTAL</label>
          <p>${this.state.total}</p>
        </div>
        <div className="buttonContainer">
          <button type="submit">BACK</button>
          <button type="submit">DELETE</button>
          <button type="submit" onClick={this.handleInvoiceFormSave}>SAVE</button>
        </div>
      </div>
    )
  }
}

export default InvoiceForm;