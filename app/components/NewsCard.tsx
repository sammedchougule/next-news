import Image from "next/image"
import Link from "next/link"

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

export default function NewsCard({ article }: { article: Article }) {
  const articleData = encodeURIComponent(JSON.stringify(article))

  return (
    <Link
      href={`/article/${articleData}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105"
    >
      <div className="relative h-48">
        <Image src={article.urlToImage || "/placeholder.svg"} alt={article.title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.description || "No description available."}</p>
        <p className="text-sm text-gray-500">
          {new Date(article.publishedAt).toLocaleDateString()} | {article.source.name}
        </p>
      </div>
    </Link>
  )
}

