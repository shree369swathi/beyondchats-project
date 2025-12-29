import { Badge } from "./ui/Badge";
import { FileText } from "lucide-react";

export default function ArticleCard({ article, onClick }) {
  const preview = article.content.slice(0, 120).replace(/\[AI.*?\]/, '') + "...";
  const words = article.content.split(/\s+/).length;
  const isUpdated = article.status === "updated";

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50 hover:border-[#6366f1]/50 overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-2xl ${isUpdated ? 'bg-gradient-to-r from-green-400/20 to-emerald-500/20 border border-green-200/50' : 'bg-gradient-to-r from-blue-400/20 to-indigo-500/20 border border-blue-200/50'}`}>
          <FileText className={`w-6 h-6 ${isUpdated ? 'text-green-500' : 'text-blue-500'}`} />
        </div>
        <Badge variant={article.status} className="shadow-lg">
          {article.status.toUpperCase()}
        </Badge>
      </div>

      <h2 className="font-black text-xl md:text-2xl mb-4 leading-tight group-hover:text-[#6366f1] transition-colors pr-4">
        {article.title}
      </h2>

      <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-sm">
        {preview}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 px-4 py-2 rounded-full font-semibold shadow">
          {words} words
        </span>
      </div>

      {isUpdated && article.references?.length && (
        <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <span className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium">
            {article.references.length} References
          </span>
        </div>
      )}
    </div>
  );
}
