import { useState } from "react";
import { Textarea } from "@material-tailwind/react";
import { allowedCategories } from "src/categories";
import titleCase from "@/helpers/titleCase";

const AddSpot = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    address: "",
    phone: "",
    latitude: 0,
    longitude: 0,
    note: "",
    everyone: false,
    logged_users: false,
    admin: false,
  });

  const handleInvitation = async (e: any) => {
    e.preventDefault();

    console.log("formData", data);
  };

  return (
    <div className="inviteTab flex flex-col w-640 m-auto mt-5">
      <span className="text-2xl font-bold">Add a new spot</span>
      <span className="text-sm">
        Insert all the information needed to add a new place.
      </span>
      <form
        onSubmit={handleInvitation}
        className="loginForm flex flex-col my-10 bg-mywhite"
      >
        <div className="nameField flex flex-col">
          <label className="text-base font-medium">Name</label>
          <input
            className="h-50 px-3.5 rounded-xl bg-mywhite border border-mygrey"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({
                ...data,
                name: e.target.value,
              })
            }
            value={data.name}
            required
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="phoneField flex flex-col mt-5">
          <label className="text-base font-medium">Phone number</label>
          <input
            className="h-50 px-3.5 rounded-xl bg-mywhite border border-mygrey"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({
                ...data,
                phone: e.target.value,
              })
            }
            value={data.phone}
            type="tel"
            placeholder="Phone number"
          />
        </div>
        <div className="categoryField mt-5">
          <label
            htmlFor="categories"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <select
            id="categories"
            className="text-sm rounded-lg block w-full p-3"
            onChange={(e: any) =>
              setData({
                ...data,
                category: e.target.value,
              })
            }
            value={data.category}
          >
            <option defaultValue={""}>Select a category</option>
            {allowedCategories.map((category, key) => {
              return (
                <option key={key} value={category}>
                  {titleCase(category.replace("-", " "))}
                </option>
              );
            })}
          </select>
        </div>
        <span className="location text-base font-bold mt-10">Location</span>
        <div className="addressField flex flex-col mt-5">
          <label className="text-base font-medium">Full address</label>
          <input
            className="w-280 h-50 px-3.5 rounded-xl bg-mywhite border border-mygrey"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setData({
                ...data,
                address: e.target.value,
              })
            }
            value={data.address}
            type="text"
            placeholder="Street + Number + Postal Code + City + Country"
          />
        </div>
        <div className="flex justify-between mt-5">
          <div className="latitudeField flex flex-col w-300">
            <label className="text-base font-medium">Latitude</label>
            <input
              className="h-50 px-3.5 rounded-xl bg-mywhite border border-mygrey"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({
                  ...data,
                  latitude: Number(e.target.value),
                })
              }
              value={data.latitude}
              type="number"
              step="0.0000001"
              min={-90}
              max={90}
            />
          </div>
          <div className="longitudeField flex flex-col w-300">
            <label className="text-base font-medium">Longitude</label>
            <input
              className="h-50 px-3.5 rounded-xl bg-mywhite border border-mygrey"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData({
                  ...data,
                  longitude: Number(e.target.value),
                })
              }
              value={data.longitude}
              type="number"
              step="0.0000001"
              min={0}
              max={180}
            />
          </div>
        </div>
        <span className="accessibility text-base font-bold mt-10">
          Accessibility
        </span>
        <span className="text-sm">
          Selects the people who will be able to see this new place.
        </span>
        <div className="rightsField mt-7">
          <div className="everyoneCheck flex items-center mb-4">
            <input
              id="everyone-checkbox"
              type="checkbox"
              className="w-4 h-4 text-mygreen rounded focus:ring-0 focus:shadow-none ring-offset-0"
              onClick={(e: any) =>
                setData({
                  ...data,
                  everyone: e.target.checked,
                })
              }
            />
            <label
              htmlFor="everyone-checkbox"
              className="ml-3 text-sm font-medium"
            >
              <span>Everyone</span>
            </label>
          </div>
          <div className="loggedCheck flex items-center mb-4">
            <input
              id="logged-checkbox"
              type="checkbox"
              className="w-4 h-4 text-mygreen rounded focus:ring-0 focus:shadow-none ring-offset-0"
              onClick={(e: any) =>
                setData({
                  ...data,
                  logged_users: e.target.checked,
                })
              }
            />
            <label
              htmlFor="logged-checkbox"
              className="ml-3 text-sm font-medium"
            >
              <span>Logged users</span>
            </label>
          </div>
          <div className="adminCheck flex items-center mb-4">
            <input
              id="admin-checkbox"
              type="checkbox"
              className="w-4 h-4 text-mygreen rounded focus:ring-0 focus:shadow-none ring-offset-0"
              onClick={(e: any) =>
                setData({
                  ...data,
                  admin: e.target.checked,
                })
              }
            />
            <label
              htmlFor="admin-checkbox"
              className="ml-3 text-sm font-medium"
            >
              <span>Admin</span>
            </label>
          </div>
        </div>
        <span className="accessibility text-base font-bold mt-5">
          Personal Note
        </span>
        <div className="noteField flex flex-col">
          <Textarea
            className="flex h-150 px-3.5 rounded-xl bg-mywhite border border-mygrey mt-5"
            onChange={(e: any) =>
              setData({
                ...data,
                note: e.target.value,
              })
            }
            value={data.note}
            placeholder="Add a note..."
            onResize={undefined}
            onResizeCapture={undefined}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="loginBtn w-320 h-55 rounded-3xl bg-mygreen px-2 py-3.5 gap-1.5 mt-10"
          >
            <span className="font-bold text-mywhite">Add this spot</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSpot;
