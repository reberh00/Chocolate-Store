import { useNavigate } from "react-router-dom";
import { useUserSession } from "../../hooks/useUserSession";

export function NavigationBar() {
  const navigate = useNavigate();
  const { logout, userSession } = useUserSession();
  function handleOrigamis() {
    navigate(`/origamis`);
  }
  function handleArtists() {
    navigate(`/artists`);
  }

  return (
    <div className="flex flex-row justify-between px-5 py-2 w-full rounded-b-xl bg-slate-300">
      <div className="flex flex-row justify-start space-x-5">
        <button
          className={`px-6 py-3 text-white bg-blue-500 font-bold rounded-full uppercase`}
          onClick={handleOrigamis}
        >
          /Origamis
        </button>

        <button
          className={`px-6 py-3 text-white bg-blue-500 font-bold rounded-full uppercase`}
          onClick={handleArtists}
        >
          /Artists
        </button>
      </div>

      <div className="flex flex-row justify-end space-x-5">
        <p className={`px-6 py-3 text-blue-800 font-bold uppercase`}>
          {userSession?.username}
        </p>
        <button
          className={`px-6 py-3 text-white bg-blue-500 font-bold rounded-full uppercase`}
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
