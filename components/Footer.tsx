import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TechBlog</span>
            </Link>
            <p className="text-gray-600 max-w-md">
              Discover insights on technology, web development, and design from our team of expert writers.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/technology" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/categories/web-development" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/categories/design" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.cosmicjs.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Powered by Cosmic
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-center text-gray-600 text-sm">
            © {currentYear} TechBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}