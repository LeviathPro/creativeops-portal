import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App step transitions", () => {
  it("walks through the landing, portal, and dashboard views", async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(
      screen.getByRole("heading", { name: /CreativeOps Portal/i })
    ).toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /Enter Portal/i }));
    });
    expect(
      await screen.findByRole("heading", { name: /Welcome to the Portal/i })
    ).toBeInTheDocument();

    await act(async () => {
      await user.click(
        screen.getByRole("button", { name: /Continue to Dashboard/i })
      );
    });

    expect(
      await screen.findByRole("heading", { name: /Dashboard/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Key metrics and recent activity for/i)
    ).toBeInTheDocument();
  });
});
