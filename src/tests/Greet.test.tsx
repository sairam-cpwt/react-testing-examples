import { render, screen } from "@testing-library/react";
import Greet from "../components/Greet";

describe("Render Greet", () => {
  it("Should render correctly with name", () => {
    render(<Greet name="mosh" />);
    const headingEl = screen.getByRole("heading", {
      level: 1,
    });

    expect(headingEl).toHaveTextContent(/Hello mosh/);
  });

  it("Should render without  name", () => {
    render(<Greet />);
    const headingEl = screen.getByRole("button");
    expect(headingEl).toBeInTheDocument();
  });
});
