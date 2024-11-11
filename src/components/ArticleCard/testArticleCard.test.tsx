import { render, screen } from '@testing-library/react';
import ArticleCard from './ArticleCard';
import { Article } from '../../api/articlesApi';
import { describe, expect, it } from 'vitest';

// Factory for articles to be created in various states, modified, than used in tests
const createArticle = (overrides: Partial<Article> = {}): Article => ({
  articleId: Math.floor(Math.random() * 1000),
  title: 'TEST TITLE',
  body: 'TEST BODY',
  thumbnailURL: 'https://picsum.photos/200/300',
  articleURL: 'https://example.com/articles/lorem-ipsum',
  ...overrides
});

describe('ArticleCard', () => {
  it('should display aritcle title and body', () => {
    const article = createArticle({
      title: 'Super long title'.repeat(10), // ToDo: Establish a title max length and/or long title handler
      body: 'Copiously worded body content'.repeat(50) // ToDo: Establish max length per view type
    })

    render(<ArticleCard article={article} />)

    // expect(screen.getAllByText(article.title)).toBeInTheDocument()
    expect(screen.getByText(article.title)).toBeInTheDocument();
    expect(screen.getByText(article.body)).toBeInTheDocument()
  })

  it('should handle articles with special characters in content', () => {
    const article = createArticle({
      title: '¿Special Characters & Symbols? <script>alert("xss")</script>',
      body: '© Special Characters & Symbols 你好 🎉'
    })
    
    render(<ArticleCard article={article} />)
    
    expect(screen.getByText(article.title)).toBeInTheDocument()
    expect(screen.getByText(article.body)).toBeInTheDocument()
  })

  it('should have a working "Read More" link with correct URL', () => {
    const article = createArticle({
      articleURL: 'https://example.com/articles/with-special-chars?id=123&type=news#section'
    })
    
    render(<ArticleCard article={article} />)
    
    const link = screen.getByText('Read More')
    expect(link).toHaveAttribute('href', article.articleURL)
  })

});
