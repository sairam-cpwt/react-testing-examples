import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("Should render nothing if empty array", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("Should render List of images", () => {
    const urls = [
      "https://picsum.photos/id/1015/200/300",
      "https://picsum.photos/id/1016/200/300",
    ];
    render(<ProductImageGallery imageUrls={urls} />);

    const allImages = screen.getAllByRole("img");
    expect(allImages).toHaveLength(2);

    urls.forEach((url, idx) =>
      expect(allImages[idx]).toHaveAttribute("src", url)
    );
  });
});
