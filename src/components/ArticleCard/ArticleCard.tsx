import styles from './ArticleCard.module.css';
import { Article } from '../../api/articlesApi';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  // ToDo: add business logic as req'd for preview vs full article
  
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={article.thumbnailURL}
          alt={article.title}
        />
      </div>
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <a href={article.articleURL}>Read More</a>
    </article>
  );
};

export default ArticleCard;
