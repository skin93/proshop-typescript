import React, { FC, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import BaseMessage from '../components/UI/BaseMessage'
import Loader from '../components/UI/Loader'
import { listUsers, deleteUser } from '../redux/actions/userActions'
import { RouteComponentProps } from 'react-router-dom'
import {
  IUserDeleteState,
  IUserListState,
  IUserLoginState,
  UserActions
} from '../redux/types/userTypes'
import { IApplicationState } from '../redux/reducers/rootReducer'
import { ThunkDispatch } from 'redux-thunk'
const UserListScreen: FC<RouteComponentProps> = ({ history }) => {
  const dispatch: ThunkDispatch<
    IApplicationState,
    any,
    UserActions
  > = useDispatch()

  const userList = useSelector<IApplicationState, IUserListState>(
    (state) => state.userList
  )
  const { loading, error, users } = userList

  const userLogin = useSelector<IApplicationState, IUserLoginState>(
    (state) => state.userLogin
  )
  const { userInfo } = userLogin

  const userDelete = useSelector<IApplicationState, IUserDeleteState>(
    (state) => state.userDelete
  )
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, userInfo, history, successDelete])

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <BaseMessage variant='danger'>{error}</BaseMessage>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fa fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
