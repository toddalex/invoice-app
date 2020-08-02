import React, { useState, useEffect, Fragment } from 'react';
// import LineItemList from './LineItemList'
import '../App.css'

const EditInvoiceModal = ({ invoice }) => {
  const [invoices, setInvoices] = useState([]);
  const [name, setName] = useState(invoice.name);
  const [email, setEmail] = useState(invoice.email);
  const [dueDate, setDueDate] = useState(invoice.due_date.split('T')[0]);
  const [total, setTotal] = useState(invoice.total);
 
  // delete invoice function
  const handleInvoiceDelete = async (id) => {
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
  const handleInvoiceEdit = async (e) => {
    e.preventDefault();
    try {
      const body = { name , email, dueDate, total} 
      await fetch(`http://localhost:8080/invoices/${invoice.invoice_id}`, {
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

  // sets current total to 0.00 **placeholder
  useEffect(() => {
    setTotal(0.00);
  }, []); 
 
  return(
    <Fragment>
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${invoice.invoice_id}`}>
       Edit
      </button>
        <div className="modal" id={`id${invoice.invoice_id}`}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Invoice App</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                <div className="invoice-container">
                  <form className="invoice-form">
                    <div className="input-wrapper">
                      <label className="input-label">Name</label>
                      <input 
                        type="text" 
                        className="input" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
                    <div className="input-wrapper">
                      <label className="input-label">Email</label>
                      <input 
                        type="text" 
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                    <div className="input-wrapper">
                      <label className="input-label">Due Date</label>
                      <input 
                        type="date" 
                        value={dueDate} 
                        onChange={(e) => setDueDate(e.target.value)}
                      ></input>
                    </div>
                  </form>
                  {/* <LineItemList /> */}
                  <div className="totals-wrapper">
                    <label>TOTAL</label>
                    <p onClick={(() => console.log(invoice.invoice_id))}>{total}</p>
                  </div>
                </div>
              </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">BACK</button>
              <button type="submit" className="btn btn-danger" data-dismiss="modal" onClick={() => handleInvoiceDelete(invoice.invoice_id)}>DELETE</button>
              <button type="submit" className="btn btn-success" data-dismiss="modal" onClick={(e) => handleInvoiceEdit(e)}>SAVE</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditInvoiceModal;
