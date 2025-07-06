import { useEffect, useState } from "react";
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
      userSession.token
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
      prevSelectedArtist?._id === artist._id ? null : artist
    );
  }

  return (
    <div className="overflow-auto grow flex flex-col w-full justify-between items-center">
      <p className="py-5 text-4xl text-center font-medium">Artists</p>
      <div className="flex flex-wrap mx-auto overflow-y-scroll justify-center w-full">
        {artists.map((item) => (
          <button
            key={item._id}
            onClick={() => handleSelectArtist(item)}
            className={`flex flex-row items-center overflow-hidden mb-2 `}
          >
            <img className="w-1/4 block mr-2" src={item.imageUrl} />
            <p className="text-left text-ellipsis overflow-hidden text-nowrap mr-2">
              {item.firstName + " " + item.lastName}
            </p>
            <p className="text-nowrap mr-2 ">{item.country}</p>
            <p>{item.netWorth}$</p>
          </button>
        ))}
      </div>

      <div className="flex flex-row justify-center">
        {userSession.role === "admin" && (
          <button
            className="px-5 py-2 text-white bg-rose-900 "
            onClick={handleCreate}
          >
            Create
          </button>
        )}

        {selectedArtist != null && (
          <button
            className={`px-5 py-2 text-white bg-blue-500`}
            onClick={handleDetails}
          >
            Read
          </button>
        )}

        {userSession.role === "admin" && selectedArtist != null && (
          <button
            className={`px-5 py-2 text-white bg-purple-500`}
            onClick={handleUpdate}
          >
            Update
          </button>
        )}

        {userSession.role === "admin" && selectedArtist != null && (
          <button
            className={`px-5 py-2 text-white bg-red-500`}
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
