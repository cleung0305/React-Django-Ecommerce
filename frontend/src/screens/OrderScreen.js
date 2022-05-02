import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Row, Col, Button, ListGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'

import Message from '../components/Message'
import Loader from '../components/Loader'
import CartSummaryAccordion from '../components/CartSummaryAccordion'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

function OrderScreen() {
    const { id } = useParams()
    console.log(id)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const user = useSelector(state => state.userLogin)
    const { userInfo } = user

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay} = orderPay

    if(!loading && !error){
        order.subtotalPrice = order.orderItems.reduce((acc, orderItem) => acc + orderItem.price * orderItem.qty, 0).toFixed(2)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // AVOAq7MSKF4C3MOjpav8qqlDV7k0FBiTeW7hOvOa7WCXJUdjLAkwZslUaT9pcgwquy46tDE66CoXy76P

    const [sdkReady, setSdkReady] = useState(false) // State determine whether the SDK is ready to be mounted

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AVOAq7MSKF4C3MOjpav8qqlDV7k0FBiTeW7hOvOa7WCXJUdjLAkwZslUaT9pcgwquy46tDE66CoXy76P'
        script.async = true //give it time for SDK to load
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if(!order || successPay || order._id !== Number(id) ){
            dispatch({ type: ORDER_PAY_RESET }) //reset payment status after payment success
            dispatch(getOrderDetails(id))
        }
        else if (!order.isPaid){ //check if the order is paid or not
            if(!window.paypal){
                addPayPalScript() //check if paypal sdk is mounted to page
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, id, successPay])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    return loading ? (<Loader />)
        : error ? (<Message variant="dark">{error}</Message>)
        :
        (
            <div>
                { order ?
                    <Row>
                       <h2>Order # { order._id }</h2>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                {/* <ListGroup.Item>
                                    <h3>Order Status</h3>
                                    <Row>
                                        <Col md={2}><strong>Transaction:</strong></Col>
                                        <Col md={4} className="d-flex">
                                            <div className="ms-auto">
                                                { order.isPaid ? "Completed" : "Incomplete"}

                                            </div>
                                        </Col>
                                        <Col md={2}><strong>Delivery:</strong></Col>
                                        <Col md={4} className="d-flex">
                                            <div className="ms-auto">
                                                { order.isDelivered ? "Delivered" : "In Progress"}
                                            </div>
                                        </Col>
                                    </Row>
                                </ListGroup.Item> */}
                                <ListGroup.Item>
                                    <h3>Shipping</h3>
                                    <Row>
                                        <Col md={2}><strong>Ship to:</strong></Col>
                                        <Col md={4} className="d-flex">
                                            <div className="ma-auto">
                                                { order.shippingAddress.name } <br/>
                                                { order.shippingAddress.street_address }, <br/>
                                                { order.shippingAddress.apt_address && `${order.shippingAddress.apt_address},`} { order.shippingAddress.apt_address && <br/> }
                                                { order.shippingAddress.city }, { order.shippingAddress.state } { order.shippingAddress.zip }
                                            </div>
                                        </Col>
                                        
                                        <Col md={2}><strong>Shipping method:</strong></Col>
                                        <Col md={4} className="d-flex">
                                            <div className="ma-auto">
                                                Free Shipping (5 - 7 Business days)
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="m-2">
                                        {order.isDelivered ? (<Message variant="success">Delivered on {order.deliverd_date}</Message>)
                                            : (<Message variant="primary">Delivery in progress </Message>)
                                        }
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h3>Payment</h3>
                                    <div>
                                        <strong>Paymeny method:</strong>
                                        { order.paymentMethod }
                                    </div>
                                    <div className="m-2">
                                        {order.isPaid ? (<Message variant="success">Transaction complete on {order.paid_date}</Message>)
                                            : (<Message variant="warning">Transaction incomplete</Message>)
                                        }
                                    </div>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <div className="d-flex">
                                    <h3>Your Items</h3>
                                    </div>
                                    <ListGroup variant="flush">
                                        { order.orderItems.map((orderItem, index) => (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={orderItem.image} alt={orderItem.name} fluid rounded/>
                                                    </Col>

                                                    <Col md={6}>
                                                        {orderItem.name}
                                                    </Col>

                                                    <Col md={3}>
                                                        Quantity : {orderItem.qty}
                                                    </Col>

                                                    <Col md={2} className="d-flex">
                                                        <div className="ms-auto">${(orderItem.qty * orderItem.price).toFixed(2)}</div>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )) }
                                    </ListGroup>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={4}>
                            <CartSummaryAccordion items={order.orderItems} shippingPrice={order.shipping_price} taxPrice={order.tax_price} />
                            {!order.isPaid && (
                                <div>
                                    {loadingPay && <Loader />}

                                    {!sdkReady ? (<Loader />)
                                            : (<PayPalButton amount={order.total_price} onSuccess={successPaymentHandler} />)
                                    }
                                </div>
                            )}
                        </Col>
                    </Row>
                    : <></>
                }
            </div>
        )
}

export default OrderScreen
