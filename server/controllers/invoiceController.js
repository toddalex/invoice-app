const db = require('../db/db.js');
const invoiceControllers = {};

invoiceControllers.getInvoices = (req,res,next) =>{
console.log('hit the get request')
const invoiceGetReq = `SELECT * FROM invoices`

const invoices = [req.params.invoices]; 

db.query(invoiceGetReq, invoices)
  .then((invoice) => {
    res.locals.invoice = invoice.rows
    console.log('Invoice Get Request: ', res.locals.invoice)
    next()
  })
  .catch(e => console.log(e))
}
