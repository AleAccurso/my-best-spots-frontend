import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "src/firebase/provider";

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
    <div className="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 mx-auto mt-10">
      <h1 className="text-center font-bold">Login</h1>
      <form onSubmit={handleLogin}>
        <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">
          Email address
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e: any) =>
            setData({
              ...data,
              email: e.target.value,
            })
          }
          value={data.email}
          required
          type="email"
          placeholder="Enter email"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2 mt-5">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-5 leading-tight focus:outline-none focus:shadow-outline"
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
