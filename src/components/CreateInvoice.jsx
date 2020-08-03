import React from 'react';
import { Link } from 'react-router-dom';
import CreateLineItem from './CreateLineItem';
import LineItem from './LineItem'
import '../App.css'

class CreateInvoice extends React.Component {

  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      dueDate: '',
      lineItems: [],
    }
  }

  // updates state property according to event target name
  handleChange = (e) => {
    const key = e.target.name;
    this.setState({ [key]: e.target.value })
  };

  // creates a new invoice and stores info in db
  handleInvoiceSave = async (e) => {
    e.preventDefault();
    // get total amount from innertext of total p element
    const total = document.getElementById('totalAmount').innerHTML
    
    const { name, email, dueDate } = this.state;
    const body = { name , email, dueDate, total};
    try {
      await fetch('http://localhost:8080/invoices', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      // redirects to home page
      window.location = '/'
    } catch (err) {
      console.error(err.message); 
    }  
  };

  // creates function that concats state lineitems array with arguments passed in and
  // updates state with new values, pass function down to CreateLineItem component
  addLineItem = (obj) => {
    const lineItemsArray = this.state.lineItems.concat(obj);
    this.setState({lineItems: lineItemsArray})
  }

  render() {
    // sets initial value of total amount to $0.00
    let totalAmount = 0.00;
    // renders list of line items 
    const lineItems = this.state.lineItems.map((li, index) => {
      totalAmount += Number(li.amount);
      return <LineItem description={li.description} amount={li.amount} key={index} />
    })

    return(
      <div className="invoice-container">
        <div className="form-wrapper">
        <form className="invoice-form">
          <div className="input-wrapper">
            <label className="input-label">Name</label>
            <input 
              type="text" 
              name="name" 
              className="input" 
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="input-wrapper">
            <label className="input-label">Email</label>
            <input 
              type="text" 
              name="email" 
              className="input"
              onChange={this.handleChange}
            ></input>
          </div>
          <div className="input-wrapper">
            <label className="input-label">Due Date</label>
            <input 
              type="date" 
              name="dueDate"
              className="input"
              onChange={this.handleChange}
            ></input>
          </div>
        </form>
        <CreateLineItem 
          addLineItem={this.addLineItem} 
          email={this.state.email}
        />
        {lineItems}
        <div className="totals-wrapper">
          <label>TOTAL</label>
          <p id='totalAmount'>${totalAmount}</p>
        </div>
        <div className="button-wrapper">
          <Link to="/"><button type="submit" className="btn btn-secondary col-3">BACK</button></Link>
          <button type="submit" className="btn btn-success col-3 float-right" onClick={this.handleInvoiceSave}>CREATE</button>
        </div>
        </div>
      </div>
    )
  }
}

export default CreateInvoice;