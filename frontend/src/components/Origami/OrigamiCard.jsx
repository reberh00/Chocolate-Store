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
      className={`flex flex-row items-center overflow-hidden mx-10 w-1/3 max-w-1/3 min-w-1/3 rounded-full bg-slate-100 hover:cursor-pointer hover:bg-slate-200 ${isSelected && "bg-slate-200"}`}
    >
      <img className="w-1/4 block" src={"https://content.instructables.com/F6O/PDL9/IBJ769QN/F6OPDL9IBJ769QN.jpg?auto=webp&frame=1&width=320&md=MjAxNS0wNi0zMCAxMzo0MTo1My4w"} alt="origami image" />
      <div className="flex-col w-full px-5">
        <div className="flex justify-between">
          <p className="w-fit flex-auto text-lg text-left text-ellipsis overflow-hidden text-nowrap">
            {name}
          </p>
          <p className="w-fit flex-auto text-md text-right text-nowrap">
            {price}$
          </p>
        </div>
        <p className="w-fit text-clip overflow-hidden text-sm text-nowrap flex-auto text-gray-400">
          {artistName}
        </p>
      </div>
    </button>
  );
}
