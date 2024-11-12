import { useState, useEffect } from "react";
import { Article, fetchArticles } from "../api/articlesApi";


interface ArticlesState {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
}

// Custom hook for managing article data fetching and state
// Handles loading states, error handling, and data caching

export const useArticles = () => {
  const [state, setState] = useState<ArticlesState>({
    articles: [] as Article[],
    isLoading: true,
    error: null,
  });

  // ToDo: add throttle/debounce, persistent cache?, background sync, etc 

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        setState((prev: ArticlesState) => ({ ...prev, articles: data, isLoading: false }));
      } catch (err) {
        setState((prev: ArticlesState) => ({
          ...prev,
          error: err instanceof Error ? err.message : 'An error occurred',
          isLoading: false,
        }));
      }
    };

    loadArticles();
  }, []);

  // ToDo: Add methods for:
  // - refreshArticles()
  // - updateArticle(id: string, updates: Partial<Article>)
  // - invalidateCache()
  // - prefetchNextBatch()

  return state;
};
