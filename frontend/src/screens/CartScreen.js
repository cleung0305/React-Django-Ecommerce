import React, { useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

import Message from '../components/Message'
import { addToCart, updateCart } from '../actions/cartActions'



function CartScreen() {
    // const { productId } = useParams()
    // const location = useLocation()
    // const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    const cart = useSelector( state => state.cart )
    const { cartItems } = cart

    useEffect(() => {
        // if(productId) {
        //     dispatch(addToCart(productId, qty))
        // }
    }, [dispatch])

    const removeFromCartHandler = (id) => {
        
    }

    return (
        <div>
            <Row>
                {/* Cart Items */}
                <Col md={9}> 
                    <h1>Shopping Cart</h1>
                    { cartItems.length === 0 ? (
                        <Message variant="info">
                            Your cart is empty, <Link to="/">Contiune Shopping</Link>
                        </Message>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map( cartItem => (
                                <ListGroup.Item key={ cartItem.productId }>
                                    <Row>
                                        <Col md={1}>
                                            <Link to={`/product/${cartItem.productId}`}>
                                                <Image src={ cartItem.image } alt={ cartItem.name } fluid rounded/>
                                            </Link>
                                        </Col>
                                        <Col md={7}>
                                            <Link to={`/product/${cartItem.productId}`}>{cartItem.name}</Link>
                                        </Col>
                                        <Col md={1}>
                                            {cartItem.price}
                                        </Col>
                                        <Col md={1} sm='auto' xs='auto'>
                                            <Form.Control
                                                as="select"
                                                value={cartItem.qty}
                                                onChange={(e) => dispatch(updateCart(cartItem.productId, e.target.value)) }
                                                className="py-0"
                                            >
                                                {
                                                    [...Array(cartItem.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1} className="">
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col md={1}>
                                            ${(cartItem.price * cartItem.qty).toFixed(2)}
                                        </Col>
                                        <Col md={1}>
                                            <Button type="button" variant="light" className="py-0 my-0" onClick={() => removeFromCartHandler(cartItem.productId)}>
                                                <i className="fa-solid fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                {/* Cart Summary */}
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Subtotal ({ cartItems.reduce((acc, cartItem) => acc + Number(cartItem.qty), 0) }) items</h2>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartScreen
