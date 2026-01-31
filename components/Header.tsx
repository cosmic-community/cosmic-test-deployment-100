import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TechBlog</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Home
            </Link>
            <Link href="/categories/technology" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Technology
            </Link>
            <Link href="/categories/web-development" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Development
            </Link>
            <Link href="/categories/design" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Design
            </Link>
          </nav>
          <button className="md:hidden p-2 text-gray-600 hover:text-gray-900" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}