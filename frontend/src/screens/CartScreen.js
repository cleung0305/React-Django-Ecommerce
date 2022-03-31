import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

import Message from '../components/Message'
import { addToCart, updateCart, removeFromCart } from '../actions/cartActions'



function CartScreen() {
    // const { productId } = useParams()
    // const location = useLocation()
    // const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const navigate = useNavigate() // create navigate

    const dispatch = useDispatch()
    const cart = useSelector( state => state.cart )
    const { cartItems } = cart

    // useEffect(() => {
    //     if(productId) {
    //         dispatch(addToCart(productId, qty))
    //     }
    // }, [dispatch])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
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
                                        <Col md={1}> {/**Item image */}
                                            <Link to={`/product/${cartItem.productId}`}>
                                                <Image src={ cartItem.image } alt={ cartItem.name } fluid rounded/>
                                            </Link>
                                        </Col>
                                        <Col md={6}> {/**Item name */}
                                            <Link to={`/product/${cartItem.productId}`}>{cartItem.name}</Link>
                                        </Col>
                                        <Col md={1}> {/**Price per item */}
                                            {cartItem.price}
                                        </Col>
                                        <Col md={2}> {/**Drop down qty select */}
                                            <Form.Select 
                                                aria-label="Select Quantity" 
                                                as="select" 
                                                value={cartItem.qty} 
                                                onChange={(e) => dispatch(updateCart(cartItem.productId, e.target.value)) }
                                                className="py-0"
                                            >  
                                                <option key={0} value={0}>0</option>
                                                { [...Array(cartItem.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                )) }
                                            </Form.Select>
                                        </Col>

                                        <Col md={1}> {/**Total price for this item */}
                                            ${(cartItem.price * cartItem.qty).toFixed(2)}
                                        </Col>
                                        <Col md={1}> {/**Remove item button */}
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
                            <ListGroup.Item> {/**Total number of items */}
                                <h2>Subtotal ({ cartItems.reduce((acc, cartItem) => acc + Number(cartItem.qty), 0) }) items</h2>
                                ${ cartItems.reduce((acc, cartItem) => acc + Number(cartItem.qty) * cartItem.price, 0).toFixed(2) } {/**Subtotal price */}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button 
                                    type='button'
                                    size="lg"
                                    disabled={cartItems.length === 0}
                                    onClick={() => checkoutHandler()}
                                >
                                    PROCEED TO CHECKOUT
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartScreen
