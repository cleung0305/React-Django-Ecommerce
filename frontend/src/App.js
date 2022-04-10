import React from 'react';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

import LoginScreen from './screens/LoginScreen'
import LogoutScreen from './screens/LogoutScreen'
import RegisterScreen from './screens/RegisterScreen'

import ProfileScreen from './screens/ProfileScreen'
import ProfileOrdersScreen from './screens/ProfileOrdersScreen'

import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import ShippingScreen from './screens/ShippingScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />

            {/* Users Authentications */}
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/logout' element={<LogoutScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            {/* Users Profiles  */}
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/profile/orders" element={<ProfileOrdersScreen />} />

            {/* Products  */}
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            {/* <Route path="/cart/:productId" element={<CartScreen />} /> */}
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
