import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App step transitions", () => {
  it("walks through the landing, portal, sign in, and dashboard views", async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(screen.getByRole("heading", { name: /CreativeOps Portal/i })).toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /Enter Portal/i }));
    });

    const portalPanel = await screen.findByRole("heading", { name: /Portal Overview/i });
    expect(portalPanel).toBeInTheDocument();

    const portalSection = within(portalPanel.closest("div"));
    expect(portalSection.getByText(/Daily Brief/i)).toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /Go to Sign in/i }));
    });

    expect(
      await screen.findByRole("heading", { name: /Administrative Sign in/i })
    ).toBeInTheDocument();

    await act(async () => {
      await user.type(screen.getByLabelText(/Email address/i), "ops@example.com");
      await user.type(screen.getByLabelText(/Password/i), "password123");
      await user.click(screen.getByRole("button", { name: /^Sign in$/i }));
    });

    expect(
      await screen.findByRole("heading", { name: /Administrative Dashboard/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/active installations/i)).toBeInTheDocument();
  });

  it("allows the LeviathProductions admin account to edit portal content", async () => {
    const user = userEvent.setup();

    render(<App />);

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /Enter Portal/i }));
    });

    await screen.findByRole("heading", { name: /Portal Overview/i });

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /Go to Sign in/i }));
    });

    const emailField = await screen.findByLabelText(/Email address/i);
    const passwordField = await screen.findByLabelText(/Password/i);

    await act(async () => {
      await user.type(emailField, "LeviathProductions@gmail.com");
      await user.type(passwordField, "superSecure!1");
      await user.click(screen.getByRole("button", { name: /^Sign in$/i }));
    });

    const landingTitleField = await screen.findByLabelText(/Landing title/i);
    await act(async () => {
      await user.clear(landingTitleField);
      await user.type(landingTitleField, "CreativeOps Control Center");
    });

    expect(landingTitleField).toHaveValue("CreativeOps Control Center");

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /Return to Portal/i }));
    });

    await screen.findByRole("heading", { name: /Portal Overview/i });

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /^Back$/i }));
    });

    expect(
      await screen.findByRole("heading", { name: /CreativeOps Control Center/i })
    ).toBeInTheDocument();
  });
});
