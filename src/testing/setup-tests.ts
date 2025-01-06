import { beforeEach, vi } from "vitest"

beforeEach(() => {
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))

  vi.stubGlobal("ResizeObserver", ResizeObserverMock)

  window.btoa = (str: string) => Buffer.from(str, "binary").toString("base64")
  window.atob = (str: string) => Buffer.from(str, "base64").toString("binary")

  // initializeDb();
})

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
