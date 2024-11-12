import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ArticleCarousel from "./ArticleCarousel";

describe('ArticleCarousel', () => {

  // ToDo: Make less brittle by not requiring manual updates within this/every
  //       test file that relies on data from api.
  
  // Create an Articles[] full of mock articles for testing against
  const mockArticles = Array.from({ length: 6 }, (_, i) => ({
    articleId: i,
    thumbnailURL: `https://example.com/images${i}`,
    title: `Article ${i}`,
    body: `Content ${i}`,
    articleURL: `https://example.com/${i}`,
  }))

  it('renders initial set of articles', () => {
    const { container } = render(<ArticleCarousel articles={mockArticles} />);
    const articles = container.querySelectorAll('article');
    expect(articles.length).toBe(3);
  });

  // Navigation tests
  describe('navigation', () => {
    it('shows next set of articles when clicking next arrow', () => {
      render(<ArticleCarousel articles={mockArticles} />);
      
      // Get initial articles
      const firstArticleTitle = screen.getByText('Article 0');
      expect(firstArticleTitle).toBeInTheDocument();

      // Click next arrow
      const nextButton = screen.getByLabelText('Next articles');
      fireEvent.click(nextButton);

      expect(firstArticleTitle).not.toBeInTheDocument();
      expect(screen.getByText('Article 3')).toBeInTheDocument();
    });

    it('shows previous set of articles when clicking previous arrow', () => {
      render(<ArticleCarousel articles={mockArticles} />);
      
      // Navigate forward first
      fireEvent.click(screen.getByLabelText('Next articles'));
      // Then back
      fireEvent.click(screen.getByLabelText('Previous articles'));

      expect(screen.getByText('Article 0')).toBeInTheDocument();
    });

    it('handles wrapping around at the end of the list', () => {
      render(<ArticleCarousel articles={mockArticles} />);
      const nextButton = screen.getByLabelText('Next articles');

      // Click next twice to reach "end"
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);

      expect(screen.getByText('Article 3')).toBeInTheDocument();
    });
  })
});
