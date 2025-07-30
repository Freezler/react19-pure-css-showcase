import { useState } from 'react'
import { Icon } from '@iconify/react'

interface CodeBlockProps {
  children: string
  language?: string
  className?: string
}

export function CodeBlock({ children, language = 'javascript', className = '' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className={`code-block-wrapper ${className}`}>
      <div className="code-block-header">
        <span className="code-block-language">{language}</span>
        <button 
          className="code-block-copy-button"
          onClick={handleCopy}
          title={copied ? 'Copied!' : 'Copy code'}
        >
          <Icon 
            icon={copied ? 'mdi:check' : 'mdi:content-copy'} 
            className="code-block-copy-icon"
          />
          <span className="code-block-copy-text">
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>
      </div>
      <pre className="code-block">
        <code className="code-content">{children}</code>
      </pre>
    </div>
  )
}