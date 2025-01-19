import axios from "axios";
import { useForm } from "react-hook-form";
import { useUserSession } from "../../hooks/useUserSession";

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUserSession } = useUserSession();
  const onSubmit = async (data) => {
    const response = await axios.post("http://localhost:5555/users/signup", {
      userName: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
    console.log(response);
    setUserSession(response.data.token);
  };

  return (
    <div className="max-w-96 mx-auto">
      <p className="text-3xl uppercase text-center">Sign up</p>

      <form
        className="flex flex-col space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-2xl">Username</label>
          <input
            autoComplete={"on"}
            className="bg-slate-200 p-2"
            {...register("userName", { required: true })}
          />
          {errors.userName && (
            <span className="text-red-600">Username is required!</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-2xl">First name</label>
          <input
            autoComplete={"on"}
            className="bg-slate-200 p-2"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="text-red-600">First name is required!</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-2xl">Last name</label>
          <input
            autoComplete={"on"}
            className="bg-slate-200 p-2"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="text-red-600">Last name is required!</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-2xl">Email</label>
          <input
            autoComplete={"on"}
            className="bg-slate-200 p-2"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-600">Email is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Password</label>
          <input
            type="password"
            className="bg-slate-200 p-2"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-600">Password is required!</span>
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
