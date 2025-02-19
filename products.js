const fs = require('fs').promises;
const path = require('path');
const cuid = require('cuid');

const db = require('./db');

const productsFile = path.join(__dirname, 'data/full-products.json');

// Define our Product Model
const Product = db.model('Product', {
  _id: { type: String, default: cuid },
  description: { type: String },
  alt_description: { type: String },
  likes: { type: Number, required: true },
  urls: {
    regular: { type: String, required: true },
    small: { type: String, required: true },
    thumb: { type: String, required: true },
  },
  links: {
    self: { type: String, required: true },
    html: { type: String, required: true },
  },
  user: {
    id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    portfolio_url: { type: String },
    username: { type: String, required: true },
  },
  tags: [
    {
      title: { type: String, required: true },
    },
  ],
});

/**
 * List products
 * @param {*} options
 * @returns {Promise<Array>}
 */
async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options;

  const query = tag
    ? {
        tags: {
          $elemMatch: {
            title: tag,
          },
        },
      }
    : {};

  return await Product.find(query).sort({ _id: 1 }).skip(offset).limit(limit);
}

/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object|null>}
 */
async function get(id) {
  if (!id) throw new Error("Product ID is required");
  return await Product.findById(id);
}

/**
 * Create a new product
 * @param {Object} fields
 * @returns {Promise<Object>}
 */
async function create(fields) {
  return await new Product(fields).save();
}

/**
 * Edit a product
 * @param {String} _id
 * @param {Object} change
 * @returns {Promise<Object>}
 */
async function edit(_id, change) {
  if (!_id) throw new Error("Product ID is required");

  const product = await get(_id);
  if (!product) throw new Error("Product not found");

  Object.assign(product, change);
  await product.save();

  return product;
}

/**
 * Delete a product
 * @param {String} _id
 * @returns {Promise<Object>}
 */
async function destroy(_id) {
  if (!_id) throw new Error("Product ID is required");

  const result = await Product.deleteOne({ _id });
  if (result.deletedCount === 0) throw new Error("Product not found");

  return { message: "Product deleted successfully" };
}

module.exports = {

list,
get
}

  list,
  get,
  create,
  edit,
  destroy,
};

