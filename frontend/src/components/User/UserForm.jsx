import { useForm } from "react-hook-form";
import UserService from "./UserService";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useUserSession } from "../../hooks/useUserSession";
import { useNavigate } from "react-router-dom";

export function UserForm() {
  const { userId } = useParams();
  const { getUserSession } = useUserSession();
  const [manufacturers, setManufacturers] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: async () => await fetchUser() });
  const onSubmit = async (data) => {
    console.log(data);
    const updatedUser = await UserService.updateUserById(
      userId,
      {
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
      },
      getUserSession(),
    );
    console.log(updatedUser);
    navigate(`/users/${userId}`);
  };

  async function fetchUser() {
    const user = await UserService.getUserById(userId);

    return user;
  }

  return (
    <div className="max-w-96 mx-auto">
      <p className="text-3xl uppercase text-center">User form</p>

      <form
        className="flex flex-col space-y-5 max-h-[90vh] overflow-y-scroll"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-2xl">Username</label>
          <input
            className="bg-slate-200 p-2"
            {...register("userName", { required: true })}
          />
          {errors.userName && (
            <span className="text-red-600">Username is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">First name</label>
          <textarea
            className="bg-slate-200 p-2"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="text-red-600">First name is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Last name</label>
          <textarea
            className="bg-slate-200 p-2"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="text-red-600">Last name is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Email name</label>
          <textarea
            className="bg-slate-200 p-2"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-600">Email name is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Role</label>

          <select {...register("role", { required: true })}>
            <option value={"admin"}>Admin</option>
            <option value={"user"}>User</option>
          </select>

          {errors.role && (
            <span className="text-red-600">Role is required!</span>
          )}
        </div>

        <input
          className="bg-blue-500 p-2 font-medium text-white upercase"
          type="submit"
        />
      </form>
    </div>
  );
}
