import { useEffect, useState } from "react";
import { ChocolateCard } from "./ChocolateCard";
import axios from "axios";

export function ChocolateList() {
  const [chocolates, setChocolates] = useState([]);

  useEffect(() => {
    async function fetchChocolates() {
      const res = await axios.get("http://localhost:5555/chocolates");
      setChocolates(res.data);
    }
    fetchChocolates();
  }, []);

  return (
    <div className="max-h-screen overflow-hidden">
      <p className="text-3xl uppercase text-center">Chocolate list</p>

      <div className="w-full max-h-[90vh] overflow-y-scroll my-5">
        <div className="flex flex-wrap mx-auto w-[90vw] justify-center">
          {chocolates.map((item) => (
            <ChocolateCard
              name={item.name}
              price={item.price}
              manufacturerName={item.name + "'s company"}
            />
          ))}

          {chocolates.map((item) => (
            <ChocolateCard
              name={item.name}
              price={item.price}
              manufacturerName={item.name + "'s company"}
            />
          ))}
          {chocolates.map((item) => (
            <ChocolateCard
              name={item.name}
              price={item.price}
              manufacturerName={item.name + "'s company"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
