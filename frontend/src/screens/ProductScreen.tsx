import React, { FC, FormEvent, useEffect, useState } from 'react'
import Meta from '../components/meta/Meta'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/products/Rating'
import BaseMessage from '../components/UI/BaseMessage'
import Loader from '../components/UI/Loader'
import {
  listProductDetails,
  createProductReview
} from '../redux/actions/productActions'
import {
  IProductCreateReviewState,
  IProductDetailsState,
  ProductActions,
  ProductActionTypes
} from '../redux/types/productTypes'
import { ThunkDispatch } from 'redux-thunk'
import { IApplicationState } from '../redux/reducers/rootReducer'
import { IUserLoginState } from '../redux/types/userTypes'

const ProductScreen: FC<RouteComponentProps<{ id: string }>> = ({
  match,
  history
}) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch: ThunkDispatch<
    IApplicationState,
    any,
    ProductActions
  > = useDispatch()

  const productDetails = useSelector<IApplicationState, IProductDetailsState>(
    (state) => state.productDetails
  )
  const { loading, error, product } = productDetails

  const productReviewCreate = useSelector<
    IApplicationState,
    IProductCreateReviewState
  >((state) => state.productCreateReview)
  const {
    success: successProductReview,
    error: errorProductReview
  } = productReviewCreate

  const userLogin = useSelector<IApplicationState, IUserLoginState>(
    (state) => state.userLogin
  )
  const { userInfo } = userLogin

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: ProductActionTypes.PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment
      })
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <BaseMessage variant='danger'>{error}</BaseMessage>
      ) : product ? (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: ${product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {!product.reviews?.length && (
                <BaseMessage>No Reviews</BaseMessage>
              )}
              <ListGroup variant='flush'>
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating
                        value={review.rating}
                        text={product.numReviews.toString()}
                      />
                      <p>{review.createdAt?.toString().substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                <ListGroup.Item>
                  {errorProductReview && (
                    <BaseMessage variant='danger'>
                      {errorProductReview}
                    </BaseMessage>
                  )}
                  <h2>Write a custom review</h2>
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <BaseMessage>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </BaseMessage>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      ) : null}
    </>
  )
}

export default ProductScreen
