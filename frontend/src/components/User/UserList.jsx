import { useEffect, useState } from "react";
import { UserCard } from "./UserCard";
import UserService from "./UserService";
import { useNavigate } from "react-router-dom";
import { useUserSession } from "../../hooks/useUserSession";

export function UserList() {
  const [users, setUsers] = useState([]);
  const { getUserSession } = useUserSession();
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      let usersData = await UserService.getAllUsers(getUserSession());

      setUsers(usersData);
    }
    fetchUsers();
  }, []);

  function handleSelectUser(user) {
    setSelectedUser((prevSelectedUser) =>
      prevSelectedUser?._id === user._id ? null : user,
    );
  }

  return (
    <div className="flex-col max-h-screen overflow-hidden space-y-5">
      <p className="text-3xl uppercase text-center">User list</p>
      {users.length==0 && <p className="text-3xl uppercase text-center">No users here.</p>}

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
