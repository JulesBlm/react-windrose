import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Cleanup after each test case
afterEach(() => {
  cleanup();
});

// Extend Vitest's expect with custom matchers if needed
// You can add custom matchers here in the future
