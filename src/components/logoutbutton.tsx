"use client";
import { LinkStyledButton } from "@/components/link";
import { toast } from "sonner";

export function LogoutButton() {
  async function handleLogOut() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("You have been logged out!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  }

  return (
    <LinkStyledButton handleClick={handleLogOut}>Log Out</LinkStyledButton>
  );
}
