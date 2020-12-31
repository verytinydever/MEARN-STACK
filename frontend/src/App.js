import React from 'react'
import Footer from './components/footer'
import Header from './components/header'
import { Container } from 'react-bootstrap'
import HomeView from './screens/homeView'
import ProductView from './screens/productView'
import CartView from './screens/cartView'
import LoginView from './screens/loginView'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginView} />
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
