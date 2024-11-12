import { useEffect, useState } from "react";
import { Article, fetchArticles } from "./api/articlesApi";
import "./App.css";
import ArticleCarousel from "./components/ArticleCarousel/ArticleCarousel";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";

function App() {
  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []); // only run when the component mounts (for now)

  // Guard clause to deal with nulls
  if (!articles) return <div>Loading..?</div>

  return (
    <div>
      <ArticleCarousel articles={articles} />
    </div>
  );
}

export default App;
