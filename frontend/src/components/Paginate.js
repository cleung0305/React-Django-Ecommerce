import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import classnames from 'classnames'

import '../pagination.css'
import { usePaginate, DOTS } from '../hooks/usePaginate'

function Paginate({ page, pages, keyword='', siblingCount=1, isAdmin=false, className }) {

    const paginateRange = usePaginate({page:page, pages:pages})
    console.log(paginateRange)

    if(keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    if(page === 0 || paginateRange.length < 2){
        return null
    }

    let lastPage = paginateRange[paginateRange.length - 1]

    return (
        <ul className={classnames('pagination-container', { [className]: className })}>
            {/* Left Arrow */}
            <LinkContainer key="prev" to={`/?keyword=${keyword}&page=${page - 1}`}>
                <li className={classnames('pagination-item', {disabled: page === 1})}>
                    <i className="fa-solid fa-chevron-left"></i>
                </li>
            </LinkContainer>

            {/* Page Numbers & Dots  */}
            { paginateRange.map(pageNumber => {
                if(pageNumber === DOTS){
                    return <li className="pagination-item dots">&#8230;</li>
                }

                return (
                    <LinkContainer key={pageNumber + 1} to={`/?keyword=${keyword}&page=${pageNumber + 1}`}>
                        <li className={classnames('pagination-item', {selected: pageNumber === page})}>
                            { pageNumber }
                        </li>
                    </LinkContainer>
                )
            })}

            {/* Right Arrow  */}
            <LinkContainer key="next" to={`/?keyword=${keyword}&page=${page + 1}`}>
                <li className={classnames('pagination-item', {disabled: page === pages})}>
                    <i className="fa-solid fa-chevron-right"></i>
                </li>
            </LinkContainer>
        </ul>
    )
}

export default Paginate
