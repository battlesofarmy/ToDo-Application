import axios from "axios";
import { useEffect } from "react";

export default function Love() {
  const localData = JSON.parse(localStorage.getItem("Todos")) || [];

  useEffect(()=>{
    axios.get('https://applications.muntasir3301.xyz/todos')
    .then(res=>console.log(res.data));
    console.log("HI")
  },[])

  return (
    <div className="py-20 container">
      <h2 className="text-3xl pb-5">Lists Of My To Do Items </h2>
      {
      localData?.map((ele, i) => (
        <div key={i} className="grid grid-cols-12 w-full bg-gray-200 py-3 my-2">
          <h4 className="col-span-1 flex justify-center font-bold text-blue-600">
            {i + 1}
          </h4>
          {<p className="col-span-9 items-center flex">{ele}</p>}
        </div>
      ))
      }
      {
        localData ? <p>HI </p> : <h2>sadfhoi</h2>
      }
    </div>
  );
}
