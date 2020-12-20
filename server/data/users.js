import bcrypt from 'bcrypt'

const users = [
  {
    firstName: 'Shashi',
    lastName: 'Kumar',
    username: 'shashiben',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    firstName: 'Ram',
    lastName: 'Dev',
    username: 'ramdev',
    email: 'ramdev@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    firstName: 'Negative',
    lastName: 'Dev',
    username: 'nsd',
    email: 'nsd@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]
export default users
