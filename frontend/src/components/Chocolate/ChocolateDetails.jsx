import { useState, useEffect } from "react";
import ChocolateService from "./ChocolateService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function ChocolateDetails() {
  const { chocolateId } = useParams();
  const [chocolate, setChocolate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChocolate() {
      const chocolateData =
        await ChocolateService.getChocolateById(chocolateId);
      console.log(chocolateData);
      setChocolate(chocolateData);
    }
    fetchChocolate();
  }, []);

  function getFormattedDate(dateString) {
    const date = new Date(dateString);

    return `${date.getDate()}. ${date.getMonth()}. ${date.getFullYear()}`;
  }

  return (
    <div className="flex flex-col h-screen justify-center">
      <p className="text-3xl uppercase text-center mb-5">{chocolate?.name}</p>
      <p className="text-xl text-center mb-10">{chocolate?.description}</p>

      <div className="flex flex-row justify-center items-center">
        <img className="h-fit w-1/4 mr-10" src={chocolate?.imageUrl} />
        <div className="text-left">
          <div className="flex">
            <p className="text-xl uppercase font-bold mr-5">
              DATE OF PRODUCTION:
            </p>
            <p className="text-xl">
              {chocolate && getFormattedDate(chocolate.dateOfProduction)}
            </p>
          </div>

          <div className="flex">
            <p className="text-xl uppercase font-bold mr-5">Price:</p>
            <p className="text-xl">{chocolate?.price}$</p>
          </div>

          <div className="flex">
            <p className="text-xl uppercase font-bold mr-5">
              Cacao percentage:
            </p>
            <p className="text-xl">{chocolate?.cacaoPercentage}%</p>
          </div>

          <div className="flex">
            <p className="text-xl uppercase font-bold mr-5">Net weight:</p>
            <p className="text-xl">{chocolate?.netWeight}g</p>
          </div>

          <p className="text-xl uppercase font-bold">Ingredients:</p>
          <div className="flex flex-row justify-center mb-5">
            {chocolate?.ingredients.map((item) => (
              <p
                key={chocolate._id + item}
                className="text-xl text-center mr-2"
              >
                {item},
              </p>
            ))}
          </div>

          <div className="flex">
            {chocolate?.isVegan && (
              <p className="text-xl bg-green-500 rounded-3xl w-fit px-5 uppercase font-bold mr-5">
                Vegan
              </p>
            )}

            {chocolate?.isOrganic && (
              <p className="text-xl bg-yellow-500 rounded-3xl w-fit px-5 uppercase font-bold mr-5">
                Organic
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
