import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-gray-700">{children}</li>
        ),
        a: ({ href, children }) => (
          <a 
            href={href} 
            className="text-primary-600 hover:text-primary-700 underline"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-600 my-6">
            {children}
          </blockquote>
        ),
        code: ({ className, children }) => {
          const isInline = !className
          if (isInline) {
            return (
              <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            )
          }
          return (
            <code className={className}>
              {children}
            </code>
          )
        },
        pre: ({ children }) => (
          <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto mb-4 text-sm">
            {children}
          </pre>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900">{children}</strong>
        ),
        hr: () => <hr className="border-gray-200 my-8" />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}