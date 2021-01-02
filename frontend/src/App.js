import React from 'react'
import Footer from './components/footer'
import Header from './components/header'
import { Container } from 'react-bootstrap'
import HomeView from './screens/homeView'
import ProductView from './screens/productView'
import CartView from './screens/cartView'
import LoginView from './screens/loginView'
import RegisterView from './screens/registerView'
import ProfileView from './screens/profileView'
import ShippingView from './screens/shippingView'
import PaymentView from './screens/paymentView'
import PlaceOrderView from './screens/placeOrderView'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/placeorder' component={PlaceOrderView} />
          <Route path='/payment' component={PaymentView} />
          <Route path='/shipping' component={ShippingView} />
          <Route path='/login' component={LoginView} />
          <Route path='/profile' component={ProfileView} />
          <Route path='/register' component={RegisterView} />
          <Route path='/product/:id' component={ProductView} />
          <Route path='/cart/:id?' component={CartView} />
          <Route path='/' component={HomeView} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
