import { Suspense } from "react"
import NewsGrid from "../components/NewsGrid"
import CategorySelector from "../components/CategorySelector"
import SearchBar from "../components/SearchBar"

export default function Home({
  searchParams,
}: {
  searchParams: { category?: string; page?: string }
}) {
  const category = searchParams.category || "general"
  const page = Number.parseInt(searchParams.page || "1", 10)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Next.js News</h1>
      <SearchBar />
      <CategorySelector selectedCategory={category} />
      <Suspense fallback={<div className="text-center mt-8">Loading...</div>}>
        <NewsGrid category={category} page={page} />
      </Suspense>
    </main>
  )
}

