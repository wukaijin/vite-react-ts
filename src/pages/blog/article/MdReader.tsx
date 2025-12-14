/*
 * @Author: Carlos
 * @Date: 2023-01-13 16:23:36
 * @LastEditTime: 2023-01-30 16:39:18
 * @FilePath: /vite-react-ts/src/pages/blog/article/MdReader.tsx
 * @Description:
 */
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './markdown.scss'
import { type HTMLAttributes, memo } from 'react'

const componentsConfig: Components = {
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    if (!match) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
    return (
      <SyntaxHighlighter
        // wrapLongLines
        showLineNumbers={true}
        // @ts-expect-error 组件 style 和 JSX style 类型检测冲突
        style={atomDark}
        language={match[1]}
        PreTag="div"
        customStyle={{ margin: 0, overflowY: 'auto' }}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    )
  }
}
type Props = HTMLAttributes<HTMLDivElement>
const plugins = [remarkGfm]
const MdReader = memo((props: Props) => {
  return (
    // div
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={plugins} components={componentsConfig}>
        {props.children as string}
      </ReactMarkdown>
    </div>
  )
})
export default MdReader
