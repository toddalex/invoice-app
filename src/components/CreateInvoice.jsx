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

  handleChange = (e) => {
    const key = e.target.name;
    this.setState({ [key]: e.target.value })
  };

  handleInvoiceSave = async (e) => {
    e.preventDefault();
    const total = document.getElementById('totalAmount').innerHTML
    
    const { name, email, dueDate } = this.state;
    const body = { name , email, dueDate, total};
    try {
      await fetch('http://localhost:8080/invoices', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      // redirect to home page
      console.log(body)
      window.location = '/'
    } catch (err) {
      console.error(err.message); 
    }  
  };

  addLineItem = (obj) => {
    const lineItemsArray = this.state.lineItems.concat(obj);
    this.setState({lineItems: lineItemsArray})
  }

  render() {
    let totalAmount = 0.00;
    const lineItems = this.state.lineItems.map((li, index) => {
      totalAmount += Number(li.amount);
      return <LineItem description={li.description} amount={li.amount} key={index} />
    })

    return(
      <div className="invoice-container">
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
          <p id='totalAmount'>{totalAmount}</p>
        </div>
        <div className="buttonContainer">
          <Link to="/"><button type="submit">BACK</button></Link>
          <button type="submit" onClick={this.handleInvoiceSave}>CREATE</button>
        </div>
      </div>
    )
  }
}

export default CreateInvoice;