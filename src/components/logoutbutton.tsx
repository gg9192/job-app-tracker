'use client';
import { LinkStyledButton } from "@/components/link";

export function LogoutButton() {
  function handleLogOut() {
    console.log("Log out");
  }

  return (
    <LinkStyledButton handleClick={handleLogOut}>
      Log Out
    </LinkStyledButton>
  );
}
