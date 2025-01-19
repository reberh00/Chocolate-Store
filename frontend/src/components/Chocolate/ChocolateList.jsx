import { useEffect, useState } from "react";
import { ChocolateCard } from "./ChocolateCard";
import ChocolateService from "./ChocolateService";
import { useUserSession } from "../../hooks/useUserSession";

export function ChocolateList() {
  const [chocolates, setChocolates] = useState([]);
  const [selectedChocolate, setSelectedChocolate] = useState(null);
  const { getUserSession } = useUserSession();

  useEffect(() => {
    async function fetchChocolates() {
      const chocolatesData = await ChocolateService.getAllChocolates();
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
        >
          Update
        </button>
        <button className="px-5 py-2 text-white font-medium bg-blue-500 rounded-md uppercase">
          Create
        </button>
      </div>

      <div className="w-full max-h-[90vh] overflow-y-scroll">
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
              manufacturerName={item.name + "'s company"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
