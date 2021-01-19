import React, { FC, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import BaseMessage from '../components/UI/BaseMessage'
import Loader from '../components/UI/Loader'
import { listOrders } from '../redux/actions/orderActions'
import { IApplicationState } from '../redux/reducers/rootReducer'
import { IUserLoginState, UserActions } from '../redux/types/userTypes'
import { ThunkDispatch } from 'redux-thunk'
import { IOrder, IOrderListState } from '../redux/types/orderTypes'
import { RouteComponentProps } from 'react-router-dom'

const OrderListScreen: FC<RouteComponentProps> = ({ history }) => {
  const dispatch: ThunkDispatch<
    IApplicationState,
    any,
    UserActions
  > = useDispatch()

  const orderList = useSelector<IApplicationState, IOrderListState>(
    (state) => state.orderList
  )
  const { loading, error, orders } = orderList

  const userLogin = useSelector<IApplicationState, IUserLoginState>(
    (state) => state.userLogin
  )
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, userInfo, history])

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <BaseMessage variant='danger'>{error}</BaseMessage>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: IOrder) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt?.toString().substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt?.toString().substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt?.toString().substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
