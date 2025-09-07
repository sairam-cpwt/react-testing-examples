import { render, screen } from "@testing-library/react";
import ToastDemo from "../components/ToastDemo";
import { Toaster } from "react-hot-toast";
import userEvent from "@testing-library/user-event";

describe("ToastDemo", () => {
  it("Should Render a toast", async () => {
    render(
      <>
        <ToastDemo />
        <Toaster />
      </>
    );

    userEvent.setup();

    const BtnEl = screen.getByRole("button");

    await userEvent.click(BtnEl);

    expect(await screen.findByText("Success")).toBeInTheDocument();
  });
});
