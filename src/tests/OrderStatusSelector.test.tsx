import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderStatusSelector from "../components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";

const renderComponent = () => {
  const onChange = vi.fn();
  render(
    <Theme>
      <OrderStatusSelector onChange={onChange} />
    </Theme>
  );

  const buttonEl = screen.getByRole("combobox");
  const user = userEvent.setup();

  return {
    buttonEl,
    getOptionsEl: () => screen.findAllByRole("option"),
    userEvent: user,
    onChange,
    getLabel: (label: RegExp) => screen.findByRole("option", { name: label }),
  };
};

describe("OrderStatusSelector", () => {
  it("It Should Render Correctly", () => {
    const { buttonEl } = renderComponent();
    expect(buttonEl).toHaveTextContent(/new/i);
  });

  it("Should render correct status", async () => {
    const { buttonEl, getOptionsEl, userEvent } = renderComponent();

    await userEvent.click(buttonEl);

    const options = await getOptionsEl();
    expect(options).toHaveLength(3);
    const labels = options.map((option) => option.textContent);
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
  });

  it.each([
    { label: /processed/i, value: "processed" },
    { label: /fulfilled/i, value: "fulfilled" },
    // { label: /new/, value: "new" },
  ])(
    "Should call onChange with $value when the processed $label",
    async ({ label, value }) => {
      const { buttonEl, userEvent, onChange, getLabel } = renderComponent();

      await userEvent.click(buttonEl);

      const option = await getLabel(label);
      await userEvent.click(option);

      expect(onChange).toHaveBeenCalledWith(value);
    }
  );

  it("Should call onChange with 'new' when  new option is selected", async () => {
    const { buttonEl, userEvent, getLabel, onChange } = renderComponent();
    await userEvent.click(buttonEl);

    const processedOption = await getLabel(/processed/i);
    await userEvent.click(processedOption);

    await userEvent.click(buttonEl);

    const newOption = await getLabel(/new/i);
    await userEvent.click(newOption);

    expect(onChange).toHaveBeenCalledWith("new");
  });
});
