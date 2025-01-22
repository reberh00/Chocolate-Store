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
    <div className="flex-col max-h-screen overflow-hidden space-y-5">
      {/* <div className="flex flex-row justify-center space-x-10 w-full">
        <button
          className={`px-5 py-2 text-white font-medium rounded-md uppercase ${selectedOrigami ? "bg-red-500" : "bg-red-300"}`}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className={`px-5 py-2 text-white font-medium rounded-md uppercase ${selectedOrigami ? "bg-orange-500" : "bg-orange-300"}`}
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          className="px-5 py-2 text-white font-medium bg-blue-500 rounded-md uppercase"
          onClick={handleCreate}
        >
          Create
        </button>
        <button
          className={`px-5 py-2 text-white font-medium rounded-md uppercase ${selectedOrigami ? "bg-yellow-500" : "bg-yellow-300"}`}
          onClick={handleDetails}
        >
          Details
        </button>
      </div> */}

      <div className="w-full max-h-[80vh] overflow-y-scroll">
        <div className="flex flex-wrap mx-auto w-[90vw] justify-center">
          {origamis.map((item) => (
            <OrigamiCard
              key={item._id}
              onSelectOrigami={() => handleSelectOrigami(item)}
              isSelected={selectedOrigami?._id === item._id}
              name={item.name}
              price={20}
              imageUrl={item.imageUrl}
              artistName={item.artist.name}
              description={item.description}
              originYear={item.originYear}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
