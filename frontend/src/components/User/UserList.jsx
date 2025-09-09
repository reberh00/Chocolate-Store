import axios from "axios";
import { useEffect, useState } from "react";
import { useUserSession } from "../../hooks/useUserSession";

export function UserList() {
  const [users, setUsers] = useState([]);
  const { userSession } = useUserSession();

  useEffect(() => {
    async function fetchUsers() {
      const usersData = await axios.get("http://localhost:5111/users", {
        headers: { Authorization: `Bearer ${userSession.token}` },
      });
      setUsers(usersData.data);
      console.log(usersData.data);
    }
    fetchUsers();
  }, []);

  return (
    <div className="overflow-auto grow flex flex-col w-full justify-between items-center">
      <div className="flex flex-wrap mx-auto overflow-y-scroll justify-center w-full">
        {users?.map((user) => (
          <button
            key={user._id}
            className={`w-full flex flex-row items-center `}
          >
            <p className="mr-2">{user.username}</p>
            <p className="mr-2">{user.firstName + user.lastName}</p>
            <p>{user.email}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
