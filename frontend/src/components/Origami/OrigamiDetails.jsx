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
    <div className="flex flex-row justify-center items-center h-full w-full ">
      <img className="w-1/3 block mr-10" src={origami?.imageUrl} />

      <div className="text-left space-y-2">
        <p className="text-2xl ">{origami?.name}</p>
        <p className="text-2xl mb-10 ">
          {origami?.artist.firstName + " " + origami?.artist.lastName}
        </p>

        <p className="text-2xl">{origami?.description}</p>
        <p className="text-2xl">{origami?.originStory}</p>

        <div className="flex mt-5">
          <p className="text-2xl   mr-2">Origin Year:</p>
          <p className="text-2xl">{origami?.originYear}.</p>
        </div>

        <div className="flex mt-5">
          <p className="text-2xl  mr-2">Number of folds:</p>
          <p className="text-2xl">{origami?.numberOfFolds}</p>
        </div>
      </div>
    </div>
  );
}
