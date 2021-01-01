import React, { useState, useEffect } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import Loading from '../components/loader.jsx'
import { getUserDetails, updateUserProfile } from '../actions/userAction.jsx'

const ProfileView = ({ history }) => {
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [username, setusername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          firstName,
          lastName,
          username,
          email,
          password,
        })
      )
    }
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      console.log(` Yo is:${JSON.stringify(user)}`)
      if (!user || !user.firstName) {
        dispatch(getUserDetails('profile'))
      } else {
        setfirstName(user.firstName)
        setlastName(user.lastName)
        setEmail(user.email)
        setusername(user.username)
      }
    }
  }, [dispatch, history, userInfo, user])

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileView
