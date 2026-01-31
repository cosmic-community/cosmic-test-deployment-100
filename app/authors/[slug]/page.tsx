// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAuthorBySlug, getPostsByAuthor, getAuthors } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)

  return (
    <div className="py-12">
      <div className="container">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Author Header */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
          {author.metadata?.avatar && (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
              alt={author.metadata?.name || author.title}
              width={150}
              height={150}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {author.metadata?.name || author.title}
            </h1>
            {author.metadata?.bio && (
              <p className="text-xl text-gray-600 mb-4">
                {author.metadata.bio}
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              {author.metadata?.email && (
                <a 
                  href={`mailto:${author.metadata.email}`}
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {author.metadata.email}
                </a>
              )}
              {author.metadata?.twitter && (
                <a 
                  href={`https://twitter.com/${author.metadata.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  {author.metadata.twitter}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Articles by {author.metadata?.name || author.title}
          </h2>
          {posts.length === 0 ? (
            <p className="text-gray-600">No articles found by this author.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}