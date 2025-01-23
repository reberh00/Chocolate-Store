import axios from "axios";
import { useForm } from "react-hook-form";
import { useUserSession } from "../../hooks/useUserSession";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useUserSession();
  const onSubmit = async (data) => {
    const response = await axios.post("http://localhost:5111/users/login", {
      username: data.username,
      password: data.password,
    });
    console.log(response);
    login({
      token: response.data.token,
      username: response.data.username,
      firstName: response.data.firstName,
      role: response.data.role,
    });
  };

  return (
    <div className="h-full w-full bg-slate-100">
      <form
        className="flex flex-col justify-center space-y-5 w-2/5 overflow-hidden m-auto h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-row items-center space-x-5">
          <label className="text-2xl uppercase font-medium">Username:</label>
          <input
            className="text-xl bg-rose-100 p-2 grow border-rose-700 border-4 rounded-lg"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-red-600">Username is required!</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label className="text-2xl uppercase font-medium">Password:</label>
          <input
            type="password"
            className="text-xl bg-rose-100 p-2 grow border-rose-700 border-4 rounded-lg"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-600">Password of folds is required!</span>
          )}
        </div>

        <button
          className="bg-rose-950 rounded-full uppercase p-2 font-medium text-white upercase w-full"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
