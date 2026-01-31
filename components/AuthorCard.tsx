import Link from 'next/link'
import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl">
      {author.metadata?.avatar && (
        <Link href={`/authors/${author.slug}`}>
          <img
            src={`${author.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={author.metadata?.name || author.title}
            width={80}
            height={80}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
          />
        </Link>
      )}
      <div className="flex-1">
        <Link 
          href={`/authors/${author.slug}`}
          className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors"
        >
          {author.metadata?.name || author.title}
        </Link>
        {author.metadata?.bio && (
          <p className="text-gray-600 mt-1 line-clamp-2">
            {author.metadata.bio}
          </p>
        )}
        <div className="flex items-center gap-4 mt-3">
          {author.metadata?.twitter && (
            <a 
              href={`https://twitter.com/${author.metadata.twitter.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          )}
          {author.metadata?.email && (
            <a 
              href={`mailto:${author.metadata.email}`}
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}