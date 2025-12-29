import { useState } from "react";
import useArticles from "../hooks/useArticles";
import ArticleCard from "./ArticleCard";
import ArticleModal from "./ArticleModal";
import { Button } from "./ui/Button";

export default function ArticleGrid() {
  const { articles, loading, error } = useArticles();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  if (loading) return <div className="p-8 text-center"><p>Loading articles...</p></div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!articles.length) return <div className="p-8 text-center">No articles found.</div>;

  const filtered = articles.filter(a =>
    filter === "all" ? true : a.status === filter
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-8">
        <Button onClick={() => setFilter("all")} className={filter === "all" ? "bg-brand/90" : ""}>All</Button>
        <Button onClick={() => setFilter("original")} className={filter === "original" ? "bg-brand/90" : ""}>Original</Button>
        <Button onClick={() => setFilter("updated")} className={filter === "updated" ? "bg-brand/90" : ""}>Updated</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(article => (
          <ArticleCard
            key={article._id || article.id}
            article={article}
            onClick={() => setSelected(article)}
          />
        ))}
      </div>

      {selected && (
        <ArticleModal article={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
