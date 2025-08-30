import { render, screen } from "@testing-library/react";
import UserAccount from "../components/UserAccount";

describe("User Account", () => {
  const user = {
    id: 1,
    name: "Mosh",
    isAdmin: false,
  };

  it("Render user name", () => {
    render(<UserAccount user={user} />);

    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it("Render edit button", () => {
    render(<UserAccount user={{ ...user, isAdmin: true }} />);
    const buttonEl = screen.getByRole("button", { name: "Edit" });
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveTextContent(/Edit/);
  });

  it("Should't render edit if user not admin", () => {
    render(<UserAccount user={{ ...user, isAdmin: false }} />);
    const buttonEl = screen.queryByRole("button", { name: "Edit" });
    expect(buttonEl).not.toBeInTheDocument();
  });
});
