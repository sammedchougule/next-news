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

export default function ArticlePage({
  params,
}: {
  params: { encodedUrl: string }
}) {
  let article: Article

  try {
    article = JSON.parse(decodeURIComponent(params.encodedUrl)) as Article
  } catch (error) {
    console.error("Error parsing article data:", error)
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Error loading article</h1>
        <p>We're sorry, but we couldn't load the article you're looking for.</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Return to homepage
        </Link>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div className="mb-4 text-sm text-gray-600">
        <p>
          By {article.author || "Unknown"} | {new Date(article.publishedAt).toLocaleString()}
        </p>
        <p>Source: {article.source.name}</p>
      </div>
      <div className="mb-6">
        {article.urlToImage && (
          <Image
            src={article.urlToImage || "/placeholder.svg"}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-auto object-cover rounded-lg"
          />
        )}
      </div>
      <p className="text-xl mb-4 font-semibold">{article.description}</p>
      <div className="prose lg:prose-xl max-w-none">
        <p>{article.content ? article.content.split("[+")[0] : "Full content not available."}</p>
      </div>
      <div className="mt-8">
        <Link href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Read full article on {new URL(article.url).hostname}
        </Link>
      </div>
    </main>
  )
}

