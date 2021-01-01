import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import Loading from '../components/loader.jsx'
import { register } from '../actions/userAction.jsx'
import FormContainer from '../components/formContainer'

const RegisterView = ({ location, history }) => {
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [username, setusername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwwords do not match')
    } else {
      dispatch(register(firstName, lastName, username, email, password))
    }
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    } else {
    }
  }, [history, userInfo, redirect])

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      {loading && <Loading></Loading>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='firstName'>
          <Form.Label>Enter First Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter First Name'
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='lastName'>
          <Form.Label>Enter Last Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Last Name'
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='username'>
          <Form.Label>Enter User Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='User Name'
            value={username}
            onChange={(e) => setusername(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign Up
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Have an Account??{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterView
