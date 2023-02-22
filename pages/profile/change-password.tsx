import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "@/firebase/provider";
import EyeIcon from "@/icons/eye.svg";
import EyeOffIcon from "@/icons/eye-off.svg";

const ForgotPassword = () => {
  const router = useRouter();
  const { user, login } = useAuth();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
    <div className="forgotPassword flex flex-col w-480 h-[555px] rounded-3xl m-auto">
      <span className="mt-16 text-3xl font-bold">Set a new password</span>
      <span className="my-10">
        Please remember to choose a unique combination of letters, numbers and
        symbols.
      </span>
      <form
        onSubmit={handleChangePassword}
        className="loginForm flex flex-col bg-mywhite"
      >
        <div className="currentPasswordField relative flex flex-col">
          <label className="text-base font-medium">Current password</label>
          <input
            className="h-50 px-3.5 rounded-xl bg-mywhite border border-mygrey"
            onChange={(e: any) =>
              setData({
                ...data,
                currentPassword: e.target.value,
              })
            }
            value={data.currentPassword}
            required
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Current Password"
          />
          {!showCurrentPassword ? (
            <EyeIcon
              className="absolute z-20 right-2 top-8"
              onClick={handleShowCurrentPassword}
            />
          ) : (
            <EyeOffIcon
              className="absolute z-20 right-2 top-8"
              onClick={handleShowCurrentPassword}
            />
          )}
        </div>
        <div className="newPasswordField relative flex flex-col mt-5">
          <label className="text-base font-medium">New password</label>
          <input
            className="passwordField h-50 px-3.5 rounded-xl bg-mywhite border border-mygrey"
            onChange={(e: any) =>
              setData({
                ...data,
                newPassword: e.target.value,
              })
            }
            value={data.newPassword}
            required
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
          />
          {!showNewPassword ? (
            <EyeIcon
              className="absolute z-20 right-2 top-8"
              onClick={handleShowNewPassword}
            />
          ) : (
            <EyeOffIcon
              className="absolute z-20 right-2 top-8"
              onClick={handleShowNewPassword}
            />
          )}
        </div>
        <div className="confirmPasswordField relative flex flex-col mt-5">
          <label className="text-base font-medium">Confirm password</label>
          <input
            className="passwordField h-50 px-3.5 rounded-xl bg-mywhite border border-mygrey"
            onChange={(e: any) =>
              setData({
                ...data,
                confirmPassword: e.target.value,
              })
            }
            value={data.confirmPassword}
            required
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
          />
          {!showConfirmPassword ? (
            <EyeIcon
              className="absolute z-20 right-2 top-8"
              onClick={handleShowConfirmPassword}
            />
          ) : (
            <EyeOffIcon
              className="absolute z-20 right-2 top-8"
              onClick={handleShowConfirmPassword}
            />
          )}
        </div>
        <div className="flex justify-center my-10">
          <button
            type="submit"
            className="loginBtn w-320 h-[55px] rounded-3xl bg-mygreen px-2 py-3.5 gap-1.5"
          >
            <span className="font-bold text-mywhite">Change password</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
