import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  const renderComponent = () => {
    render(<TermsAndConditions />);

    return {
      heading: screen.getByRole("heading"),
      checkbox: screen.getByRole("checkbox"),
      button: screen.getByRole("button", {
        name: "Submit",
      }),
    };
  };

  it("Check correct text and initial state", () => {
    const { heading, checkbox, button } = renderComponent();

    expect(heading).toHaveTextContent("Terms & Conditions");
    expect(checkbox).not.toBeChecked();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("Enable button when checkbox checked", async () => {
    const { checkbox, button } = renderComponent();

    userEvent.setup();

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
  });
});
