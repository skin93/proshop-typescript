import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Row, Col, ListGroup, Button, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import BaseMessage from '../components/UI/BaseMessage'
import Loader from '../components/UI/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder
} from '../redux/actions/orderActions'
import { IPaymentResult, OrderActionTypes } from '../redux/types/orderTypes'
import {
  IOrderDeliverState,
  IOrderDetailsState,
  IOrderPayState
} from '../redux/types/orderTypes'
import { IApplicationState } from '../redux/reducers/rootReducer'
import { IUserLoginState } from '../redux/types/userTypes'

const OrderScreen: FC<RouteComponentProps<{ id: string }>> = ({
  match,
  history
}) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector<IApplicationState, IOrderDetailsState>(
    (state) => state.orderDetails
  )
  const { order, loading, error } = orderDetails

  const userLogin = useSelector<IApplicationState, IUserLoginState>(
    (state) => state.userLogin
  )
  const { userInfo } = userLogin

  const orderPay = useSelector<IApplicationState, IOrderPayState>(
    (state) => state.orderPay
  )
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector<IApplicationState, IOrderDeliverState>(
    (state) => state.orderDeliver
  )
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  if (!loading && order) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )

    order.taxPrice = addDecimals(Number(0.15 * order.itemsPrice))
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver) {
      dispatch({ type: OrderActionTypes.ORDER_PAY_RESET })
      dispatch({ type: OrderActionTypes.ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, order, orderId, successDeliver, successPay, history, userInfo])

  const successPaymentHandler = (paymentResult: IPaymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(orderId))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <BaseMessage variant='danger'>{error}</BaseMessage>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>

              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <BaseMessage variant='success'>
                  Delivered on {order.deliveredAt}
                </BaseMessage>
              ) : (
                <BaseMessage variant='danger'>Not delivered</BaseMessage>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <BaseMessage variant='success'>
                  Paid on {order.paidAt}
                </BaseMessage>
              ) : (
                <BaseMessage variant='danger'>Not paid</BaseMessage>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <BaseMessage>Order is empty</BaseMessage>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
