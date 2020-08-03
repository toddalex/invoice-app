import React, {Fragment } from 'react';
import currency from 'currency.js'
import LineItem from './LineItem';
import CreateLineItem from './CreateLineItem';
import '../App.css'

class EditInvoiceModal extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      id: props.invoice.invoice_id,
      name: props.invoice.name,
      email: props.invoice.email,
      dueDate: props.invoice.due_date.split('T')[0],
      lineItems: [],
    }
  }
 
  // delete invoice function
  handleInvoiceDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/invoices/${id}`, {
        method: 'DELETE'
      })
      console.log(response);
      window.location = '/';
    } catch (err) {
      console.error(err.message);
    }
  }

  // edit invoice function
  handleInvoiceEdit = async (e) => {
    e.preventDefault();
    try {
      const total = document.getElementById('modal-total-amount').innerHTML
      const { name, email, dueDate, id } = this.state
      const body = { name , email, dueDate, total, id } 
      console.log(body)
      await fetch(`http://localhost:8080/invoices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      // refresh page and reload invoices
      window.location = '/';
    } catch (err) {
      console.error(err.message); 
    }  
  }

  // async function to fetch all line item data matching email
  getLineItems = async () => {
    try {
      const response = await fetch(`http://localhost:8080/lineitems/${this.state.email}`);
      const data = await response.json();
      this.setState({lineItems: data})
    } catch (err) {
      console.error(err.message);
    }
  };

  // updates state property according to event target name
  handleChange = (e) => {
    const key = e.target.name;
    this.setState({ [key]: e.target.value })
  };

  // sets state to new array of line items
  addLineItem = (obj) => {
    const lineItemsArray = this.state.lineItems.concat(obj);
    this.setState({lineItems: lineItemsArray})
  }

  // invokes getLineItems functions using email as unique identifier
  componentDidMount() {
    this.getLineItems(this.state.email)
  }
 
  render() {
    // sets initial value of total amount to $0.00
    let totalAmount = 0.00;
    // renders list of line items, updates total amount
    const lineItems = this.state.lineItems.map((li, index) => {
      const newAmount = currency(totalAmount).add(li.amount)
      totalAmount = newAmount.value;
      return <LineItem description={li.description} amount={li.amount} key={index} />
    })

    return (
      <Fragment>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${this.state.id}`}>
        Edit
        </button>
          <div className="modal" id={`id${this.state.id}`}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Invoice App</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  <div className="modal-container">
                    <form className="invoice-form">
                      <div className="input-wrapper">
                        <label className="input-label">Name</label>
                        <input 
                          type="text"
                          name="name" 
                          className="input" 
                          value={this.state.name}
                          onChange={this.handleChange}
                        ></input>
                      </div>
                      <div className="input-wrapper">
                        <label className="input-label">Email</label>
                        <input 
                          type="text"
                          name="email"
                          className="input"
                          value={this.state.email}
                          onChange={this.handleChange}
                        ></input>
                      </div>
                      <div className="input-wrapper">
                        <label className="input-label">Due Date</label>
                        <input 
                          type="date"
                          name="dueDate"
                          className="input"
                          value={this.state.dueDate} 
                          onChange={this.handleChange}
                        ></input>
                      </div>
                    </form>
                    <CreateLineItem 
                      email={this.state.email}
                      addLineItem={this.addLineItem}
                    />
                      {lineItems}
                    <div className="totals-wrapper">
                      <label>TOTAL</label>
                      <p id="modal-total-amount">${totalAmount}</p>
                    </div>
                  </div>
                </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">BACK</button>
                <button type="submit" className="btn btn-danger" data-dismiss="modal" onClick={() => this.handleInvoiceDelete(this.state.id)}>DELETE</button>
                <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => this.handleInvoiceEdit(e)}>SAVE</button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default EditInvoiceModal;
