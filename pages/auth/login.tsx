import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "@/firebase/provider";
import SiteIcon from "@/icons/site-icon.svg";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const { user, login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();

    console.log(user);

    try {
      await login(data.email, data.password);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="loginContainer flex flex-col w-480 h-555 rounded-3xl m-auto">
      <SiteIcon className="mt-16" />
      <span className="mt-9 text-3xl font-bold">Welcome</span>
      <form
        onSubmit={handleLogin}
        className="loginForm flex flex-col mt-10 bg-white"
      >
        <label className="text-base font-medium">Email address</label>
        <input
          className="emailField h-50 px-3.5 rounded-xl bg-white border border-grey"
          onChange={(e: any) =>
            setData({
              ...data,
              email: e.target.value,
            })
          }
          value={data.email}
          required
          type="email"
          placeholder="Email"
        />
        <label className="text-base font-medium mt-5">Password</label>
        <input
          className="passwordField h-50 px-3.5 rounded-xl bg-white border border-grey"
          onChange={(e: any) =>
            setData({
              ...data,
              password: e.target.value,
            })
          }
          value={data.password}
          required
          type="password"
          placeholder="Password"
        />
        <Link href="/forgot-password" className="my-5">
          <span className="text-base font-medium underline">
            Forgot password ?
          </span>
        </Link>
        <div className="flex justify-center">
          <button
            type="submit"
            className="loginBtn w-320 h-55 rounded-3xl bg-green px-2 py-3.5 gap-1.5"
          >
            <span className="font-bold text-white">Log in</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
