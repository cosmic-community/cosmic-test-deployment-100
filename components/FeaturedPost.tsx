import Link from 'next/link'
import { BlogPost } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface FeaturedPostProps {
  post: BlogPost
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const publishedDate = post.metadata?.published_date
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article className="group relative bg-gray-900 rounded-3xl overflow-hidden">
      {/* Background Image */}
      {post.metadata?.featured_image && (
        <div className="absolute inset-0">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative p-8 md:p-12 lg:p-16">
        <div className="max-w-3xl">
          {/* Categories */}
          {post.metadata?.categories && post.metadata.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.metadata.categories.map((category) => (
                <CategoryBadge key={category.id} category={category} />
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            <Link href={`/posts/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </h2>

          {/* Excerpt */}
          {post.metadata?.excerpt && (
            <p className="text-lg md:text-xl text-gray-300 mb-6 line-clamp-2">
              {post.metadata.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400">
            {/* Author */}
            {post.metadata?.author && (
              <Link 
                href={`/authors/${post.metadata.author.slug}`}
                className="flex items-center hover:text-white transition-colors"
              >
                {post.metadata.author.metadata?.avatar && (
                  <img
                    src={`${post.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.metadata?.name || post.metadata.author.title}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full mr-3 border-2 border-white/20"
                  />
                )}
                <span className="font-medium">{post.metadata.author.metadata?.name || post.metadata.author.title}</span>
              </Link>
            )}

            {publishedDate && (
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {publishedDate}
              </span>
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

          {/* Read More */}
          <Link 
            href={`/posts/${post.slug}`}
            className="inline-flex items-center mt-8 px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            Read Article
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}