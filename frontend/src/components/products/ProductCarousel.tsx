import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../UI/Loader'
import BaseMessage from '../UI/BaseMessage'
import { listTopProducts } from '../../redux/actions/productActions'
import { IApplicationState } from '../../redux/reducers/rootReducer'
import { ThunkDispatch } from 'redux-thunk'
import { IProductTopState } from '../../redux/types/productTypes'
import { CartActions } from '../../redux/types/cartTypes'

const ProductCarousel: FC = () => {
  const dispatch: ThunkDispatch<
    IApplicationState,
    null,
    CartActions
  > = useDispatch()

  const productTopRated = useSelector<IApplicationState, IProductTopState>(
    (state) => state.productTopRated
  )
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])
  return loading ? (
    <Loader />
  ) : error ? (
    <BaseMessage variant='danger'>{error}</BaseMessage>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
