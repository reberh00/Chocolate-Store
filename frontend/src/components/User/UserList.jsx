import { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import UserService from "./UserService";
import { useNavigate } from "react-router-dom";

export function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      let usersData = await UserService.getAllUsers();

      setUsers(usersData);
    }
    fetchUsers();
  }, []);

  async function handleUpdate() {
    navigate(`/users/${selectedUser._id}/update`);
  }

  async function handleDetails() {
    navigate(`/users/${selectedUser._id}`);
  }

  function handleSelectUser(user) {
    setSelectedUser((prevSelectedUser) =>
      prevSelectedUser?._id === user._id ? null : user,
    );
  }

  return (
    <div className="flex-col max-h-screen overflow-hidden space-y-5">
      <p className="text-3xl uppercase text-center">User list</p>

      <div className="flex flex-row justify-center space-x-10 w-full">
        <button
          className={`px-5 py-2 text-white font-medium rounded-md uppercase ${selectedUser ? "bg-orange-500" : "bg-orange-300"}`}
          onClick={handleUpdate}
        >
          Update
        </button>

        <button
          className={`px-5 py-2 text-white font-medium rounded-md uppercase ${selectedUser ? "bg-yellow-500" : "bg-yellow-300"}`}
          onClick={handleDetails}
        >
          Details
        </button>
      </div>

      <div className="w-full max-h-[80vh] overflow-y-scroll">
        <div className="flex flex-wrap mx-auto w-[90vw] justify-center">
          {users.map((item) => (
            <UserCard
              key={item._id}
              onSelectUser={() => handleSelectUser(item)}
              isSelected={selectedUser?._id === item._id}
              id={item.id}
              userName={item.userName}
              email={item.email}
              role={item.role}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
