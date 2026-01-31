import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  activeSlug?: string
}

export default function CategoryFilter({ categories, activeSlug }: CategoryFilterProps) {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/"
        className={`px-4 py-2 rounded-full font-medium transition-colors ${
          !activeSlug
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Posts
      </Link>
      {categories.map((category) => {
        const isActive = activeSlug === category.slug
        const categoryColor = category.metadata?.color || '#3B82F6'
        
        return (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className={`px-4 py-2 rounded-full font-medium transition-colors`}
            style={
              isActive
                ? { backgroundColor: categoryColor, color: 'white' }
                : { backgroundColor: `${categoryColor}15`, color: categoryColor }
            }
          >
            {category.metadata?.name || category.title}
          </Link>
        )
      })}
    </div>
  )
}