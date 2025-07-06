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
    <div className="flex flex-row justify-center items-center h-full w-full">
      <img className="w-1/3 block mr-10" src={artist?.imageUrl} />

      <div className="text-left space-y-2">
        <p className="text-2xl  ">
          {artist?.firstName + " " + artist?.lastName}
        </p>
        <p className="text-2xl mb-10 ">
          {artist?.city + ", " + artist?.country}
        </p>

        <p className="text-2xl">{artist?.biography}</p>
        <p className="text-2xl">{artist?.originStory}</p>

        <div className="flex mt-5">
          <p className="text-xl  uppercase mr-2">Net worth:</p>
          <p className="text-xl">{artist?.netWorth}$</p>
        </div>
      </div>
    </div>
  );
}
