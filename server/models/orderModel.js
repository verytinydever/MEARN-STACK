import mongoose from 'mongoose'
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    paymentmethod: {
      id: {
        type: String,
      },
      type: String,
      required: true,
    },
    paymentResult: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
      updateTime: {
        type: String,
      },
      emailAddress: {
        type: String,
      },
    },
    taxPrice: {
      type: Number,
      default: 0.0,
      required: true,
    },
    shippingPrice: {
      type: Number,
      default: 0.0,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0.0,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: 0.0,
      required: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: 0.0,
      required: false,
    },
    deliverAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)
const Order = mongoose.model('Order', orderSchema)
export default Order
