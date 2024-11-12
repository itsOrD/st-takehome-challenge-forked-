import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ArticleCarousel from "./ArticleCarousel";

// ToDo: Move all re-useable test constants to a test constants file
const TOTAL_ARTICLES = 6;

// Create an Articles[] full of mock articles for testing against
const mockArticles = Array.from({ length: TOTAL_ARTICLES }, (_, i) => ({
  articleId: i,
  thumbnailURL: `https://example.com/images${i}`,
  title: `Article ${i}`,
  body: `Content ${i}`,
  articleURL: `https://example.com/${i}`,
}));

// Mock for the useArticles hook
vi.mock('../../hooks/useArticles', () => ({
  useArticles: () => ({
    articles: mockArticles,
    isLoading: false,
    error: null
  })
}));


// === === === ACTUAL TESTS === === === \\

// ToDo: Make less brittle by not requiring manual updates within this/every
//       test file that relies on data from api.
describe('ArticleCarousel', () => {
  // "Mock" props
  const defaultProps = {
    articlesPerView: 3,
    onShowMore: vi.fn(),
    onShowLess: vi.fn(),
    isExpanded: false,
    totalArticles: TOTAL_ARTICLES,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  })

  it('renders initial set of articles', () => {
    const { container } = render(<ArticleCarousel {...defaultProps} />);
    const articles = container.querySelectorAll('article');
    expect(articles.length).toBe(3);
  });

  // Navigation tests
  describe('navigation', () => {
    it('shows next set of articles when clicking next arrow', () => {
      render(<ArticleCarousel {...defaultProps} />);
      
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
      render(<ArticleCarousel {...defaultProps} />);
      
      // Navigate forward first
      fireEvent.click(screen.getByLabelText('Next articles'));
      // Then back
      fireEvent.click(screen.getByLabelText('Previous articles'));

      expect(screen.getByText('Article 0')).toBeInTheDocument();
    });

    it('handles wrapping around at the end of the list', () => {
      render(<ArticleCarousel {...defaultProps} />);
      const nextButton = screen.getByLabelText('Next articles');

      // Click next twice to reach "end" and wrap back
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);

      expect(screen.getByText('Article 0')).toBeInTheDocument();
    });
  })
});
