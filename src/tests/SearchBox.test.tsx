import { render, screen } from "@testing-library/react";
import SearchBox from "../components/SearchBox";
import userEvent from "@testing-library/user-event";

describe("SearchBox", () => {
  const renderComponent = () => {
    const onChange = vi.fn();
    render(<SearchBox onChange={onChange} />);

    return {
      inputEl: screen.getByPlaceholderText("Search..."),
      onChangeMoc: onChange,
      userEvent: userEvent.setup(),
    };
  };

  it("Component render", () => {
    const { inputEl } = renderComponent();
    expect(inputEl).toBeInTheDocument();
  });

  it("Should Call onChange when enter pressed", async () => {
    const { inputEl, onChangeMoc, userEvent } = renderComponent();

    await userEvent.type(inputEl, "Hello{enter}");
    expect(onChangeMoc).toHaveBeenCalledWith("Hello");
  });

  it("Should't Call onChange when input is empty", async () => {
    const { inputEl, onChangeMoc, userEvent } = renderComponent();

    await userEvent.type(inputEl, "{enter}");
    expect(onChangeMoc).not.toBeCalled();
  });
});
