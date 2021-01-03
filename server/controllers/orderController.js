import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//*@desc  Create new order
//*@route  POST /api/orders
//*@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    try {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
      const createdOrder = await order.save()
      res.status(201).json(createdOrder)
    } catch (error) {
      console.error(`Got error at order saving is:${error}`)
    }
  }
})

//*@desc  get OrderById
//*@route  POST /api/orders/:id
//*@access Private
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'username email'
    )
    if (order) {
      res.json(order)
    } else {
      res.status(400)
      throw new Error('Order Not found')
    }
  } catch (error) {
    console.error(`Got error at controller is :${error}`)
  }
})

//*@desc  Update Order to Paid
//*@route  POST /api/orders/:id/pay
//*@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      }
      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(400)
      throw new Error('Order Not found')
    }
  } catch (error) {
    console.error(`Got error at controller is :${error}`)
  }
})

export { addOrderItems, getOrderById, updateOrderToPaid }
