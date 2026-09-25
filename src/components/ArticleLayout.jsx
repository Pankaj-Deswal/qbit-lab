export default function ArticleLayout({ title, children }) {
  const learning = title === 'Introduction to quantum effects';
  return <article className="article"><p className="eyebrow">{learning ? 'Learn · 1 min read' : 'Calculator · Interactive tool'}</p><h2 id="article-title">{title}</h2>{children}</article>;
}
