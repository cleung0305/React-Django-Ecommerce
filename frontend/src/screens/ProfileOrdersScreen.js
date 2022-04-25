import React from 'react'
import { Form, Button, Row, Col, FormControl, Container } from 'react-bootstrap'

import ProfileHeader from '../components/ProfileHeader'

function PastOrdersScreen() {
    return (
        <div>
            <ProfileHeader />
            <Container>
                <h2>Past Orders</h2>
            </Container>
        </div>
    )
}

export default PastOrdersScreen
