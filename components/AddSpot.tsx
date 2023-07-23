import { useEffect, useState } from "react";
import { CombinedState } from "@/src/interfaces/store";
import { useForm } from "react-hook-form";
import { SearchAddress } from "@/UI/SearchAddress";
import { SpotAddress } from "@/src/interfaces/spotAddress";
import { insertSpot } from "@/store/reducers/spot";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

export interface IAddSpotFormData {
  name: string;
  category: string;
  location: SpotAddress;
  phone: string;
  note: string | null;
  everyone: boolean;
  logged_users: boolean;
  admin: boolean;
}

const AddSpot = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [submitting, setSubmitting] = useState(false);

  const [data, setData] = useState({
    name: "",
    category: "",
    location: {},
    phone: "",
    note: "",
    everyone: false,
    logged_users: false,
    admin: false,
  });

  let categories = useSelector(
    (state: CombinedState) => state.filters.categories.availableCategories
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IAddSpotFormData>({
    defaultValues: {
      note: null,
      everyone: false,
      logged_users: false,
      admin: false,
      location: {
        street_number: "0",
      },
    },
  });

  const handleCreate = async (newSpotData: IAddSpotFormData) => {
    dispatch(insertSpot(newSpotData));
  };

  const onSubmit = (data: IAddSpotFormData) => {
    setSubmitting(false);
    handleCreate(data);
  };

  useEffect(() => {
    register("location", { required: true });
  }, [register]);

  return (
    <div className="inviteTab flex flex-col w-640 m-auto mt-5">
      <span className="text-2xl font-bold">Add a new spot</span>
      <span className="text-sm">
        Insert all the information needed to add a new place.
      </span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="loginForm flex flex-col my-10 bg-mywhite"
      >
        <div className="nameField flex flex-col">
          <label className="text-base font-medium">Name</label>
          <input
            className="h-50 px-3.5 rounded-xl bg-mywhite border border-mygrey"
            {...register("name", { required: true })}
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
            {...register("phone", { required: true })}
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
            {...register("category", { required: true })}
            onChange={(e: any) =>
              setData({
                ...data,
                category: e.target.value,
              })
            }
            value={data.category}
          >
            <option defaultValue={""}>Select a category</option>
            {categories.map((category, key) => {
              return (
                <option key={key} value={category.category_key}>
                  {category.category_name}
                </option>
              );
            })}
          </select>
        </div>
        <span className="location text-base font-bold mt-10 mb-5">
          Location
        </span>
        <div className="addressField">
          <SearchAddress
            onSelectAddress={(spotAddress) => {
              setValue("location", spotAddress);
            }}
            defaultValue=""
          />
        </div>
        <span className="accessibility text-base font-bold mt-10">
          Accessibility
        </span>
        <span className="text-sm">
          Select the people who will be able to see this new place.
        </span>
        <div className="rightsField mt-7">
          <div className="everyoneCheck flex items-center mb-4">
            <input
              id="everyone-checkbox"
              type="checkbox"
              className="w-4 h-4 text-mygreen rounded focus:ring-0 focus:shadow-none ring-offset-0"
              {...register("everyone", { required: false })}
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
              {...register("logged_users", { required: false })}
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
              {...register("admin", { required: false })}
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
          <textarea
            className="flex h-150 px-3.5 rounded-xl bg-mywhite border border-mygrey mt-5"
            {...register("note", { required: false })}
            onChange={(e: any) =>
              setData({
                ...data,
                note: e.target.value,
              })
            }
            value={data.note}
            placeholder="Add a note..."
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="addSpotBtn w-320 h-55 rounded-3xl bg-mygreen px-2 py-3.5 gap-1.5 mt-10"
          >
            <span className="font-bold text-mywhite">Add this spot</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSpot;
