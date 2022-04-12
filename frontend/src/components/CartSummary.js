import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, ListGroup, Card } from 'react-bootstrap'

function CartSummary() {

    const cart = useSelector( state => state.cart )
    const { cartItems } = cart

    return (
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

                                <Col md={4} sm="auto" style={{fontSize:"11px"}} className="d-flex">
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
    )
}

export default CartSummary
