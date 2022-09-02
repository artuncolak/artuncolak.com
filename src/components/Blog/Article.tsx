import ReactMarkdown from 'react-markdown';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

import CodeBlock from './CodeBlock';
import PostImage from './PostImage';

interface Props {
  markdown: string;
}

export default function Article({ markdown }: Props) {
  return (
    <article className="prose prose-zinc prose-cyan max-w-none prose-code:rounded prose-code:bg-zinc-100 prose-code:p-1 dark:prose-invert dark:prose-code:bg-zinc-800 md:prose-lg">
      <ReactMarkdown
        rehypePlugins={[[rehypePrism, { showLineNumbers: true }], remarkGfm]}
        components={{
          pre: (props) => <CodeBlock {...props} />,
          img: (props) => <PostImage src={props.src} alt={props.alt} />,
          a: (props) => (
            <a target="_blank" rel="noopener noreferrer" {...props} />
          )
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
