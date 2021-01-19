import React, { FC, useState, useEffect, FormEvent } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import BaseMessage from '../components/UI/BaseMessage'
import Loader from '../components/UI/Loader'
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions'
import { listMyOrders } from '../redux/actions/orderActions'
import { RouteComponentProps } from 'react-router-dom'
import { IApplicationState } from '../redux/reducers/rootReducer'
import {
  IUserDetailsState,
  IUserLoginState,
  IUserUpdateProfileState,
  IUserUpdateState,
  UserActions
} from '../redux/types/userTypes'
import { IOrderListMyState } from '../redux/types/orderTypes'
import { ThunkDispatch } from 'redux-thunk'

const ProfileScreen: FC<RouteComponentProps> = ({ history, location }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch: ThunkDispatch<
    IApplicationState,
    any,
    UserActions
  > = useDispatch()

  const userDetails = useSelector<IApplicationState, IUserDetailsState>(
    (state) => state.userDetails
  )
  const { loading, error, user } = userDetails

  const userLogin = useSelector<IApplicationState, IUserLoginState>(
    (state) => state.userLogin
  )
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector<
    IApplicationState,
    IUserUpdateProfileState
  >((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector<IApplicationState, IOrderListMyState>(
    (state) => state.orderListMy
  )
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
      setPassword('')
      setConfirmPassword('')
    } else {
      setMessage('')
      if (user) {
        dispatch(updateUserProfile({ id: user._id, name, email, password }))
      }
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <BaseMessage variant='danger'>{message}</BaseMessage>}
        {error && <BaseMessage variant='danger'>{error}</BaseMessage>}
        {success && (
          <BaseMessage variant='success'>Profile Updated</BaseMessage>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              placeholder='Confirm Password'
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
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <BaseMessage variant='danger'>{errorOrders}</BaseMessage>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt!.toString().substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt!.toString().substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt!.toString().substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
