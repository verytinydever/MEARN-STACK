import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import Product from './models/productModel.js'
import connectDB from './config/dbConfig.js'

dotenv.config()
connectDB()
const importData = async () => {
  try {
    await Order.deleteMany()
    await User.deleteMany()
    await Product.deleteMany()

    const createUsers = await User.insertMany(users)
    const adminUser = createUsers[0]._id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })
    await Product.insertMany(sampleProducts)
    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error.message}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await User.deleteMany()
    await Product.deleteMany()

    console.log('Data destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error.message}`)
    process.exit(1)
  }
}

if (process.argv[2] == '-d') {
  destroyData()
} else {
  importData()
}
