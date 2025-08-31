import { render, screen } from "@testing-library/react";
import ExpandableText from "../components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const shortText = "Short text";

  it("Render correctly", () => {
    render(<ExpandableText text={shortText} />);
    const normalText = screen.getByRole("article");
    expect(normalText).toHaveTextContent(shortText);
  });

  it("Text Should Truncate", async () => {
    const longText = "a".repeat(256);
    const truncatedText = longText.substring(0, 255);
    userEvent.setup();

    render(<ExpandableText text={longText} />);

    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveTextContent(truncatedText + "...");

    const ShowMoreEl = screen.getByRole("button", { name: "Show More" });
    expect(ShowMoreEl).toBeInTheDocument();

    await userEvent.click(ShowMoreEl);

    expect(screen.getByRole("article")).toHaveTextContent(longText);
    expect(
      screen.getByRole("button", { name: "Show Less" })
    ).toBeInTheDocument();
  });
});
