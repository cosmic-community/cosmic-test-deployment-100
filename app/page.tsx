import { getPosts, getFeaturedPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import FeaturedPost from '@/components/FeaturedPost'
import CategoryFilter from '@/components/CategoryFilter'

export default async function HomePage() {
  const [posts, featuredPosts, categories] = await Promise.all([
    getPosts(),
    getFeaturedPosts(),
    getCategories()
  ])

  const mainFeatured = featuredPosts[0]
  const regularPosts = posts.filter(post => !post.metadata?.is_featured)

  return (
    <div className="py-12">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Welcome to the Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover insights on technology, web development, and design from our team of expert writers.
          </p>
        </div>

        {/* Featured Post */}
        {mainFeatured && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
            <FeaturedPost post={mainFeatured} />
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-12">
          <CategoryFilter categories={categories} />
        </div>

        {/* All Posts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
        </div>
        
        {regularPosts.length === 0 ? (
          <p className="text-gray-600 text-center py-12">No articles found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}