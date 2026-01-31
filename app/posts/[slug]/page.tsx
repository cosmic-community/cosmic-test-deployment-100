// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getPosts } from '@/lib/cosmic'
import MarkdownContent from '@/components/MarkdownContent'
import CategoryBadge from '@/components/CategoryBadge'
import AuthorCard from '@/components/AuthorCard'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const publishedDate = post.metadata?.published_date
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article className="py-12">
      <div className="container max-w-4xl">
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

        {/* Categories */}
        {post.metadata?.categories && post.metadata.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.metadata.categories.map((category) => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
          {publishedDate && (
            <time className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {publishedDate}
            </time>
          )}
          {post.metadata?.read_time && (
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.metadata.read_time} min read
            </span>
          )}
        </div>

        {/* Featured Image */}
        {post.metadata?.featured_image && (
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <MarkdownContent content={post.metadata?.content || ''} />
        </div>

        {/* Author */}
        {post.metadata?.author && (
          <div className="border-t pt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">About the Author</h3>
            <AuthorCard author={post.metadata.author} />
          </div>
        )}
      </div>
    </article>
  )
}