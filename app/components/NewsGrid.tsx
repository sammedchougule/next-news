import NewsCard from "./NewsCard"
import ErrorBoundary from "./ErrorBoundary"
import Pagination from "./Pagination"

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

interface NewsGridProps {
  category: string
  page: number
}

export default async function NewsGrid({ category, page }: NewsGridProps) {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=8&apiKey=${apiKey}`,
  )
  const data = await response.json()
  const articles: Article[] = data.articles
  const totalResults = data.totalResults

  if (articles.length === 0) {
    return <div className="text-center mt-8">No articles found.</div>
  }

  const totalPages = Math.ceil(totalResults / 8)

  return (
    <ErrorBoundary fallback={<div>Error loading news. Please try again later.</div>}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {articles.map((article) => (
          <NewsCard key={article.url} article={article} />
        ))}
      </div>
      <div className="mt-8">
        <Pagination currentPage={page} totalPages={totalPages} category={category} />
      </div>
    </ErrorBoundary>
  )
}

