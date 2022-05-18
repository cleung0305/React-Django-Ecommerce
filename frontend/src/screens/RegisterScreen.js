import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { registerUser } from '../actions/userActions'

function RegisterScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : ''

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { userInfo, loading, error } = userRegister

    useEffect(() => {
        if(userInfo){
            navigate(`${redirect}`)
        }
    },[navigate, userInfo, redirect])

    const submitRegisterHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            setMessage('Password does not match')
        } else{
            dispatch(registerUser(name, email, password))
        }

    }

    return (
        <FormContainer md={6}>
            <h2>Register</h2>
            {message && <Message variant="danger" fade={ true }>{message}</Message>}
            {error && <Message variant="danger" fade={ true }>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitRegisterHandler}>
                <Form.Group className="my-2" controlid="password">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>
                <Form.Group className="my-2" controlid="password">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Username / Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group className="my-2" controlid="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>

                <Form.Group className="my-2" controlid="passwordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </Form.Group>

                <Button type="submit" variant="primary" className="my-2">Register</Button>

            </Form>

            <Row className="py-3">
                <Col>
                    Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Log in here</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
