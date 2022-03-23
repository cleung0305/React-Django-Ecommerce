import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Container } from 'react-bootstrap'

import { detailProduct } from '../actions/productActions'
import Rating from '../components/Rating'
import axios from 'axios'

function ProductScreen() {
    const { id } = useParams()
    // const [product, setProduct] = useState([])
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productDetail)
    const { error, loading, product } = productDetail

    useEffect(() => {

        dispatch(detailProduct({id}))

    }, [dispatch])

    return (
        <div>
          {/* Breadcrumb */}
          <section id="bc" className="my-3">
            <Container>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    { 
                        loading ? <h2>Loading...</h2>
                        : error ? <h2>{error}</h2> 
                        : product.name 
                    }
                  </li>
                </ol>
              </nav>
            </Container>
          </section>
          {/* Product Image */}
          <Row>
            <Col md={4}>
              <Image src={product.image} alt={product.name} fluid />
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
                        <ListGroup.Item>
                            <div className="d-grid gap-2 my-1">
                                {
                                    product.countInStock > 0 ? <Button variant="primary" type="button" size="lg">Add To Cart</Button>
                                    : <Button variant="secondary" type="button" size="lg" disabled>Out Of Stock</Button>
                                }
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
          </Row>
        </div>
    )
}

export default ProductScreen
