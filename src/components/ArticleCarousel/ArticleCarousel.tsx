import { useState } from 'react';
import { Article } from '../../api/articlesApi';
import ArticleCard from '../ArticleCard/ArticleCard';
import styles from './ArticleCarousel.module.css';

interface ArticleCarouselProps {
  articles: Article[];
}

const ArticleCarousel = ({ articles }: ArticleCarouselProps) => {
  // ToDo: implement forward button
  // ToDo: implement back button
  // ToDo: implement "show more"
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleArticles = articles.slice(currentIndex, currentIndex + 3);

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.container}>
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
      </div>
    </div>
  )
};

export default ArticleCarousel;
