import React from 'react'
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { logoutUser } from '../actions/userActions'


function Header() {

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logoutUser())
        navigate("/logout?redirect=")
    }

    return (
        <header>
           <Navbar className='bg-primary navbar-dark' expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>LokiTech</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">

                    <LinkContainer to="/cart">
                        <Nav.Link><i className='fas fa-shopping-cart'></i> Cart <Badge bg="success" pill>{cartItems.length}</Badge></Nav.Link>
                    </LinkContainer>

                    {
                        userInfo ? 
                            (
                                <NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to="/cart">
                                        <NavDropdown.Item><i className='fas fa-user'></i> Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}><i className="fa-solid fa-right-from-bracket"></i> Logout</NavDropdown.Item>
                                </NavDropdown>
                            )
                            : 
                            (
                                <>
                                    <LinkContainer to="/login">
                                        <Nav.Link><i className="fa-solid fa-right-to-bracket"></i> Login</Nav.Link>
                                    </LinkContainer>

                                    <LinkContainer to="/register">
                                        <Nav.Link><i className="fa-solid fa-user-plus"></i> Register</Nav.Link>
                                    </LinkContainer>
                                </>
                            )
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
    )
}

export default Header
