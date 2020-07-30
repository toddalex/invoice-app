const express = require('express');
const invoiceControllers = require('../controllers/invoiceController')
const router = express.Router();
// home/zip search
// router.get('/', 
// (req, res) => {
//   //console.log('hit')
// });
// products index
//this route may need to change -- this is just a placeholder
router.get('/',invoiceControllers.getInvoices,(req, res) => {
  console.log('inside get route', res.locals.invoices)
  res.status(200).json(res.locals.invoices)
});
// product add
// this route may need to change -- this is just a placeholder
// router.post('/products/new',
// productControllers.sellerSave,
// productControllers.productSave, // will save client info to the two tables tb, the product and the seller 
// productControllers.getZip, // will send updated zip code match to the front end 
// (req, res) => {
//   console.log('zip post');
// });
// module.exports = router;