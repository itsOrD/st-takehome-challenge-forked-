import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
// import matchers from '@testing-library/jest-dom/matchers';

// ToDo: implement this if needed
// Extend Vitest 'expect' methods to include those in react-testing-library
// expect.extend(matchers as any);

afterEach(() => {
  cleanup()
});
