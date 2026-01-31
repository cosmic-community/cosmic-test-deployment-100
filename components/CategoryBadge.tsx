import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
}

export default function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const categoryColor = category.metadata?.color || '#3B82F6'
  
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-1 text-xs' 
    : 'px-3 py-1.5 text-sm'

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-flex items-center rounded-full font-medium transition-opacity hover:opacity-80 ${sizeClasses}`}
      style={{ 
        backgroundColor: `${categoryColor}20`,
        color: categoryColor
      }}
    >
      {category.metadata?.name || category.title}
    </Link>
  )
}