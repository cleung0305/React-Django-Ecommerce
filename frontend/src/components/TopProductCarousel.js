import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'

import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

function TopProductCarousel() {

    const productTop = useSelector( state => state.productTop)
    const { error, loading, products } = productTop

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])
    return (
        loading ? <Loader />
        : error ? <Message variant="danger">{ error }</Message>
        :(
            <Carousel pause="hover" className="bg-dark" fluid>
                {products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} className="d-block mx-auto" />
                            <Carousel.Caption className="carousel.caption">
                                <h5>{product.name} - ${ product.price }</h5>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    )
}

export default TopProductCarousel
