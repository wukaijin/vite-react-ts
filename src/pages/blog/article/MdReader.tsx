/*
 * @Author: Carlos
 * @Date: 2023-01-13 16:23:36
 * @LastEditTime: 2023-01-29 00:19:03
 * @FilePath: /vite-react-swc/src/pages/blog/article/MdReader.tsx
 * @Description:
 */
import ReactMarkdown, { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './markdown.scss'
import { HTMLAttributes, memo } from 'react'

const componentsConfig: Components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        // lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
        wrapLongLines
        showLineNumbers
        style={atomDark as any}
        language={match[1]}
        PreTag="div"
        customStyle={{ margin: 0 }}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }
}
type Props = HTMLAttributes<HTMLDivElement>
const plugins = [remarkGfm]
const MdReader = memo((props: Props) => {
  return (
    // div
    <ReactMarkdown className="markdown-body" remarkPlugins={plugins} components={componentsConfig}>
      {props.children as string}
    </ReactMarkdown>
  )
})
export default MdReader
