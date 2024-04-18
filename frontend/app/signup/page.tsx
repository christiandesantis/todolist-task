"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_HOST || 'http://localhost'}:${process.env.NEXT_PUBLIC_SERVER_PORT || '3000'}`;

type FormInputs = {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

export default function SignupPage() {

  const data = useRef<FormInputs>({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        name: data.current.name,
        lastname: data.current.lastname,
        username: data.current.username,
        email: data.current.email,
        pswd: data.current.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    // const response = await res.json();
    // console.log({ response });
    alert("Registered Successfully!");
    router.replace('/api/auth/signin');
  };
  return (
    <div className="m-2 rounded overflow-hidden max-w-96 ml-auto mr-auto">
      <div className="p-2 text-center text-2xl font-semibold text-gray-700">
        Sign up
      </div>
      <form onSubmit={register} className="p-2 flex flex-col gap-6">
        <button type="submit" style={{ display: 'none' }}></button>
        <input
          className="border-2 border-gray-300 p-2 rounded-md dark:bg-gray-800"
          autoComplete="off"
          name="name"
          placeholder="Name"
          required
          onChange={(e) => (data.current.name = e.target.value)}
        />
        <input
          className="border-2 border-gray-300 p-2 rounded-md dark:bg-gray-800"
          autoComplete="off"
          name="lastname"
          placeholder="Last Name"
          required
          onChange={(e) => (data.current.lastname = e.target.value)}
        />
        <input
          className="border-2 border-gray-300 p-2 rounded-md dark:bg-gray-800"
          autoComplete="off"
          name="username"
          placeholder="Username"
          required
          onChange={(e) => (data.current.username = e.target.value)}
        />
        <input
          className="border-2 border-gray-300 p-2 rounded-md dark:bg-gray-800"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => (data.current.email = e.target.value)}
        />
        <input
          className="border-2 border-gray-300 p-2 rounded-md dark:bg-gray-800"
          name="password"
          placeholder="Password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />
        <div className="flex justify-center items-center gap-2">
          <button type="submit" className="w-20 bg-gray-500 text-white p-2 rounded-md">Submit</button>
          <Link className="" href={"/"}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};