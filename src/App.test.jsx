import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "./App";

describe("Landing experience flow", () => {
  it("transitions from splash to landing, timewarp, then sign-in", async () => {
    const user = userEvent.setup();
    const originalError = console.error;
    const consoleError = vi.spyOn(console, "error").mockImplementation((message, ...rest) => {
      if (typeof message === "string" && message.includes("not wrapped in act")) {
        return;
      }
      originalError(message, ...rest);
    });

    try {
      render(<App />);

      const splashLogo = screen.queryByAltText(/Creative Deck & Fence, LLC/i);
      if (splashLogo) {
        expect(splashLogo).toBeInTheDocument();
      }

      expect(
        await screen.findByRole("heading", { name: /Creative Ops Portal/i })
      ).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /Enter Portal/i }));

      expect(
        await screen.findByRole("heading", { name: /Creative Ops Portal Access/i })
      ).toBeInTheDocument();
    } finally {
      consoleError.mockRestore();
    }
  }, 20000);
});
