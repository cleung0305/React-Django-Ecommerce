import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleLogin } from 'react-google-login'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { loginUser, googleLoginUser } from '../actions/userActions'

import googleLogin from '../services/googleLogin'
const { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_BASE_BACKEND_URL } = process.env;

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
        dispatch(loginUser(email, password)) //Log in the user
    }

    const responseGoogleSuccess = (response) => {
        // let googleResponse  = await googleLogin(response.accessToken)
        // dispatch(googleLoginUser(response.accessToken))
        // console.log(googleResponse);
        console.log(response);
    }

    const responseGoogleFailure = (response) => {
        // let googleResponse  = await googleLogin(response.accessToken)
        // dispatch(googleLoginUser(response.accessToken))
        // console.log(googleResponse);
        console.log(response);
    }

    return (
        <>
            <FormContainer md={6}>
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
            <GoogleLogin 
                clientId="37032365283-ibrd58askqgeo9bv1n7usguj4s9rv099.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFailure}
                cookiePolicy={'single_host_origin'}
            />
        </>
    )
}

export default LoginScreen
