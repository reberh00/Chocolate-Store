export function ManufacturerCard({
  firmName,
  netWorth,
  firmAddress,
  imageUrl,
  isSelected,
  onSelectManufacturer,
}) {
  return (
    <button
      onClick={onSelectManufacturer}
      className={`w-64 max-w-64 min-w-64 p-5 mr-2 mb-2 space-y-5 rounded-lg bg-slate-100 hover:cursor-pointer hover:bg-slate-200 ${isSelected && "bg-slate-200"}`}
    >
      <img className="w-full block" src={imageUrl} alt="chocolate image" />
      <div className="flex-col">
        <div className="flex justify-between space-x-5">
          <p className="w-fit flex-auto uppercase text-md text-left text-ellipsis overflow-hidden text-nowrap">
            {firmName}
          </p>
          <p className="w-fit flex-auto text-md text-right text-nowrap">
            {netWorth}$
          </p>
        </div>
        <p className="w-fit text-clip overflow-hidden text-sm text-nowrap flex-auto text-gray-400">
          {firmAddress}
        </p>
      </div>
    </button>
  );
}
