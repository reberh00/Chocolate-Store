export function ArtistCard({
  name,
  country,
  netWorth,
  biography,
  imageUrl,
  isSelected,
  onSelectArtist,
}) {
  return (
    <button
      onClick={onSelectArtist}
      className={`flex flex-row items-center overflow-hidden mx-2 mb-3 w-[60rem] max-w-[60rem] min-w-[60rem] rounded-full bg-rose-100 hover:cursor-pointer hover:bg-rose-300 ${isSelected && "bg-rose-300"}`}
    >
      <img className="w-1/4 block" src={imageUrl} alt="artist image" />
      <div className="flex flex-row items-center justify-between w-full px-5">
        <div className="flex flex-col grow justify-between">
          <p className="w-fit flex-auto text-lg text-left text-ellipsis overflow-hidden text-nowrap">
            {name}
          </p>
          <p className="w-fit text-sm text-nowrap flex-auto text-rose-900">
            {country}
          </p>
        </div>

        <div className="flex items-center p-5 w-fit h-fit aspect-square text-md rounded-full text-white font-medium bg-rose-900">
          <p>{netWorth}$</p>
        </div>
      </div>
    </button>
  );
}
