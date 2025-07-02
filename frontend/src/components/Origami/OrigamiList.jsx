import { useEffect, useState } from "react";
import OrigamiService from "./OrigamiService";
import { useUserSession } from "../../hooks/useUserSession";
import { useNavigate } from "react-router-dom";

export function OrigamiList() {
  const [origamis, setOrigamis] = useState([]);
  const [selectedOrigami, setSelectedOrigami] = useState(null);
  const { userSession } = useUserSession();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrigamis() {
      const origamisData = await OrigamiService.getAllOrigamis();
      setOrigamis(origamisData);
    }
    fetchOrigamis();
  }, []);

  async function handleDelete() {
    const deleteCount = await OrigamiService.deleteOrigamiById(
      selectedOrigami._id,
      userSession.token
    );
    console.log(deleteCount);
    const origamisData = await OrigamiService.getAllOrigamis();
    setOrigamis(origamisData);
    console.log(origamisData);
  }

  async function handleCreate() {
    navigate("/origamis/create");
  }

  async function handleUpdate() {
    navigate(`/origamis/${selectedOrigami._id}/update`);
  }

  async function handleDetails() {
    navigate(`/origamis/${selectedOrigami._id}`);
  }

  function handleSelectOrigami(origami) {
    setSelectedOrigami((prevSelectedOrigami) =>
      prevSelectedOrigami?._id === origami._id ? null : origami
    );
  }

  return (
    <div className="overflow-auto grow flex flex-col w-full justify-between items-center">
      <p className="py-5 text-4xl text-center font-medium">Origami list</p>
      <div className="flex flex-wrap mx-auto overflow-y-scroll justify-center w-full">
        {origamis.map((item) => (
          <button
            key={item._id}
            onClick={() => handleSelectOrigami(item)}
            className={`flex flex-row items-center hover:cursor-pointer`}
          >
            <img className="w-1/3 block" src={item.imageUrl} />
            <p className="mr-2">{item.name}</p>
            <p className="mr-2">
              {item.artist.firstName + item.artist.lastName}
            </p>
            <p>{item.price}$</p>
          </button>
        ))}
      </div>

      <div className="flex flex-row justify-center">
        {userSession.role === "admin" && (
          <button
            className="px-5 py-2 text-white bg-rose-900"
            onClick={handleCreate}
          >
            Create
          </button>
        )}
        {selectedOrigami != null && (
          <button
            className={`px-5 py-2 text-white bg-blue-500`}
            onClick={handleDetails}
          >
            Read
          </button>
        )}

        {userSession.role === "admin" && selectedOrigami != null && (
          <button
            className={`px-5 py-2 text-white bg-purple-500`}
            onClick={handleUpdate}
          >
            Update
          </button>
        )}
        {userSession.role === "admin" && selectedOrigami != null && (
          <button
            className={`px-5 py-2 text-white bg-red-500`}
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
