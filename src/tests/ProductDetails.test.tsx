import { render, screen } from "@testing-library/react";
import ProductDetail from "../components/ProductDetail";
import { server } from "./mocks/server";
import { products } from "./mocks/handlers";
import { http, HttpResponse } from "msw";

describe("Product Details", () => {
  function renderComponent(id?: number) {
    const mcProdId = id || 0;

    render(<ProductDetail productId={mcProdId} />);

    return {
      mcProdId,
      noProdIdMsg: screen.findByText("The given product was not found."),
    };
  }

  it("It should render list of products", async () => {
    renderComponent(1);

    expect(
      await screen.findByText(new RegExp(products[0]?.name))
    ).toBeInTheDocument();
    expect(
      await screen.findByText(new RegExp(products[0]?.price.toString()))
    ).toBeInTheDocument();
  });

  it("Should render product not found message", async () => {
    renderComponent(0);

    expect(await screen.findByText(/Invalid ProductId/)).toBeInTheDocument();
  });
});
