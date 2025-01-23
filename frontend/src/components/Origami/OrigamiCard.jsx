export function OrigamiCard({
  name,
  artistName,
  price,
  originYear,
  description,
  imageUrl,
  isSelected,
  onSelectOrigami,
}) {
  return (
    <button
      onClick={onSelectOrigami}
      className={`flex flex-row items-center overflow-hidden mx-2 mb-3 w-[30rem] max-w-[30rem] min-w-[30rem] rounded-full bg-rose-100 hover:cursor-pointer hover:bg-rose-200 ${isSelected && "bg-slate-200"}`}
    >
      <img
        className="w-1/4 block"
        src={
          "https://content.instructables.com/F6O/PDL9/IBJ769QN/F6OPDL9IBJ769QN.jpg?auto=webp&frame=1&width=320&md=MjAxNS0wNi0zMCAxMzo0MTo1My4w"
        }
        alt="origami image"
      />
      <div className="flex flex-row items-center justify-between w-full px-5">
        <div className="flex flex-col grow justify-between">
          <p className="w-fit flex-auto text-lg text-left text-ellipsis overflow-hidden text-nowrap">
            {name}
          </p>
          <p className="w-fit text-sm text-nowrap flex-auto text-rose-900">
            {artistName}
          </p>
        </div>

        <div className="flex items-center p-2 w-fit h-fit aspect-square text-md rounded-full text-white font-medium bg-rose-900">
          <p>{price}$</p>
        </div>
      </div>
    </button>
  );
}
