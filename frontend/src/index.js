import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './css/index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './css/bootstrap.min.css'
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
