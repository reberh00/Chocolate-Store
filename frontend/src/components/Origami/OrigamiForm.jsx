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
  const { userSession } = useUserSession();
  const onSubmit = async (data) => {
    console.log(data);
    if (origamiId) {
      const updatedOrigami = await OrigamiService.updateOrigamiById(
        origamiId,
        {
          name: data.name,
          price: data.price,
          numberOfFolds: data.numberOfFolds,
          originYear: data.originYear,
          originStory: data.originStory,
          description: data.description,
          imageUrl: data.imageUrl,
          artist: data.artist,
        },
        userSession.token
      );
      console.log(updatedOrigami);
      navigate(`/origamis/${origamiId}`);
    } else {
      const createdOrigami = await OrigamiService.createOrigami(
        {
          name: data.name,
          price: data.price,
          numberOfFolds: data.numberOfFolds,
          originYear: data.originYear,
          originStory: data.originStory,
          description: data.description,
          imageUrl: data.imageUrl,
          artist: data.artist,
        },
        userSession.token
      );
      console.log(createdOrigami);
      navigate(`/origamis/${createdOrigami._id}`);
    }
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input
            className="border-rose-700 bg-rose-100"
            {...register("name", { required: true })}
          />
          {errors.name && <span>Name is required!</span>}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label>Number of folds:</label>
          <input
            type="number"
            className="border-rose-700 bg-rose-100"
            {...register("numberOfFolds", { required: true })}
          />
          {errors.numberOfFolds && (
            <span className="text-red-600">Number of folds is required!</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label>Price:</label>
          <input
            type="number"
            className="border-rose-700 bg-rose-100"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <span className="text-red-600">Price is required!</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label>Origin year:</label>
          <input
            type="number"
            className="border-rose-700 bg-rose-100"
            {...register("originYear", { required: true })}
          />
          {errors.originYear && (
            <span className="text-red-600">Origin year is required!</span>
          )}
        </div>

        <div className="flex flex-row items-start space-x-5">
          <label>Origin story:</label>
          <textarea
            className="border-rose-700 bg-rose-100"
            {...register("originStory", { required: true })}
          />
          {errors.originStory && (
            <span className="text-red-600">Origin story is required!</span>
          )}
        </div>

        <div className="flex flex-row items-start space-x-5">
          <label>Description:</label>
          <textarea
            className="border-rose-700 bg-rose-100"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-600">Description is required!</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label>Image url:</label>
          <input
            className="border-rose-700 bg-rose-100"
            {...register("imageUrl", { required: true })}
          />
          {errors.imageUrl && (
            <span className="text-red-600">Image url is required!</span>
          )}
        </div>

        <div className="border-rose-700 bg-rose-100">
          <label>Artist</label>

          <select
            className="border-rose-700 bg-rose-100"
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
          className="bg-rose-950  uppercase p-2 font-medium text-white upercase"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
