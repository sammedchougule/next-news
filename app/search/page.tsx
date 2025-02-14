import { Suspense } from "react"
import NewsCard from "../components/NewsCard"
import SearchBar from "../components/SearchBar"
import Pagination from "../components/Pagination"
import ErrorBoundary from "../components/ErrorBoundary"

interface Article {
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
  author: string
  source: {
    name: string
  }
}

async function searchNews(query: string, page: number) {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY
  const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=8&apiKey=${apiKey}`)
  const data = await response.json()
  return {
    articles: data.articles as Article[],
    totalResults: data.totalResults as number,
  }
}

export default async function SearchResults({
  searchParams,
}: {
  searchParams: { q: string; page?: string }
}) {
  const query = searchParams.q
  const page = Number.parseInt(searchParams.page || "1", 10)
  const { articles, totalResults } = await searchNews(query, page)

  const totalPages = Math.ceil(totalResults / 8)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Search Results for "{query}"</h1>
      <SearchBar />
      <Suspense fallback={<div className="text-center mt-8">Loading...</div>}>
        <ErrorBoundary fallback={<div>Error loading search results. Please try again later.</div>}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {articles.map((article: Article) => (
              <NewsCard key={article.url} article={article} />
            ))}
          </div>
        </ErrorBoundary>
      </Suspense>
      <Pagination currentPage={page} totalPages={totalPages} searchQuery={query} />
    </main>
  )
}
