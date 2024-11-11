import type { JestMatchers } from '@testing-library/jest-dom';
import '@testing-library/jest-dom'

declare module 'vitest' {
  interface Assertion<T = unknown> extends JestMatchers<T> {
    // Add jest-dom maters
    toBeInTheDocument(): void
    toHaveStyle(css: Record<string, string>): void
    // ToDo: Add other jest-dom matchers as req'd
  }
}
