const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db/db.js');

const app = express();

const PORT = process.env.PORT || 8080;

// MIDDLEWARE

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

// ROUTES

// create an invoice
app.post('/invoices', async (req, res) => {
  try {
    const { name, email, dueDate, total } = req.body;
    const values = [name, email, dueDate, total];

    const addInvoiceQuery = `INSERT INTO invoices (name, email, due_date, total)
    VALUES ($1, $2, $3, $4) RETURNING *`

    const newInvoice = await pool.query(addInvoiceQuery, values) 

    res.json(newInvoice.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

// get all invoices
app.get('/invoices', async (req, res) => {
  try {
    const getInvoicesQuery = `SELECT * FROM invoices`;
    const allInvoices = await pool.query(getInvoicesQuery);
    res.json(allInvoices.rows); 
  } catch (err) {
    console.error(err.message);
  }
})

// get an invoice
app.get('/invoices/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const getInvoiceQuery = `SELECT * FROM invoices WHERE invoice_id = $1`
    const invoice = await pool.query(getInvoiceQuery, [id])

    res.json(invoice.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

// update an invoice
app.put('/invoices/:id', async (req, res) => {
  try {
    const { name, email, dueDate, total, id } = req.body;
    const values = [name, email, dueDate, total, id]
    const updateInvoiceQuery = `UPDATE invoices SET name = $1, email = $2, due_date = $3, total = $4 WHERE invoice_id = $5`

    const updateInvoice = await pool.query(updateInvoiceQuery, values);
  
    res.json('Invoice Was Updated!!');
    
  } catch (err) {
    console.error(err.message);
  }
})

// delete an invoice
app.delete('/invoices/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteInvoiceQuery = `DELETE FROM invoices WHERE invoice_id = $1`

    const deleteInvoice = await pool.query(deleteInvoiceQuery, [id]);

    res.json('Invoice was deleted!')
  } catch (err) {
    console.error(err.message);
  }
})

// add a line item
app.post('/lineitems', async(req, res) => {
  try {
    const { description, amount, email } = req.body;
    const values = [description, Number(amount), email]
    const addLineItemQuery = `INSERT INTO line_items (description, amount, invoice_id)
       VALUES ($1, $2, $3) RETURNING *`

    const newLineItem = await pool.query(addLineItemQuery, values)

    res.json(newLineItem.rows[0]);
  } catch(err) {
    console.error(err.message);
  }
})

// get all line items
app.get('/lineitems/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const getLineItemsQuery = `SELECT * FROM line_items WHERE invoice_id = $1`;

    const allLineItems= await pool.query(getLineItemsQuery, [id]);
    
    res.json(allLineItems.rows); 
  } catch (err) {
    console.error(err.message);
  }
})

// unknown route handler
app.use('*', (req, res)=> {
  res.sendStatus(404);
});

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Server Error');
});

app.listen(PORT, console.log(`Server listening at Port ${PORT}...`));