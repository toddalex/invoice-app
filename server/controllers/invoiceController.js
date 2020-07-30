const db = require('../models/models.js');
const invoiceControllers = {};
// read portion of CRUD 
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
// 
// productControllers.productSave = (req, res, next) => {
//   const { title, price, zip, description } = req.body.product
//   const sellerId = res.locals.seller_id
//   const values = [title, price, zip, description, sellerId]
//   console.log('this is our sellerId in productSave: ', sellerId)
//   // create portion of CRUD 
//   //on insert you need to pass in the res.locals id from sellSave
//   const saveProduct = ` INSERT INTO product(title,price,zip,description,seller_id)
//   VALUES ($1,$2,$3,$4,$5)`;
//   db.query(saveProduct,values)
//     .then(products => {
//       next()
//     })
//     .catch(e => {
//       console.log(e)
//       next({e: 'error on controller product save'})
//     })
//   }

// productControllers.sellerSave = (req, res, next) => {
//     console.log(req.body.product)
//     const { name, zip, about, phone, email } = req.body.product;
//     const values = [name, zip, about, phone, email];
//     const sellerSaveQuery = ` INSERT INTO seller(name,zip,about,phone,email)
//     VALUES ($1,$2,$3,$4,$5) 
//     RETURNING seller_id`;
//   db.query(sellerSaveQuery, values)
//     .then(sellers => {
//       res.locals.seller_id = sellers.rows[0].seller_id;
//       res.locals.about = sellers.rows[0].about
//       next()
//     })
//     .catch(e => {
//       console.log("this is our error: ", e),
//       next({e: 'error on controller seller save'})
//     })
//   }