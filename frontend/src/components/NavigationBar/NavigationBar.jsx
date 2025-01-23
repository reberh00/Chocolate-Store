import { useNavigate } from "react-router-dom";

export function NavigationBar() {
  const navigate = useNavigate();
  function handleChocolates() {
    navigate(`/origamis`);
  }
  function handleManufacturers() {
    navigate(`/artists`);
  }

  return (
    <div className="shrink flex flex-row justify-start space-x-5 px-5 py-2 w-full bg-rose-300">
      <button
        className={`px-5 py-2 text-white bg-blue-500 font-bold rounded-full uppercase`}
        onClick={handleChocolates}
      >
        Origamis
      </button>

      <button
        className={`px-5 py-2 text-white bg-blue-500 font-bold rounded-full uppercase`}
        onClick={handleManufacturers}
      >
        Artists
      </button>
    </div>
  );
}
