import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Container, Form } from 'react-bootstrap'

import { listProductDetail } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProductScreen() {
    const { id } = useParams()
    const navigate = useNavigate() // create navigation

    const [qty, setQty] = useState(1) // Local state for quantity

    const dispatch = useDispatch() //Create dispatch
    const productDetail = useSelector(state => state.productDetail) // Specify which part of global state we are pulling data from
    const { error, loading, product } = productDetail

    const cart = useSelector(state => state.cart) //grab the cart state for cart message
    const { message } = cart

    useEffect(() => {

        dispatch(listProductDetail(id))

    }, [dispatch, id])

    const addToCartHandler = (productId) => { // Add to cart function
        // navigate(`/cart/${id}?qty=${qty}`) // navigate to the cart with variables 
        dispatch(addToCart(productId, qty))
    }

    return (
        <div>
          {/* Breadcrumb */}
          <section id="bc" className="my-3">
            <div>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    { 
                        product.name 
                    }
                  </li>
                </ol>
              </nav>
            </div>
          </section>
            
            {/* Message section for adding item to cart */}
            {
                message && <Message className="addItemMessage" variant="primary">{message}<Button type="button" onClick={() => console.log('clicked')}>x</Button></Message>
            }


            {
                //Loading Spinner
                loading ? <Loader />
                        : error ? <Message variant="danger">{ error }</Message>
                        :
                        // Product Details
                        <Row>
                            <Col md={4}>
                                {
                                    <Image src={product.image} alt={product.name} fluid />
                                }
                            </Col>

                            <Col md={5}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{ product.name }</h3>
                                        <div className="right-rating">
                                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                        </div>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <h3>${ product.price }</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h5 className="text-secondary">Description</h5>
                                        { product.description }
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>

                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>
                                                    <strong>{ product.countInStock >= 6 ? 'In Stock'
                                                            : product.countInStock >0 ? 'Only A Few Left'
                                                            : 'Sold Out'}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        { product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col xs='auto' className="my-1">
                                                        <Form.Control
                                                            as="select"
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value) }
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup.Item>
                                            <div className="d-grid gap-2 my-1">
                                                {
                                                    product.countInStock > 0 ? //check if instock
                                                        <Button variant="primary" type="button" size="lg" onClick={() => addToCartHandler(product._id)}>
                                                            Add To Cart
                                                        </Button>
                                                        : //out of stock
                                                        <Button variant="secondary" type="button" size="lg" disabled> 
                                                            Out Of Stock
                                                        </Button>
                                                }
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
            }
        </div>
    )
}

export default ProductScreen
