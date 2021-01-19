import React, { FC, useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/products/Product'
import BaseMessage from '../components/UI/BaseMessage'
import Loader from '../components/UI/Loader'
import Paginate from '../components/UI/Paginate'
import { listProducts } from '../redux/actions/productActions'
import ProductCarousel from '../components/products/ProductCarousel'
import Meta from '../components/meta/Meta'
import { IApplicationState } from '../redux/reducers/rootReducer'
import {
  IProduct,
  IProductListState,
  ProductActions
} from '../redux/types/productTypes'
import { ThunkDispatch } from 'redux-thunk'

const HomeScreen: FC<
  RouteComponentProps<{ keyword: string; pageNumber: string }>
> = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch: ThunkDispatch<
    IApplicationState,
    any,
    ProductActions
  > = useDispatch()

  const productList = useSelector<IApplicationState, IProductListState>(
    (state) => state.productList
  )

  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <BaseMessage variant='danger'>{error}</BaseMessage>
      ) : (
        <>
          <Row>
            {products.map((product: IProduct) => (
              <Col key={product._id} sm={12} md={6} lg={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
