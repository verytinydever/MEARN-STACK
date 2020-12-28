import React from 'react'
import Footer from './components/footer'
import Header from './components/header'
import { Container } from 'react-bootstrap'
import HomeView from './screens/homeView'
import ProductView from './screens/productView'
import CartView from './screens/cartView'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeView} exact />
          <Route path='/product/:id' component={ProductView} />
          <Route path='/cart/:id?' component={CartView} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
