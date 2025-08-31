import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  it("Check correct text and initial state", () => {
    render(<TermsAndConditions />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Terms & Conditions");

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    const submitEl = screen.getByRole("button", {
      name: "Submit",
    });

    expect(submitEl).toBeInTheDocument();
    expect(submitEl).toBeDisabled();
  });

  it("Enable button when checkbox checked", async () => {
    render(<TermsAndConditions />);
    const checkbox = screen.getByRole("checkbox");
    userEvent.setup();

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByRole("button", { name: "Submit" })).toBeEnabled();
  });
});
