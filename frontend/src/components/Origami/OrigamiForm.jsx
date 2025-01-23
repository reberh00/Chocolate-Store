import { useForm } from "react-hook-form";
import OrigamiService from "./OrigamiService";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useUserSession } from "../../hooks/useUserSession";
import { useNavigate } from "react-router-dom";

export function OrigamiForm() {
  const { origamiId } = useParams();
  const { getUserSession } = useUserSession();
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: async () => await fetchOrigami() });
  const onSubmit = async (data) => {
    console.log(data);
    // if (origamiId) {
    //   const updatedOrigami = await OrigamiService.updateOrigamiById(
    //     origamiId,
    //     {
    //       name: data.name,
    //       dateOfProduction: new Date(2002, 10, 14),
    //       description: data.description,
    //       price: data.price,
    //       netWeight: data.netWeight,
    //       cacaoPercentage: data.cacaoPercentage,
    //       isVegan: data.isVegan,
    //       isOrganic: data.isOrganic,
    //       imageUrl: data.imageUrl,
    //       manufacturerId: data.manufacturerId,
    //       ingredients: data.ingredients.split(","),
    //     },
    //     getUserSession(),
    //   );
    //   console.log(updatedOrigami);
    //   navigate(`/origamis/${origamiId}`);
    // } else {
    //   const createdOrigami = await OrigamiService.createOrigami(
    //     {
    //       name: data.name,
    //       dateOfProduction: new Date(2002, 10, 14),
    //       description: data.description,
    //       price: data.price,
    //       netWeight: data.netWeight,
    //       cacaoPercentage: data.cacaoPercentage,
    //       isVegan: data.isVegan,
    //       isOrganic: data.isOrganic,
    //       imageUrl: data.imageUrl,
    //       manufacturerId: data.manufacturerId,
    //       ingredients: data.ingredients.split(","),
    //     },
    //     getUserSession(),
    //   );
    //   console.log(createdOrigami);
    //   navigate(`/origamis/${createdOrigami._id}`);
    // }
  };

  async function fetchOrigami() {
    if (!origamiId) {
      return {};
    }
    const origami = await OrigamiService.getOrigamiById(origamiId);
    origami.artist = origami.artist._id;
    return origami;
  }

  useEffect(() => {
    async function fetchArtists() {
      const artists = await axios.get("http://localhost:5111/artists");
      setArtists(artists.data);
    }
    fetchArtists();
  }, []);

  return (
    <div className="h-full w-full bg-slate-100">
      <form
        className="flex flex-col justify-center space-y-5 w-3/5 overflow-hidden m-auto h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-row items-center space-x-5">
          <label className="text-2xl uppercase font-medium">Name:</label>
          <input
            className="text-xl bg-rose-100 p-2 grow border-rose-700 border-4 rounded-lg"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-600">Name is required!</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label className="text-2xl uppercase font-medium">
            Number of folds:
          </label>
          <input
            type="number"
            className="text-xl bg-rose-100 p-2 grow border-rose-700 border-4 rounded-lg"
            {...register("numberOfFolds", { required: true })}
          />
          {errors.numberOfFolds && (
            <span className="text-red-600">Number of folds is required!</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label className="text-2xl uppercase font-medium">Origin year:</label>
          <input
            type="number"
            className="text-xl bg-rose-100 p-2 grow border-rose-700 border-4 rounded-lg"
            {...register("originYear", { required: true })}
          />
          {errors.originYear && (
            <span className="text-red-600">Origin year is required!</span>
          )}
        </div>

        <div className="flex flex-row items-start space-x-5">
          <label className="text-2xl uppercase font-medium">
            Origin story:
          </label>
          <textarea
            className="text-xl bg-rose-100 p-2 grow border-rose-700 border-4 rounded-lg"
            {...register("originStory", { required: true })}
          />
          {errors.originStory && (
            <span className="text-red-600">Origin story is required!</span>
          )}
        </div>

        <div className="flex flex-row items-start space-x-5">
          <label className="text-2xl uppercase font-medium">Description:</label>
          <textarea
            className="text-xl bg-rose-100 p-2 grow border-rose-700 border-4 rounded-lg"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-600">Description is required!</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label className="text-2xl uppercase font-medium">Image url:</label>
          <input
            className="text-xl bg-rose-100 p-2 grow border-rose-700 border-4 rounded-lg"
            {...register("imageUrl", { required: true })}
          />
          {errors.imageUrl && (
            <span className="text-red-600">Image url is required!</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label className="text-2xl uppercase font-medium">Artist</label>

          <select
            className="bg-rose-100 p-2 grow border-rose-700 border-4 rounded-lg text-xl"
            {...register("artist", { required: true })}
          >
            {artists.map((item) => (
              <option key={item._id} value={item._id}>
                {item.firstName + " " + item.lastName}
              </option>
            ))}
          </select>
          {errors.artist && (
            <span className="text-red-600">Artist is required!</span>
          )}
        </div>

        <button
          className="bg-rose-950 rounded-full uppercase p-2 font-medium text-white upercase"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
