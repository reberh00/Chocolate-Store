import axios from "axios";
import { useForm } from "react-hook-form";
import { useUserSession } from "../../hooks/useUserSession";

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useUserSession();
  const onSubmit = async (data) => {
    const response = await axios.post("http://localhost:5111/users/register", {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
    if (response.data.token) {
      login({
        token: response.data.token,
        username: response.data.username,
        firstName: response.data.firstName,
        role: response.data.role,
      });
    } else {
      alert(response.data);
    }
  };

  return (
    <div className="h-full w-full ">
      <form
        className="flex flex-col justify-center space-y-5 w-2/5 overflow-hidden m-auto h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-row items-center space-x-5">
          <label>Username:</label>
          <input
            className="border-rose-700 bg-rose-100"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-red-600">Username is required!</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label>First name:</label>
          <input
            className="border-rose-700 bg-rose-100"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="text-red-600">First name is required!</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label>Last name:</label>
          <input
            className="border-rose-700 bg-rose-100"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="text-red-600">Last name is required!</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label>Email:</label>
          <input
            className="border-rose-700 bg-rose-100"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-600">Email is required!</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label>Password:</label>
          <input
            type="password"
            className="border-rose-700 bg-rose-100"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-600">Password of folds is required!</span>
          )}
        </div>

        <button
          className="bg-rose-950  uppercase p-2  text-white  w-full"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
