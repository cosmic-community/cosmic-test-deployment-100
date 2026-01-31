import Link from 'next/link'
import { BlogPost } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: BlogPost
}

export default function PostCard({ post }: PostCardProps) {
  const publishedDate = post.metadata?.published_date
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Image */}
      {post.metadata?.featured_image && (
        <Link href={`/posts/${post.slug}`} className="block overflow-hidden">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Categories */}
        {post.metadata?.categories && post.metadata.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.metadata.categories.slice(0, 2).map((category) => (
              <CategoryBadge key={category.id} category={category} size="sm" />
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-2">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {/* Author */}
            {post.metadata?.author && (
              <Link 
                href={`/authors/${post.metadata.author.slug}`}
                className="flex items-center hover:text-gray-900 transition-colors"
              >
                {post.metadata.author.metadata?.avatar && (
                  <img
                    src={`${post.metadata.author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.metadata?.name || post.metadata.author.title}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                )}
                <span>{post.metadata.author.metadata?.name || post.metadata.author.title}</span>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {publishedDate && (
              <span>{publishedDate}</span>
            )}
            {post.metadata?.read_time && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.metadata.read_time}m
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}