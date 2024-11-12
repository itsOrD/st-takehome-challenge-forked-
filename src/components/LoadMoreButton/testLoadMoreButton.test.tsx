import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoadMoreButton from './LoadMoreButton';

describe('LoadMoreButton', () => {
  it('displays "Show More" when showAll is false', () => {
    const mockClick = vi.fn();
    render(<LoadMoreButton onClick={mockClick} showAll={false} />);
    
    expect(screen.getByText('+ Show More +')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockClick = vi.fn();
    render(<LoadMoreButton onClick={mockClick} showAll={false} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

});
