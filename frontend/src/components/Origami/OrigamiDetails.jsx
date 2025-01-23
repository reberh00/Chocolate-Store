import { useState, useEffect } from "react";
import OrigamiService from "./OrigamiService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function OrigamiDetails() {
  const { origamiId } = useParams();
  const [origami, setOrigami] = useState(null);

  useEffect(() => {
    async function fetchOrigami() {
      const origamiData = await OrigamiService.getOrigamiById(origamiId);
      console.log(origamiData);
      setOrigami(origamiData);
    }
    fetchOrigami();
  }, []);

  return (
    <div className="flex flex-row justify-center items-center h-full w-full bg-rose-200">
      <img
        className="w-1/3 aspect-square rounded-full block mr-10"
        src={
          "https://content.instructables.com/F6O/PDL9/IBJ769QN/F6OPDL9IBJ769QN.jpg?auto=webp&frame=1&width=320&md=MjAxNS0wNi0zMCAxMzo0MTo1My4w"
        }
      />

      <div className="text-left space-y-2">
        <p className="text-3xl font-medium text-rose-900">{origami?.name}</p>
        <p className="text-2xl mb-10 font-medium">
          {origami?.artist.firstName + " " + origami?.artist.lastName}
        </p>

        <p className="text-xl">{origami?.description}</p>
        <p className="text-xl">{origami?.originStory}</p>

        <div className="flex mt-5">
          <p className="text-xl font-medium uppercase mr-2">Origin Year:</p>
          <p className="text-xl">{origami?.originYear}.</p>
        </div>

        <div className="flex mt-5">
          <p className="text-xl font-medium uppercase mr-2">Number of folds:</p>
          <p className="text-xl">{origami?.numberOfFolds}</p>
        </div>
      </div>
    </div>
  );
}
