// Jest setup file
import '@testing-library/jest-dom';

// Mock Sentry globally
jest.mock('@sentry/nextjs', () => ({
  init: jest.fn(),
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  setUser: jest.fn(),
  withScope: jest.fn((callback) => callback({ setExtras: jest.fn() })),
  browserTracingIntegration: jest.fn(() => ({})),
}));
