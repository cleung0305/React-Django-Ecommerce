import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { loginUser } from '../actions/userActions'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : ''

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo, loading, error } = userLogin

    useEffect(() => {
        if (userInfo){
            navigate(`/${redirect}`)
        }
    }, [navigate, userInfo, redirect])

    const submitLoginHandler = (e) => {
        e.preventDefault()
        dispatch(loginUser(email, password))
    }

    return (
        <FormContainer>
            <h2>Sign In</h2>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}

            <Form onSubmit={submitLoginHandler} controlId="email">
                <Form.Group className="my-2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Username / Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <Button type="submit" variant="primary" className="my-2">Sign In</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Don't have an account? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register here</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
