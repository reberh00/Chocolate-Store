import { useState, useEffect } from "react";
import ArtistService from "./ArtistService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function ArtistDetails() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    async function fetchArtist() {
      const artistData = await ArtistService.getArtistById(artistId);
      console.log(artistData);
      setArtist(artistData);
    }
    fetchArtist();
  }, []);

  return (
    <div className="flex flex-row justify-center items-center h-full w-full bg-rose-200">
      <img
        className="w-1/3 aspect-auto rounded-full block mr-10"
        src={
          "https://sugoii-japan.com/wp-content/uploads/2022/05/Takashi-Murakami-Doraemon.jpeg"
        }
      />

      <div className="text-left space-y-2">
        <p className="text-3xl font-medium text-rose-900">
          {artist?.firstName + " " + artist?.lastName}
        </p>
        <p className="text-2xl mb-10 font-medium">
          {artist?.city + ", " + artist?.country}
        </p>

        <p className="text-xl">{artist?.biography}</p>
        <p className="text-xl">{artist?.originStory}</p>

        <div className="flex mt-5">
          <p className="text-xl font-medium uppercase mr-2">Net worth:</p>
          <p className="text-xl">{artist?.netWorth}$</p>
        </div>
      </div>
    </div>
  );
}
