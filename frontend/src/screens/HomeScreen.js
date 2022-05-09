import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Pagination from '../components/Pagination'

import { listProducts } from '../actions/productActions'

const PageSize = 4 // Items to be shown on one page

function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector( state => state.productList)
    const { error, loading, products } = productList

    const [productsOnPage, setProductsOnPage] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        dispatch(listProducts())
        if(products){
            setProductsOnPage(products.slice(0, PageSize))
            const firstItemIndex = (currentPage - 1) * PageSize
            const lastItemIndex = firstItemIndex + PageSize
            setProductsOnPage(products.slice(firstItemIndex, lastItemIndex))
        }
    }, [dispatch, currentPage])

    return (
        <div>
            <h1>Latest Products</h1>

            { loading ? <Loader />
                : error ? <Message variant="danger">{ error }</Message> 
                    :
                    <Row>
                        {/* On first page load, productsOnPage is not loaded, so use products.slice(0, PageSize) to get first page of items  */}
                        {(productsOnPage.length === 0 ? products.slice(0, PageSize) : productsOnPage).map(product => (
                            <Col key={ product._id } xs='auto' sm='auto' md={4} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
            }

            { products && 
                <Pagination className="pagination-bar" currentPage={currentPage} totalCount={products.length} pageSize={PageSize} onPageChange={page => setCurrentPage(page)} />
            }
        </div>
    )
}

export default HomeScreen
