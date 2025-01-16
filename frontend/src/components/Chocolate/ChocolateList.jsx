import { useEffect, useState } from "react";
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
    <div className="flex flex-col">
      {chocolates.map((item) => 
        <div className="flex flex-row p-3 mb-2 space-x-4 bg-slate-300" key={item.id}>
          <div>{item.name}</div>
          <div>{item.price}</div>
          <div>{item.cacaoPercentage}%</div>
        </div>
      )}    
    </div>
  );
}