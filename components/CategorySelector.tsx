"use client"

import Link from "next/link"
import { useRef, useEffect } from "react"

const categories = ["general", "business", "technology", "sports", "entertainment", "health", "science"]

export default function CategorySelector({ selectedCategory }: { selectedCategory: string }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current) {
        e.preventDefault()
        scrollContainerRef.current.scrollLeft += e.deltaY
      }
    }

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel)
      }
    }
  }, [])

  return (
    <div
      ref={scrollContainerRef}
      className="flex overflow-x-auto whitespace-nowrap py-4 scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {categories.map((category) => (
        <Link
          key={category}
          href={`/?category=${category}`}
          className={`inline-block px-4 py-2 mx-2 rounded-full ${
            selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Link>
      ))}
    </div>
  )
}

