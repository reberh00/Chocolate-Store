import { useEffect, useState } from "react";
import ManufacturerService from "./ManufacturerService";
import { useUserSession } from "../../hooks/useUserSession";
import { ManufacturerCard } from "./ManufacturerCard";

export function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const { getUserSession } = useUserSession();

  useEffect(() => {
    async function fetchManufacturers() {
      const manufacturersData = await ManufacturerService.getAllManufacturers();
      setManufacturers(manufacturersData);
      console.log(manufacturersData);
    }
    fetchManufacturers();
  }, []);

  async function handleDelete() {
    const deleteCount = await ManufacturerService.deleteManufacturerById(
      selectedManufacturer._id,
      getUserSession(),
    );
    console.log(deleteCount);
    const manufacturersData = await ManufacturerService.getAllManufacturers();
    setManufacturers(manufacturersData);
    console.log(manufacturersData);
  }

  function handleSelectManufacturer(manufacturer) {
    setSelectedManufacturer((prevSelectedManufacturer) =>
      prevSelectedManufacturer?._id === manufacturer._id ? null : manufacturer,
    );
  }

  return (
    <div className="flex-col max-h-screen overflow-hidden space-y-5">
      <p className="text-3xl uppercase text-center">Manufacturer list</p>

      <div className="flex flex-row justify-center space-x-10 w-full">
        <button
          className={`px-5 py-2 text-white font-medium rounded-md uppercase ${setSelectedManufacturer ? "bg-red-500" : "bg-red-300"}`}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className={`px-5 py-2 text-white font-medium rounded-md uppercase ${setSelectedManufacturer ? "bg-orange-500" : "bg-orange-300"}`}
        >
          Update
        </button>
        <button className="px-5 py-2 text-white font-medium bg-blue-500 rounded-md uppercase">
          Create
        </button>
      </div>

      <div className="w-full max-h-[80vh] overflow-y-scroll">
        <div className="flex flex-wrap mx-auto w-[90vw] justify-center">
          {manufacturers.map((manufacturer) => (
            <ManufacturerCard
              key={manufacturer._id}
              onSelectManufacturer={() =>
                handleSelectManufacturer(manufacturer)
              }
              imageUrl={manufacturer.imageUrl}
              isSelected={selectedManufacturer?._id === manufacturer._id}
              firmName={manufacturer.firmName}
              netWorth={manufacturer.netWorth}
              firmAddress={manufacturer.firmAddress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
