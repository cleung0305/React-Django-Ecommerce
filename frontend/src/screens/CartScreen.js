import React, { } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

import Message from '../components/Message'
import { updateCart, removeFromCart } from '../actions/cartActions'



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
                <h2>Shopping Cart</h2>
                {/* Cart Items */}
                <Col md={9}> 
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

                            <ListGroup.Item className="ms-auto">
                                <Button 
                                    type='button'
                                    size="lg"
                                    className="my-2"
                                    disabled={cartItems.length === 0}
                                    onClick={() => checkoutHandler()}
                                >
                                    Continue to checkout
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    )}
                </Col>
                {/* Cart Summary */}
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item> {/**Total number of items */}
                                <h4>Subtotal ({ cartItems.reduce((acc, cartItem) => acc + Number(cartItem.qty), 0) }) items</h4>
                            </ListGroup.Item>

                            {
                                cartItems.map(cartItem => (
                                    <ListGroup.Item key={ `summary-${cartItem.productId}` }>
                                        <Row>
                                            <Col md={8} style={{fontSize:"11px"}}> {/**Item name and qty */}
                                                {cartItem.qty} &times; {cartItem.name}
                                            </Col>

                                            <Col md={4} sm="auto" style={{fontSize:"11px", display:"flex"}}>
                                                <p className="ms-auto">${(cartItem.price * cartItem.qty).toFixed(2)}</p>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }

                            <ListGroup.Item className="ms-auto">
                                ${ cartItems.reduce((acc, cartItem) => acc + Number(cartItem.qty) * cartItem.price, 0).toFixed(2) } {/**Subtotal price */}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartScreen
