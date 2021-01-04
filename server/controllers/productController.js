import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//*@desc  Fetch all products
//*@route  Get /api/products
//*@access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

//*@desc  Fetch single products
//*@route  Get /api/products/:id
//*@access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//*@desc  DELETE single products
//*@route  DELETE /api/products/:id
//*@access PRIVATE/ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.send({ message: 'Product Removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
export { getProductById, getProducts, deleteProduct }
