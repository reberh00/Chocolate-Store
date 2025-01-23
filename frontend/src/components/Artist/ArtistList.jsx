import { useEffect, useState } from "react";
import { ArtistCard } from "./ArtistCard";
import ArtistService from "./ArtistService";
import { useUserSession } from "../../hooks/useUserSession";
import { useNavigate } from "react-router-dom";

export function ArtistList() {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const { userSession } = useUserSession();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArtists() {
      const artistsData = await ArtistService.getAllArtists();
      setArtists(artistsData);
    }
    fetchArtists();
  }, []);

  async function handleDelete() {
    const deleteCount = await ArtistService.deleteArtistById(
      selectedArtist._id,
      userSession.token,
    );
    console.log(deleteCount);
    const artistsData = await ArtistService.getAllArtists();
    setArtists(artistsData);
    console.log(artistsData);
  }

  async function handleCreate() {
    navigate("/artists/create");
  }

  async function handleUpdate() {
    navigate(`/artists/${selectedArtist._id}/update`);
  }

  async function handleDetails() {
    navigate(`/artists/${selectedArtist._id}`);
  }

  function handleSelectArtist(artist) {
    setSelectedArtist((prevSelectedArtist) =>
      prevSelectedArtist?._id === artist._id ? null : artist,
    );
  }

  return (
    <div className="overflow-auto grow flex flex-col w-full justify-between items-center">
      <p className="py-5 text-4xl text-center font-medium text-rose-900">
        Artists
      </p>
      <div className="flex flex-wrap mx-auto overflow-y-scroll justify-center w-full">
        {artists.map((item) => (
          <ArtistCard
            key={item._id}
            onSelectArtist={() => handleSelectArtist(item)}
            isSelected={selectedArtist?._id === item._id}
            name={item.firstName + " " + item.lastName}
            netWorth={item.netWorth}
            imageUrl={item.imageUrl}
            country={item.country}
            biography={item.biography}
          />
        ))}
      </div>

      <div className="flex flex-row justify-center space-x-10 rounded-full py-5 mb-2 w-5/6 bg-rose-100">
        {userSession.role === "admin" && (
          <button
            className="px-5 py-2 text-white bg-rose-900 font-bold rounded-full uppercase"
            onClick={handleCreate}
          >
            Create
          </button>
        )}

        <button
          className={`px-5 py-2 text-white font-bold rounded-full uppercase ${selectedArtist ? "bg-blue-500" : "bg-blue-300"}`}
          onClick={handleDetails}
        >
          Read
        </button>

        {userSession.role === "admin" && (
          <button
            className={`px-5 py-2 text-white font-bold rounded-full uppercase ${selectedArtist ? "bg-purple-500" : "bg-purple-300"}`}
            onClick={handleUpdate}
          >
            Update
          </button>
        )}

        {userSession.role === "admin" && (
          <button
            className={`px-5 py-2 text-white font-bold rounded-full uppercase ${selectedArtist ? "bg-red-500" : "bg-red-300"}`}
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
