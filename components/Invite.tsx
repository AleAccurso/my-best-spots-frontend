import { useState } from "react";

const Invite = () => {
  const [data, setData] = useState({
    email: "",
  });

  const handleInvitation = async (e: any) => {
    e.preventDefault();

    console.log("formData", data);
  };

  return (
    <div className="inviteTab flex flex-col w-550 m-auto mt-5">
      <span className="text-2xl font-bold">Invite somebody</span>
      <span className="text-sm">
        Enter the email address of the person you wish to invite to join the
        team.
      </span>
      <form
        onSubmit={handleInvitation}
        className="loginForm flex flex-col my-10 bg-mywhite"
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
        <div className="flex justify-center">
          <button
            type="submit"
            className="loginBtn w-320 h-[55px] rounded-3xl bg-mygreen px-2 py-3.5 gap-1.5 mt-10"
          >
            <span className="font-bold text-mywhite">Send invitation</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Invite;
