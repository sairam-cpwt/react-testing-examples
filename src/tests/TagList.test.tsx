import { screen, waitFor } from "@testing-library/dom";
import TagList from "../components/TagList";
import { render } from "@testing-library/react";

describe("TagList", () => {
  const renderComponent = async () => {
    render(<TagList />);

    return {
      ListItemsEl: await screen.findAllByRole("listitem"),
    };
  };

  it("Render List Items", async () => {
    const { ListItemsEl } = await renderComponent();

    // await waitFor(() => {
    //   expect(ListItemsEl.length).toBeGreaterThan(0);
    // });

    expect(ListItemsEl.length).toBeGreaterThan(0);
  });
});
