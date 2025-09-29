import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App", () => {
  it("walks through the portal flow", () => {
    render(<App />);

    // Landing view
    expect(screen.getByRole("heading", { name: /creativeops portal/i })).toBeInTheDocument();
    const enterButton = screen.getByRole("button", { name: /enter portal/i });
    expect(enterButton).toBeInTheDocument();

    fireEvent.click(enterButton);

    // Portal view
    expect(screen.getByRole("heading", { name: /welcome to the portal/i })).toBeInTheDocument();
    const dashboardButton = screen.getByRole("button", { name: /continue to dashboard/i });
    expect(dashboardButton).toBeInTheDocument();

    fireEvent.click(dashboardButton);

    // Dashboard view
    expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument();
    expect(
      screen.getByText(/key metrics and recent activity for/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/your live dashboard goes here/i)).toBeInTheDocument();
  });
});
