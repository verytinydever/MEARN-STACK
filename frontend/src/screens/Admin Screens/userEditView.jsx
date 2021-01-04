import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/message'
import Loading from '../../components/loader.jsx'
import { getUserDetails, updateUser } from '../../actions/userAction.jsx'
import FormContainer from '../../components/formContainer'
import { USER_UPDATE_RESET } from '../../constants/userConstants'

const UserEditView = ({ match, history }) => {
  const userId = match.params.id

  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [username, setusername] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUser({
        _id: userId,
        firstName,
        lastName,
        username,
        email,
        isAdmin,
      })
    )
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user || !user.username || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setfirstName(user.firstName)
        setlastName(user.lastName)
        setusername(user.username)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [user, dispatch, history, userId, successUpdate])

  return (
    <>
      <Link to={`/admin/userlist`} className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User Details</h1>
        {loadingUpdate && <Loading />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loading></Loading>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
            <Form.Group controlId='isAdmin'>
              <Form.Check
                label='IsAdmin'
                type='checkbox'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type='submit' variant='primary' onClick={submitHandler}>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditView
