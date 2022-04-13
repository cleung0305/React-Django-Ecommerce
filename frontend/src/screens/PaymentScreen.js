import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import CartSummaryAccordion from '../components/CartSummaryAccordion'

// import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen() {

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    // Check if Shipping Address is provided
    if (!shippingAddress.streetAddress){
        navigate('/shipping')
    }

    const submitPaymentHandler = (e) => {
        e.preventDefault()
        // dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 />
            <Row>
                <Col md={8}>
                    <h2>Payment Methods</h2>
                    <Form onSubmit={submitPaymentHandler}>

                        <span className="d-flex">
                            <Button type="button" variant="primary" className="my-2 me-auto" onClick={() => navigate('/shipping')}>Go Back</Button>
                            <Button type="submit" variant="primary" className="my-2 ms-auto">Place Order</Button>
                        </span>
                    </Form>
                </Col>

                <Col md={4}>
                    <CartSummaryAccordion />
                </Col>
            </Row>
        </div>
    )
}

export default PaymentScreen
