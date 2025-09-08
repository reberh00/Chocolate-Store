import { useForm } from "react-hook-form";
import ArtistService from "./ArtistService";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useUserSession } from "../../hooks/useUserSession";
import { useNavigate } from "react-router-dom";

export function ArtistForm() {
  const { artistId } = useParams();
  const { getUserSession } = useUserSession();
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: async () => await fetchArtist() });
  const { userSession } = useUserSession();
  const onSubmit = async (data) => {
    console.log(data);
    if (artistId) {
      const updatedArtist = await ArtistService.updateArtistById(
        artistId,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          country: data.country,
          city: data.city,
          biography: data.biography,
          netWorth: data.netWorth,
          imageUrl: data.imageUrl,
        },
        userSession.token
      );
      console.log(updatedArtist);
      navigate(`/artists/${artistId}`);
    } else {
      const createdArtist = await ArtistService.createArtist(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          country: data.country,
          city: data.city,
          biography: data.biography,
          netWorth: data.netWorth,
          imageUrl: data.imageUrl,
        },
        userSession.token
      );
      console.log(createdArtist);
      navigate(`/artists/${createdArtist._id}`);
    }
  };

  async function fetchArtist() {
    if (!artistId) {
      return {};
    }
    const artist = await ArtistService.getArtistById(artistId);
    return artist;
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
        <div className="flex flex-row items-center space-x-5">
          <label>First name:</label>
          <input
            className="border-rose-700 bg-rose-100"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="text-red-600">First name is required!</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label>Last name:</label>
          <input
            className="border-rose-700 bg-rose-100"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="text-red-600">Last name is required!</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label>Country:</label>
          <input
            className="border-rose-700 bg-rose-100"
            {...register("country", { required: true })}
          />
          {errors.country && (
            <span className="text-red-600">Country is required!</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label>City:</label>
          <input
            className="border-rose-700 bg-rose-100"
            {...register("city", { required: true })}
          />
          {errors.city && (
            <span className="text-red-600">City is required!</span>
          )}
        </div>

        <div className="flex flex-row items-center space-x-5">
          <label>Net worth:</label>
          <input
            className="border-rose-700 bg-rose-100"
            {...register("netWorth", { required: true })}
          />
          {errors.city && (
            <span className="text-red-600">Net worth is required!</span>
          )}
        </div>

        <div className="flex flex-row items-start space-x-5">
          <label>Biography:</label>
          <textarea
            className="border-rose-700 bg-rose-100"
            {...register("biography", { required: true })}
          />
          {errors.biography && (
            <span className="text-red-600">Biography is required!</span>
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

        <button
          className="bg-rose-950 uppercase p-2 text-white upercase"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
