const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const pool = require('./db/db.js');

const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, '../public')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../src/index.js'));
// });

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
    console.error(err.message)
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

    res.json(invoice.rows[0])
  } catch (err) {
    console.error(err.message);
  }
})

// update an invoice

app.put('/invoices/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, due_date } = req.body;
    const values = [name, email, due_date, id]
    const updateInvoiceQuery = `UPDATE invoices SET name = $1, email = $2, due_date = $3 WHERE invoice_id = $4`

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