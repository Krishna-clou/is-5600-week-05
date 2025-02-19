const cuid = require('cuid');
const db = require('./db');

const Order = db.model('Order', {
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [{
    type: String,
    ref: 'Product', // Automatically fetch associated products
    index: true,
    required: true
  }],
  status: {
    type: String,
    index: true,
    default: 'CREATED',
    enum: ['CREATED', 'PENDING', 'COMPLETED']
  }
});

/**
 * List orders
 * @param {Object} options
 * @returns {Promise<Array>}
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, productId, status } = options;

  const productQuery = productId ? { products: productId } : {};
  const statusQuery = status ? { status } : {};

  const query = { ...productQuery, ...statusQuery };

  return await Order.find(query).sort({ _id: 1 }).skip(offset).limit(limit);
}

/**
 * Get an order
 * @param {String} _id
 * @returns {Promise<Object>}
 */
async function get(_id) {
  if (!_id) throw new Error("Order ID is required");
  
  return await Order.findById(_id).populate('products').exec();
}

/**
 * Create an order
 * @param {Object} fields
 * @returns {Promise<Object>}
 */
async function create(fields) {
  const order = await new Order(fields).save();
  await order.populate('products');
  return order;
}

/**
 * Edit an order
 * @param {String} _id
 * @param {Object} change
 * @returns {Promise<Object>}
 */
async function edit(_id, change) {
  if (!_id) throw new Error("Order ID is required");

  const order = await get(_id);
  if (!order) throw new Error("Order not found");

  Object.assign(order, change);
  await order.save();

  return order.populate('products');
}

/**
 * Delete an order
 * @param {String} _id
 * @returns {Promise<void>}
 */
async function destroy(_id) {
  if (!_id) throw new Error("Order ID is required");

  const result = await Order.deleteOne({ _id });
  if (result.deletedCount === 0) throw new Error("Order not found");
}

module.exports = {
  create,
  get,
  list,
  edit,
  destroy
};