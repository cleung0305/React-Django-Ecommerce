import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function ProfileHeader() {
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Nav className="me-auto">
                        
                        <LinkContainer to="/profile">
                            <Nav.Link><i className='fas fa-user'></i> User Profile</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/profile/orders">
                            <Nav.Link><i className="fa-solid fa-clipboard"></i> Orders</Nav.Link>
                        </LinkContainer>

                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default ProfileHeader
