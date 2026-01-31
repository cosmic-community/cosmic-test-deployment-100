// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getPostsByCategory, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const categoryColor = category.metadata?.color || '#3B82F6'

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

        {/* Category Header */}
        <div className="mb-12">
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-medium mb-4"
            style={{ backgroundColor: categoryColor }}
          >
            {category.metadata?.name || category.title}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {category.metadata?.name || category.title}
          </h1>
          {category.metadata?.description && (
            <p className="text-xl text-gray-600 max-w-2xl">
              {category.metadata.description}
            </p>
          )}
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts found in this category.</p>
            <Link href="/" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
              View all posts
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-8">
              {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}