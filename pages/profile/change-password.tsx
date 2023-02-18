import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "@/firebase/provider";

const ForgotPassword = () => {
  const router = useRouter();
  const { user, login } = useAuth();
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = async (e: any) => {
    e.preventDefault();

    console.log(user);

    try {
      // await login(data.email, data.password);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="forgotPassword flex flex-col w-480 h-555 rounded-3xl m-auto">
      <span className="mt-16 text-3xl font-bold">Set a new password</span>
      <span className="my-10">
        Please remember to choose a unique combination of letters, numbers and
        symbols.
      </span>
      <form
        onSubmit={handleChangePassword}
        className="loginForm flex flex-col bg-white"
      >
        <label className="text-base font-medium">Current password</label>
        <input
          className="passwordField h-50 px-3.5 rounded-xl bg-white border border-grey"
          onChange={(e: any) =>
            setData({
              ...data,
              currentPassword: e.target.value,
            })
          }
          value={data.currentPassword}
          required
          type="password"
          placeholder="Current Password"
        />
        <label className="text-base font-medium mt-5">New password</label>
        <input
          className="passwordField h-50 px-3.5 rounded-xl bg-white border border-grey"
          onChange={(e: any) =>
            setData({
              ...data,
              newPassword: e.target.value,
            })
          }
          value={data.newPassword}
          required
          type="password"
          placeholder="New Password"
        />
        <label className="text-base font-medium mt-5">Confirm password</label>
        <input
          className="passwordField h-50 px-3.5 rounded-xl bg-white border border-grey"
          onChange={(e: any) =>
            setData({
              ...data,
              confirmPassword: e.target.value,
            })
          }
          value={data.confirmPassword}
          required
          type="password"
          placeholder="Confirm Password"
        />
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="loginBtn w-320 h-55 rounded-3xl bg-green px-2 py-3.5 gap-1.5"
          >
            <span className="font-bold text-white">Change password</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
