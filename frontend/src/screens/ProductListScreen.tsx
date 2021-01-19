import React, { FC, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import BaseMessage from '../components/UI/BaseMessage'
import Loader from '../components/UI/Loader'
import Paginate from '../components/UI/Paginate'
import {
  listProducts,
  deleteProduct,
  createProduct
} from '../redux/actions/productActions'
import {
  IProductCreateState,
  IProductDeleteState,
  IProductListState,
  ProductActions,
  ProductActionTypes
} from '../redux/types/productTypes'
import { RouteComponentProps } from 'react-router-dom'
import { IApplicationState } from '../redux/reducers/rootReducer'
import { IUserLoginState } from '../redux/types/userTypes'
import { ThunkDispatch } from 'redux-thunk'

const ProductListScreen: FC<RouteComponentProps<{ pageNumber: string }>> = ({
  history,
  match
}) => {
  const pageNumber = match.params.pageNumber || '1'

  const dispatch: ThunkDispatch<
    IApplicationState,
    any,
    ProductActions
  > = useDispatch()

  const productList = useSelector<IApplicationState, IProductListState>(
    (state) => state.productList
  )
  const { loading, error, products, pages, page } = productList

  const productDelete = useSelector<IApplicationState, IProductDeleteState>(
    (state) => state.productDelete
  )
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = productDelete

  const productCreate = useSelector<IApplicationState, IProductCreateState>(
    (state) => state.productCreate
  )
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate

  const userLogin = useSelector<IApplicationState, IUserLoginState>(
    (state) => state.userLogin
  )
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: ProductActionTypes.PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct?._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    userInfo,
    history,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber
  ])

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <BaseMessage variant='delete'>{errorDelete}</BaseMessage>}
      {loadingCreate && <Loader />}
      {errorCreate && <BaseMessage variant='danger'>{errorCreate}</BaseMessage>}
      {loading ? (
        <Loader />
      ) : error ? (
        <BaseMessage variant='danger'>{error}</BaseMessage>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price} </td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fa fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
