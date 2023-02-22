import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "@/firebase/provider";
import SiteIcon from "@/icons/site-icon.svg";
import EyeIcon from "@/icons/eye.svg";
import EyeOffIcon from "@/icons/eye-off.svg";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const { user, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
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

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="loginContainer flex flex-col w-480 h-[555px] rounded-3xl m-auto">
      <SiteIcon className="mt-16" />
      <span className="mt-9 text-3xl font-bold">Welcome</span>
      <form
        onSubmit={handleLogin}
        className="loginForm flex flex-col mt-10 bg-mywhite"
      >
        <div className="emailField flex flex-col">
          <label className="text-base font-medium">Email address</label>
          <input
            className="emailField h-50 px-3.5 rounded-xl bg-mywhite border border-mygrey"
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
        </div>
        <div className="passwordField relative flex flex-col mt-5">
          <label className="text-base font-medium">Password</label>
          <input
            className="passwordField h-50 px-3.5 rounded-xl bg-mywhite border border-mygrey z-0"
            onChange={(e: any) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
            value={data.password}
            required
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          {!showPassword ? (
            <EyeIcon
              className="absolute z-20 right-2 top-8"
              onClick={handleShowPassword}
            />
          ) : (
            <EyeOffIcon
              className="absolute z-20 right-2 top-8"
              onClick={handleShowPassword}
            />
          )}
        </div>
        <Link href="/forgot-password" className="my-5">
          <span className="text-base font-medium underline">
            Forgot password ?
          </span>
        </Link>
        <div className="flex justify-center">
          <button
            type="submit"
            className="loginBtn w-320 h-[55px] rounded-3xl bg-mygreen px-2 py-3.5 gap-1.5"
          >
            <span className="font-bold text-mywhite">Log in</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
