import { useState } from 'react'
import { Icon } from '@iconify/react'

interface CodeBlockProps {
  code?: string
  children?: string
  language?: string
  className?: string
  showLineNumbers?: boolean
  title?: string
}

export function CodeBlock({ 
  code, 
  children, 
  language = 'javascript', 
  className = '',
  showLineNumbers = false,
  title
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const codeContent = code || children || ''

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const formatCodeWithLineNumbers = (code: string) => {
    return code.split('\n').map((line, index) => (
      <div key={index} className="code-line">
        {showLineNumbers && (
          <span className="code-line-number">{index + 1}</span>
        )}
        <span className="code-line-content">{line}</span>
      </div>
    ))
  }

  return (
    <div className={`code-block-wrapper ${className}`}>
      <div className="code-block-header">
        <div className="code-block-info">
          {title && <span className="code-block-title">{title}</span>}
          <span className="code-block-language">{language}</span>
        </div>
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
        <code className="code-content">
          {showLineNumbers ? formatCodeWithLineNumbers(codeContent) : codeContent}
        </code>
      </pre>
    </div>
  )
}