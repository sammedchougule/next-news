"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Unhandled error:", error)
  }, [error])

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-4">We're sorry, but an unexpected error occurred.</p>
      <p className="mb-4">Error details: {error.message}</p>
      {typeof reset === "function" && (
        <button onClick={() => reset()} className="bg-blue-500 text-white px-4 py-2 rounded mr-4">
          Try again
        </button>
      )}
      <Link href="/" className="text-blue-500 hover:underline">
        Return to homepage
      </Link>
    </main>
  )
}

