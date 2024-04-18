import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function SignInButton() {
  const { data: session } = useSession();

  return (
    <div className="flex gap-4 ml-auto items-center">
      {
        session && session.user ? (
          <>
            <Link
              href={"/profile"}
              className="text-sky-600"
            >
              {session.user.name}
            </Link>
            <Link
              href={"/api/auth/signout"}
              className="flex gap-4 ml-auto text-red-600"
            >
              Sign Out
            </Link>
          </>
        ) : (
          <>
            <Link
              href={"/api/auth/signin"}
              className="flex gap-4 ml-auto text-green-500"
            >
              Sign In
            </Link>
            <Link
              href={"/signup"}
              className="flex gap-4 ml-auto bg-green-600 text-green-200 p-2 rounded"
            >
              Sign Up
            </Link>
          </>
        )
      }
    </div>
  );
};