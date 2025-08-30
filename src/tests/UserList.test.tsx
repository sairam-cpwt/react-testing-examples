import { render, screen } from "@testing-library/react";
import UserList from "../components/UserList";
import { User } from "../entities";

describe("User List", () => {
  test("Should render no users when users empty", () => {
    render(<UserList users={[]} />);

    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  test("Should render list of users", () => {
    const users: User[] = [
      {
        id: 1,
        name: "John",
      },
      { id: 2, name: "Mosh" },
    ];
    render(<UserList users={users} />);

    users.forEach((user) => {
      const link = screen.getByRole("link", {
        name: user.name,
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
