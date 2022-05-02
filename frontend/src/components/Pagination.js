import React from 'react'
import classnames from 'classnames'
import '../pagination.css'
import { usePagination, DOTS } from '../hooks/usePagination'

function Pagination({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className }) {

    const paginationRange = usePagination({totalCount, pageSize, siblingCount, currentPage})

    if(currentPage === 0 || paginationRange.length < 2){
        return null
    }

    const onNext = () => {
        onPageChange(currentPage + 1)
    }

    const onPrevious = () => {
        onPageChange(currentPage - 1)
    }

    let lastPage = paginationRange[paginationRange.length - 1]

    return (
        <ul className={classnames('pagination-container', { [className]: className })}>
            {/* Left Arrow */}
            <li className={classnames('pagination-item', {disabled: currentPage === 1})} onClick={onPrevious}>
                <i className="fa-solid fa-chevron-left"></i>
            </li>

            {/* Page Numbers & Dots  */}
            { paginationRange.map(pageNumber => {
                if(pageNumber === DOTS){
                    return <li className="pagination-item dots">&#8230;</li>
                }

                return (
                    <li className={classnames('pagination-item', {selected: pageNumber === currentPage})} onClick={() => onPageChange(pageNumber)}>
                        { pageNumber }
                    </li>
                )
            })}

            {/* Right Arrow  */}
            <li className={classnames('pagination-item', {disabled: currentPage === lastPage})} onClick={onNext}>
                <i className="fa-solid fa-chevron-right"></i>
            </li>
        </ul>
    )
}

export default Pagination
