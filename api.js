const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')


/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  // Extract the limit and offset query parameters
  const { offset = 0, limit = 25, tag } = req.query
  // Pass the limit and offset to the Products service
  res.json(await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag
  }))
}


/**
 * Get a single product
 * @param {object} req
 * @param {object} res
 */
async function getProduct(req, res, next) {
  const { id } = req.params

  const product = await Products.get(id)
  if (!product) {
    return next()
  }

  return res.json(product)
}

/**
 * Create a product
 * @param {object} req 
 * @param {object} res 
 */
 lab-5-submission
async function createProduct(req, res) {
  const product = await Products.create(req.body)
  //console.log('request body:', req.body)
  res.json(product)
}

/**
 * Edit a product
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function editProduct(req, res, next) {
  // console.log(req.body)
  // res.json(req.body)
  const change = req.body
  const product = await Products.edit(req.params.id, change)
  res.json(product)
async function createProduct(req, res, next) {
  const product = await Products.create(req.body)
  res.json(product)
}


async function editProduct (req, res, next) {
  const change = req.body
  const product = await Products.edit(req.param.id, change)
  res.json(product)
}
async function deleteProduct (req, res, next) {
  const response = await Products.destroy(req.params.id)
  res.json(response)
}
async function createOrder (req, res, next) {
  const order = await Orders.create(req.body)
  res.json(orders)

}
async function listOrders (req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query
 
/**
 * Delete a product
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function deleteProduct(req, res, next) {
  // res.json({ success: true })
  const response = await Products.destroy(req.params.id)
  res.json(response)
  const orders = await Orders.list({ 
    offset: Number(offset), 
    limit: Number(limit),
    productId, 
    status 
  })

  res.json(orders)
}
async function editOrder(req, res, next) {
  try {
      const updatedOrder = await orders.edit(req.params.id, req.body);
      res.json(updatedOrder);
  } catch (err) {
      next(err);
  }
}
async function deleteOrder(req, res, next) {
  try {
      await orders.destroy(req.params.id);
      res.status(204).send(); // No content
  } catch (err) {
      next(err);
  }

}

async function createOrder(req, res, next){
  const order = await Orders.create(req.body)
  res.json(order)

}

async function listOrders(req, res, next){
  const { offset = 0, limit = 25, productId, status } = req.query
  

const orders = await Orders.list({
  offset: Number(offset),
  limit: Number(limit),
  productId,
  status
})

res.json(orders)

}

//edit and delete endpoints




module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  lab-5-submission
  createOrder,
  listOrders,
  createOrder
  listOrders,
  createOrder,
  editOrder,
  deleteOrder, 
  main
  
});