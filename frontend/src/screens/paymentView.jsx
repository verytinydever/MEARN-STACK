import React, { useState } from 'react'
import { Form, FormGroup, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/formContainer'
import { savePaymentMethod } from '../actions/cartAction'
import CheckOutSteps from '../components/checkOutSteps'

const PaymentView = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Form.Label as='legend'>Select Payment Type</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </FormGroup>

        <Button type='submit' variant='primary'>
          Submit
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentView
