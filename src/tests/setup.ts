import '@testing-library/jest-dom'
import { vi } from 'vitest';

class ResizeObserver {
  callback: ResizeObserverCallback;
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

Element.prototype.scrollIntoView = vi.fn();


global.ResizeObserver = ResizeObserver;
