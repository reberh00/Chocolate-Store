import chocolateImage from "./temp_chocolate_image.jpg";

export function ChocolateCard({
  name,
  price,
  manufacturerName,
  isSelected,
  onSelectChocolate,
}) {
  return (
    <button
      onClick={onSelectChocolate}
      className={`w-64 max-w-64 min-w-64 p-5 mr-2 mb-2 space-y-5 rounded-lg bg-slate-100 hover:cursor-pointer hover:bg-slate-200 ${isSelected && "bg-slate-200"}`}
    >
      <img
        className="w-full block"
        src={chocolateImage}
        alt="chocolate image"
      />
      <div className="flex-col">
        <div className="flex justify-between space-x-5">
          <p className="w-fit flex-auto uppercase text-md text-left text-ellipsis overflow-hidden text-nowrap">
            {name}
          </p>
          <p className="w-fit flex-auto text-md text-right text-nowrap">
            {price}$
          </p>
        </div>
        <p className="w-fit text-clip overflow-hidden text-sm text-nowrap flex-auto text-gray-400">
          {manufacturerName}
        </p>
      </div>
    </button>
  );
}
