import ReactMarkdown from "react-markdown";

export default function ArticleModal({ article, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{article.title}</h2>
          <button onClick={onClose} className="text-2xl hover:text-brand">✕</button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <ReactMarkdown className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-p:leading-relaxed">
            {article.content}
          </ReactMarkdown>

          {article.status === "updated" && article.references && (
            <div className="mt-8 pt-6 border-t dark:border-slate-700">
              <h3 className="font-semibold mb-4 text-lg">References</h3>
              <ul className="space-y-2">
                {article.references.map((ref, i) => (
                  <li key={i} className="text-sm">
                    <a href={ref} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                      🔗 {ref}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
