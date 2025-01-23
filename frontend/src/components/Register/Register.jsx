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
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
    console.log(response);
    setUserSession(response.data.token);
  };

  return <></>;
}
