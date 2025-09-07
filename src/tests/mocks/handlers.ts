import { http, HttpResponse } from "msw";

export const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 15 },
  { id: 3, name: "Product 3", price: 20 },
];

export const handlers = [
  http.get("/categories", () => {
    return HttpResponse.json([
      { id: 1, name: "Electronics" },
      { id: 2, name: "Beauty" },
      { id: 3, name: "Gardening" },
    ]);
  }),

  http.get("/products", () => {
    return HttpResponse.json(products);
  }),

  http.get<{ id: string }>("/products/:id", ({ params }) => {
    const { id } = params as { id: string };
    const product = products.find((prod) => prod.id === parseInt(id));
    if (!product) new HttpResponse(null, { status: 404 });
    return HttpResponse.json(product);
  }),
];
