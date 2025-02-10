import { useState, useEffect } from "react";
import UserService from "./UserService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const userData = await UserService.getUserById(userId);
      console.log(userData);
      setUser(userData);
    }
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center">
      <p className="text-3xl uppercase text-center mb-5">{user?.userName}</p>
      <p className="text-xl text-center mb-10">{user?.firstName}</p>
      <p className="text-xl text-center mb-10">{user?.lastName}</p>
      <p className="text-xl text-center mb-10">{user?.email}</p>

      <div className="flex flex-row justify-center items-center">
        <div className="text-left">
          <div className="flex">
            {user?.role == "admin" ? (
              <p className="text-xl bg-blue-500 rounded-3xl w-fit px-5 uppercase font-bold mr-5">
                Admin
              </p>
            ) : (
              <p className="text-xl bg-yellow-500 rounded-3xl w-fit px-5 uppercase font-bold mr-5">
                User
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
