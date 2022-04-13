import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

import Message from '../components/Message'
import CartSummaryAccordion from '../components/CartSummaryAccordion'
import { updateCart, removeFromCart, cartValidationMessage } from '../actions/cartActions'



function CartScreen() {
    // const { productId } = useParams()
    // const location = useLocation()
    // const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const navigate = useNavigate() // create navigate

    const dispatch = useDispatch()
    const cart = useSelector( state => state.cart )
    const { cartItems, message } = cart

    useEffect(() => {
        // Update Items in-stock status when the page first loaded 
        cartItems.map(cartItem => {
            dispatch(updateCart(cartItem.productId, cartItem.qty))
        })
    }, [])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    //Validate cart status on 'continue'
    const validateCartStatus = () => {
        cartItems.map(cartItem => {
            dispatch(updateCart(cartItem.productId, cartItem.qty))
            if (cartItem.qty === 0) {
                if(!message){
                    dispatch(cartValidationMessage("Items with zero quantity have been removed from your cart"))
                }
                removeFromCartHandler(cartItem.productId)
            }
        })
    }

    const checkoutHandler = () => {
        validateCartStatus()
        navigate('/login?redirect=shipping')
    }

    return (
        <div>
            {  message && <Message variant="primary">{message}</Message> }
            <Row>
                <h2>Shopping Cart</h2>
                {/* Cart Items */}
                <Col md={8}> 
                    { cartItems.length === 0 ? (
                        <Message variant="info">
                            Your cart is empty, <Link to="/">Contiune Shopping</Link>
                        </Message>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map( cartItem => (
                                <ListGroup.Item key={ cartItem.productId }>
                                    <Row>
                                        {/*Item image */}
                                        <Col md={3}>
                                            <Link to={`/product/${cartItem.productId}`}>
                                                <Image src={ cartItem.image } alt={ cartItem.name } fluid rounded/>
                                            </Link>
                                        </Col>

                                        <Col md={9}>
                                            <Row>
                                                <Col md={8} sm={12}>
                                                    <Link to={`/product/${cartItem.productId}`}>{cartItem.name}</Link>
                                                </Col>

                                                <Col md={4} sm={12} className="d-flex">
                                                    <p className="ms-auto">${(cartItem.price * cartItem.qty).toFixed(2)}</p>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={8} sm={12}>
                                                    { cartItem.countInStock > 0 ? <p className="text-primary">In Stock</p> : <p className="text-muted">Out of Stock</p> }
                                                </Col>

                                                <Col md={4} sm={12}>
                                                    {
                                                        cartItem.countInStock > 0 ?
                                                            //In stock
                                                            <Form.Select 
                                                                aria-label="Select Quantity" 
                                                                as="select" 
                                                                className="py-0"
                                                                value={cartItem.qty} 
                                                                onChange={(e) => dispatch(updateCart(cartItem.productId, e.target.value)) }
                                                            >  
                                                                <option key={0} value={0}>0</option>
                                                                { [...Array(cartItem.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                )) }
                                                            </Form.Select>
                                                        : //out of stock 
                                                            <Form.Select
                                                                aria-label="Select Quantity" 
                                                                as="select" 
                                                                className="py-0"
                                                                value={0}
                                                                disabled
                                                            >
                                                                <option key={0} value={0}>0</option>
                                                            </Form.Select>
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Button size="sm" type="button" variant="light" className="ms-auto" style={{"position": "absolute", "right": 10, "bottom": 10}} onClick={() => removeFromCartHandler(cartItem.productId)}>
                                        Remove
                                    </Button>

                                </ListGroup.Item>
                            ))}

                            <ListGroup.Item className="ms-auto">
                                <Button 
                                    type='button'
                                    size="lg"
                                    className="my-2"
                                    disabled={cartItems.length === 0}
                                    onClick={() => checkoutHandler()}
                                >
                                    Checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    )}
                </Col>
                {/* Cart Summary */}
                <Col md={4}>
                   <CartSummaryAccordion />
                </Col>
            </Row>
        </div>
    )
}

export default CartScreen
