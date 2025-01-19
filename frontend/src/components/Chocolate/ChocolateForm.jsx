import { useForm } from "react-hook-form";
import ChocolateService from "./ChocolateService";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useUserSession } from "../../hooks/useUserSession";
import { useNavigate } from "react-router-dom";

export function ChocolateForm() {
  const { chocolateId } = useParams();
  const { getUserSession } = useUserSession();
  const [manufacturers, setManufacturers] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: async () => await fetchChocolate() });
  const onSubmit = async (data) => {
    if (chocolateId) {
      const updatedChocolate = await ChocolateService.updateChocolateById(
        chocolateId,
        {
          name: data.name,
          dateOfProduction: new Date(2002, 10, 14),
          description: data.description,
          price: data.price,
          netWeight: data.netWeight,
          cacaoPercentage: data.cacaoPercentage,
          isVegan: data.isVegan,
          isOrganic: data.isOrganic,
          imageUrl: data.imageUrl,
          manufacturerId: data.manufacturerId,
          ingredients: data.ingredients.split(","),
        },
        getUserSession(),
      );
      console.log(updatedChocolate);
      navigate(`/chocolates/${chocolateId}`);
    } else {
      const createdChocolate = await ChocolateService.createChocolate(
        {
          name: data.name,
          dateOfProduction: new Date(2002, 10, 14),
          description: data.description,
          price: data.price,
          netWeight: data.netWeight,
          cacaoPercentage: data.cacaoPercentage,
          isVegan: data.isVegan,
          isOrganic: data.isOrganic,
          imageUrl: data.imageUrl,
          manufacturerId: data.manufacturerId,
          ingredients: data.ingredients.split(","),
        },
        getUserSession(),
      );
      console.log(createdChocolate);
      navigate(`/chocolates/${createdChocolate._id}`);
    }
  };

  async function fetchChocolate() {
    if (!chocolateId) {
      return {};
    }
    const chocolate = await ChocolateService.getChocolateById(chocolateId);
    chocolate.ingredients = chocolate.ingredients.join(",");
    return chocolate;
  }

  useEffect(() => {
    async function fetchManufacturers() {
      const manufacturers = await axios.get(
        "http://localhost:5555/manufacturers",
      );
      console.log(manufacturers.data);
      setManufacturers(manufacturers.data);
    }
    fetchManufacturers();
  }, []);

  async function handleReturn() {
    navigate("/chocolates");
  }

  return (
    <div className="max-w-96 mx-auto">
      <button
        className={`px-5 py-2 fixed top-3 left-3 text-white font-medium rounded-md uppercase bg-amber-500`}
        onClick={handleReturn}
      >
        Return
      </button>
      <p className="text-3xl uppercase text-center">Chocolate form</p>

      <form
        className="flex flex-col space-y-5 max-h-[90vh] overflow-y-scroll"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="text-2xl">Name</label>
          <input
            className="bg-slate-200 p-2"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-600">Name is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Description</label>
          <textarea
            className="bg-slate-200 p-2"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-600">Description is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Price</label>
          <input
            type="number"
            className="bg-slate-200 p-2"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <span className="text-red-600">Price is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Net weight</label>
          <input
            type="number"
            className="bg-slate-200 p-2"
            {...register("netWeight", { required: true })}
          />
          {errors.netWeight && (
            <span className="text-red-600">Net weight is required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Cacao percentage</label>
          <input
            type="number"
            className="bg-slate-200 p-2"
            {...register("cacaoPercentage", { required: true })}
          />
          {errors.cacaoPercentage && (
            <span className="text-red-600">Cacao percentage is required!</span>
          )}
        </div>

        <div className="flex flex-row justify-between">
          <label className="text-2xl">Is vegan</label>
          <input
            type="checkbox"
            className="bg-slate-200 p-2"
            {...register("isVegan")}
          />
        </div>

        <div className="flex flex-row justify-between">
          <label className="text-2xl">Is organic</label>
          <input
            type="checkbox"
            className="bg-slate-200 p-2"
            {...register("isOrganic")}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Ingredients (comma seperated)</label>
          <textarea
            className="bg-slate-200 p-2"
            {...register("ingredients", { required: true })}
          />
          {errors.ingredients && (
            <span className="text-red-600">Ingredients are required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Image url</label>
          <input
            className="bg-slate-200 p-2"
            {...register("imageUrl", { required: true })}
          />
          {errors.imageUrl && (
            <span className="text-red-600">Image url are required!</span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-2xl">Manufacturer</label>

          <select {...register("manufacturerId", { required: true })}>
            {manufacturers.map((item) => (
              <option key={item._id} value={item._id}>
                {item.firmName}
              </option>
            ))}
          </select>

          {errors.manufacturerId && (
            <span className="text-red-600">Manufacturer is required!</span>
          )}
        </div>

        <input
          className="bg-blue-500 p-2 font-medium text-white upercase"
          type="submit"
        />
      </form>
    </div>
  );
}
