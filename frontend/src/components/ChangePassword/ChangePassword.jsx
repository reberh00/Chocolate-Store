import axios from "axios";
import { useForm } from "react-hook-form";
import { useUserSession } from "../../hooks/useUserSession";
export function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userSession,logout } = useUserSession();
  const onSubmit = async (data) => {
    
    const response = await axios.put(
      `http://localhost:5111/users/changepwd/${data.username}`,
      {
        password: data.password,
        newPassword: data.newPassword,
      },
      {
        headers: { Authorization: `Bearer ${userSession.token}` },
      },
    );
    console.log(response.data)
    if(response.data== "Successfully changed password!") logout();
  };
  return (
    <div className="max-w-96 mx-auto">
      <p className="text-3xl uppercase text-center">Change password</p>
      <form
        className="flex flex-col space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-2xl">Username</label>
          <input
            autoComplete={"on"}
            className="bg-slate-200 p-2"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-red-600">Username is required!</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-2xl">Old password</label>
          <input
            type="password"
            className="bg-slate-200 p-2"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-600">Password is required!</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-2xl">New password</label>
          <input
            type="password"
            className="bg-slate-200 p-2"
            {...register("newPassword", { required: true })}
          />
          {errors.newPassword && (
            <span className="text-red-600">New password is required!</span>
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