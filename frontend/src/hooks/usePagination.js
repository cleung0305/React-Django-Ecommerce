import { useMemo } from 'react';

export const DOTS = '...'

const range = (start, end) => {
    let length = end - start + 1

    return Array.from({ length }, (_, idx) => idx + start)
}

export const usePagination = ({totalCount, pageSize, siblingCount = 1, currentPage }) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize) //total page count needed to show all items

        const totalPageNumbers = siblingCount + 5 //max page numbers show on screen

        //case 1: number of pages < page numbers we want to show
        if (totalPageCount <= totalPageNumbers) {
            return range(1, totalPageCount)
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

        const showLeftDots = leftSiblingIndex > 2
        const showRightDots = rightSiblingIndex < totalPageCount - 2

        const firstPageIndex = 1
        const lastPageIndex = totalPageCount

        //case 2: Only show right dots
        if (!showLeftDots && showRightDots){
            let leftItemCount = 3 + 2 * siblingCount
            let leftRange = range(firstPageIndex, leftItemCount)

            return [...leftRange, DOTS, totalPageCount]
        }

        //case 3: Only show left dots
        if (!showRightDots && showLeftDots){
            let rightItemCount = 3 + 2 * siblingCount
            let rightRange = range(totalPageCount - rightItemCount + 1, lastPageIndex)

            return [firstPageIndex, DOTS, ...rightRange]
        }

        //case 4: both left and right DOTS are shown
        if (showLeftDots && showRightDots){
            let middleRange = range(leftSiblingIndex, rightSiblingIndex)
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
        }

    }, [totalCount, pageSize, siblingCount, currentPage])

    return paginationRange
}