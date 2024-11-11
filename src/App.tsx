import { useEffect, useState } from "react";
import { Article, fetchArticles } from "./api/articlesApi";
import "./App.css";
import ArticleCard from "./components/ArticleCard/ArticleCard";

function App() {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetchArticles()
      .then(articles => setArticle(articles[
        Math.floor(Math.random() * articles.length) // Ensure that more than just one article loads
      ]))
      .catch(err => console.error(`Failed to fetch article: `, err));
  }, []); // only run when the component mounts (for now)

  // Guard clause to deal with nulls
  if (!article) return <div>Loading..?</div>

  return (
    <div>
      <ArticleCard article={article}/>
    </div>
  );
}

export default App;
