import { useState } from 'react';
import { useArticles } from '../../hooks/useArticles'
import ArticleCarousel from '../ArticleCarousel/ArticleCarousel';
import styles from './ArticleView.module.css';

interface ArticleViewProps {
  articlesPerView: number;
}

const ArticleView = ({ articlesPerView }: ArticleViewProps) => {
  const { articles, isLoading, error } = useArticles();
  const [ carouselCount, setCarouselCount ] = useState(1);
  
  if (isLoading) return <div role="alert">Loading...</div>
  if (error) return <div role="alert">An error occurred</div>

  const handleShowMore = () => {
    setCarouselCount(prev => prev + 1);
  };

  const handleShowLess = () => {
    // Ensure there is always at least one carousel!
    setCarouselCount(prev => Math.max(1, prev - 1));
  };

  return (
    <div className={styles.container}>
      {Array.from({ length: carouselCount })
        .map((_, idx) => (
          <div key={idx}>
            <ArticleCarousel
              articlesPerView={articlesPerView}
              onShowMore={handleShowMore}
              onShowLess={handleShowLess}
              isExpanded={idx !== carouselCount - 1}
              totalArticles={articles.length}
            />
          </div>
        ))}
    </div>
  );

};

export default ArticleView;
