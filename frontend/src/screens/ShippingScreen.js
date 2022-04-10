import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import STATES from '../constants/usStatesConstants'
import FormContainer from '../components/FormContainer'

function ShippingScreen() {
    const [streetAddress, setStreetAddress] = useState('')
    const [aptAddress, setAptAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')


    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const submitShippingHandler = (e) => {
        e.preventDefault()
        console.log('Submit shipping')
    }

    return (
        <FormContainer>
            <h2>Shipping Address</h2>
            <Form onSubmit={submitShippingHandler}>
                <Form.Group className="my-2" controlid="street-address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Street address or P.O. Box" value={streetAddress ? streetAddress : ''} onChange={(e) => setStreetAddress(e.target.value)} required />
                </Form.Group>

                <Form.Group className="my-2" controlid="apt-address">
                    <Form.Control type="text" placeholder="Apt, suite, unit, building, floor, etc." value={aptAddress ? aptAddress : ''} onChange={(e) => setAptAddress(e.target.value)} />
                </Form.Group>

                <Form.Group className="my-2" controlid="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" value={city ? city : ''} onChange={(e) => setCity(e.target.value)} required />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="my-2" controlid="state">
                            <Form.Label>State</Form.Label>
                            <Form.Select aria-label="State" as="select" onChange={(e) => setState(e.target.value)} required >
                                <option key={0} value=''>State</option>
                                {
                                    STATES.map((state) => (
                                        <option key={state.name} value={state.abbreviation}>{state.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="my-2" controlid="city">
                            <Form.Label>ZIP Code</Form.Label>
                            <Form.Control type="text" value={zip ? zip : ''} onChange={(e) => setZip(e.target.value)} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" variant="primary" className="my-2">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
