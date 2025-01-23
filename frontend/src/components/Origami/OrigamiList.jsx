import { useEffect, useState } from "react";
import { OrigamiCard } from "./OrigamiCard";
import OrigamiService from "./OrigamiService";
import { useUserSession } from "../../hooks/useUserSession";
import { useNavigate } from "react-router-dom";

export function OrigamiList() {
  const [origamis, setOrigamis] = useState([]);
  const [selectedOrigami, setSelectedOrigami] = useState(null);
  const { getUserSession } = useUserSession();
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
      getUserSession(),
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
      prevSelectedOrigami?._id === origami._id ? null : origami,
    );
  }

  return (
    <div className="grow flex flex-col w-full h-5/6 justify-between items-center bg-slate-300">
      <p className="grow py-5 text-4xl text-center font-medium text-rose-900 w-fit">
        Origamis
      </p>
      <div className="flex flex-wrap mx-auto overflow-y-scroll justify-center w-3/4">
        {origamis.map((item) => (
          <OrigamiCard
            key={item._id}
            onSelectOrigami={() => handleSelectOrigami(item)}
            isSelected={selectedOrigami?._id === item._id}
            name={item.name}
            price={200}
            imageUrl={item.imageUrl}
            artistName={item.artist.firstName + " " + item.artist.lastName}
            description={item.description}
            originYear={item.originYear}
          />
        ))}
      </div>

      <div className="flex flex-row justify-center space-x-10 rounded-full py-5 mb-2 w-5/6 bg-rose-100">
        <button
          className="px-5 py-2 text-white bg-rose-900 font-bold rounded-full uppercase"
          onClick={handleCreate}
        >
          Create
        </button>

        <button
          className={`px-5 py-2 text-white font-bold rounded-full uppercase ${selectedOrigami ? "bg-blue-500" : "bg-blue-300"}`}
          onClick={handleDetails}
        >
          Read
        </button>

        <button
          className={`px-5 py-2 text-white font-bold rounded-full uppercase ${selectedOrigami ? "bg-purple-500" : "bg-purple-300"}`}
          onClick={handleUpdate}
        >
          Update
        </button>

        <button
          className={`px-5 py-2 text-white font-bold rounded-full uppercase ${selectedOrigami ? "bg-red-500" : "bg-red-300"}`}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
