export default function ArticleLayout({ title, children }) {
  return <article className="article"><p className="eyebrow">The fundamentals</p><h2 id="article-title">{title}</h2>{children}</article>;
}
