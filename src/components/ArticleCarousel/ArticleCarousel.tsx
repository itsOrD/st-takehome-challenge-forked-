import { useState } from 'react';
import { Article } from '../../api/articlesApi';
import ArticleCard from '../ArticleCard/ArticleCard';
import styles from './ArticleCarousel.module.css';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';

interface ArticleCarouselProps {
  articles: Article[];
}

const ArticleCarousel = ({ articles }: ArticleCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (
      (prev + 3) >= articles.length ? 3 : prev + 3
    ));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (
      (prev - 3 < 0) ? articles.length - 3 : prev - 3
    ));
  };

  const visibleArticles = articles.slice(currentIndex, currentIndex + 3);

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
          onClick={handleNext}
          showAll={false}
        />
      </div>
    </div>
  )
};

export default ArticleCarousel;
