import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import { useSession } from "next-auth/react";

export default function AppBar() {
  const { data: session} = useSession();

  return (
    <header className="fixed top-0 w-full z-10 flex gap-4 p-4 shadow">
      <Link className="transition-colors hover:text-blue-500" href={"/"}>
        Home
      </Link>
      {
        session && session.user ? (
          <Link
            className="transition-colors hover:text-blue-500"
            href={"/profile"}
          >
            Profile
          </Link>
        ) : (
          <></>
        )
      }
      <SignInButton />
    </header>
  );
};
