import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation } from 'react-router-dom'

function CheckoutSteps({ step1, step2, step3 }) {

    const location = useLocation()
    const path = location.pathname

    return (
        <Nav className="justify-content-center mb-3">
            <Nav.Item>
                {
                    step1 ? (
                        <LinkContainer to='/shipping' className={ path === '/shipping' ? "border-bottom border-dark" : "" }>
                            <Nav.Link className="checkout-link-active">Shipping</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Shipping</Nav.Link>
                    )
                }
            </Nav.Item>
            <Nav.Item>
                {
                    step2 ? (
                        <LinkContainer to='/payment' className={ path === '/payment' ? "border-bottom border-dark" : "" }>
                            <Nav.Link className="checkout-link-active">Payment</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Payment</Nav.Link>
                    )
                }
            </Nav.Item>
            <Nav.Item>
                {
                    step3 ? (
                        <LinkContainer to='/placeorder' className={ path === '/placeorder' ? "border-bottom border-dark" : "" }>
                            <Nav.Link className="checkout-link-active">Place Order</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Place Order</Nav.Link>
                    )
                }
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
