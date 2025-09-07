import { render, screen } from "@testing-library/react";
import ProductList from "../components/ProductList";
import { server } from "./mocks/server";
import { http, HttpResponse } from "msw";

describe("Product List", () => {
  const renderComponent = () => {
    render(<ProductList />);
  };

  it("Render List of products", async () => {
    renderComponent();

    const items = await screen.findAllByRole("listitem");
    expect(items.length).toBeGreaterThan(0);
  });

  it("Should render no products", async () => {
    server.use(http.get("/products", () => HttpResponse.json([])));
    renderComponent();

    const msg = await screen.findByText("No products available.");
    expect(msg).toBeInTheDocument();
  });
});
