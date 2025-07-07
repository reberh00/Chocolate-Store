import { useEffect, useState } from "react";
import { ChocolateCard } from "./ChocolateCard";
import ChocolateService from "./ChocolateService";
import { useUserSession } from "../../hooks/useUserSession";
import { useNavigate } from "react-router-dom";

export function ChocolateList() {
  const [chocolates, setChocolates] = useState([]);
  const [selectedChocolate, setSelectedChocolate] = useState(null);
  const { getUserSession } = useUserSession();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChocolates() {
      let chocolatesData = await ChocolateService.getAllChocolates();
      chocolatesData = chocolatesData.sort((a, b) =>
        a.manufacturerId.firmName > b.manufacturerId.firmName
          ? 1
          : b.manufacturerId.firmName > a.manufacturerId.firmName
            ? -1
            : 0,
      );

      setChocolates(chocolatesData);
    }
    fetchChocolates();
  }, []);

  async function handleDelete() {
    const deleteCount = await ChocolateService.deleteChocolateById(
      selectedChocolate._id,
      getUserSession(),
    );
    console.log(deleteCount);
    const chocolatesData = await ChocolateService.getAllChocolates();
    setChocolates(chocolatesData);
    console.log(chocolatesData);
  }

  async function handleCreate() {
    navigate("/chocolates/create");
  }

  async function handleUpdate() {
    navigate(`/chocolates/${selectedChocolate._id}/update`);
  }

  async function handleDetails() {
    navigate(`/chocolates/${selectedChocolate._id}`);
  }

  function handleSelectChocolate(chocolate) {
    setSelectedChocolate((prevSelectedChocolate) =>
      prevSelectedChocolate?._id === chocolate._id ? null : chocolate,
    );
  }

  return (
    <div className="flex-col max-h-screen overflow-hidden space-y-5">
      <p className="text-3xl uppercase text-center">Chocolate list</p>

      <div className="flex flex-row justify-center space-x-10 w-full">
        <button
          className={`px-5 py-2 text-white font-medium rounded-md uppercase ${selectedChocolate ? "bg-red-500" : "bg-red-300"}`}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className={`px-5 py-2 text-white font-medium rounded-md uppercase ${selectedChocolate ? "bg-orange-500" : "bg-orange-300"}`}
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
          className={`px-5 py-2 text-white font-medium rounded-md uppercase ${selectedChocolate ? "bg-yellow-500" : "bg-yellow-300"}`}
          onClick={handleDetails}
        >
          Details
        </button>
      </div>

      <div className="w-full max-h-[80vh] overflow-y-scroll">
        <div className="flex flex-wrap mx-auto w-[90vw] justify-center">
          {chocolates.map((item, index) => (
            <ChocolateCard
              key={item._id}
              onSelectChocolate={() => handleSelectChocolate(item)}
              isSelected={selectedChocolate?._id === item._id}
              id={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              manufacturerName={item.manufacturerId.firmName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
