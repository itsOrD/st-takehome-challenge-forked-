import { useState } from 'react';
import { useArticles } from '../../hooks/useArticles';
import ArticleCard from '../ArticleCard/ArticleCard';
import styles from './ArticleCarousel.module.css';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

interface ArticleCarouselProps {
  articlesPerView: number;
  onShowMore: () => void;
  onShowLess: () => void;
  isExpanded: boolean;
  totalArticles: number;
}

const ArticleCarousel = ({
  articlesPerView,
  onShowMore,
  onShowLess,
  isExpanded,
  totalArticles
}: ArticleCarouselProps) => {
  const { articles, isLoading, error } = useArticles();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) return <div role="alert" aria-busy="true">Loading...</div>;
  if (error) return <div role="alert">{error}</div>;
  if (!Array.isArray(articles)) 
    return <div role="alert">Error loading articles</div>;

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - articlesPerView;
      return newIndex < 0 ? totalArticles - articlesPerView : newIndex;
    })
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + articlesPerView;
      return newIndex >= totalArticles ? 0 : newIndex;
    });
  };

  const visibleArticles = articles.slice(currentIndex, currentIndex + articlesPerView);

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.container}>

        <button
          className={`${styles.arrow} ${styles.leftArrow}`}
          onClick={handlePrevious}
          aria-label="Previous articles"
          >
            ←
        </button>

        <div className={styles.carousel}>
          {/* Map through visible articles and render an ArticleCard for each */}
          {
            visibleArticles.map((article) => (
              <ArticleCard
                key={article.articleId}
                article={article}
              />
            ))
          }
        </div>

        <button
          className={`${styles.arrow} ${styles.rightArrow}`}
          onClick={handleNext}
          aria-label="Next articles"
          >
            →
        </button>

        <LoadMoreButton
          onClick={isExpanded ? onShowLess : onShowMore}
          showAll={isExpanded}
        />
      </div>
    </div>
  )
};

export default ArticleCarousel;
