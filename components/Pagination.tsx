"use client"
import { useRouter } from "next/navigation"

interface PaginationProps {
  currentPage: number
  totalPages: number
  category?: string
  searchQuery?: string
}

export default function Pagination({ currentPage, totalPages, category, searchQuery }: PaginationProps) {
  const router = useRouter()

  const baseUrl = searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : `/?category=${category || "general"}`

  const getPageUrl = (page: number) => `${baseUrl}&page=${page}`

  const handlePageChange = (page: number) => {
    router.push(getPageUrl(page))
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${i === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          {i}
        </button>,
      )
    }

    return pageNumbers
  }

  return (
    <div className="flex justify-center items-center mt-8">
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
      )}
      {renderPageNumbers()}
      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      )}
    </div>
  )
}

