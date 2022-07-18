import { useEffect, useState } from "react";

export const CoordinateCalculation = (props) => {
  console.log(props.coords);
  console.log(props.sortedAreasArr);

  //! Getting the top 10 closest area array
  const topTenClosest = [];
  for (let i = 0; i < 10; i++) {
    topTenClosest.push(props.sortedAreasArr[i]);
  }

  //! Render
  if(props.coords && props.sortedAreasArr) {
    return (
      <div className="flex flex-col items-center justify-center mt-3 bg-slate-300">
        <h1 className="font-bold text-lg">Coordinates</h1>
        {
          <p className="text-center">
            latitude&emsp;:{" "}
            <span className="font-bold">{props.coords.latitude}</span>
            ,
            <br />
            longitude&emsp;:{" "}
            <span className="font-bold">{props.coords.longitude}</span>
          </p>
        }
        <h2 className="mt-3">
          Detected Location : 
        </h2>
          <span className="text-2xl font-bold text-purple-500">
            {props.sortedAreasArr[0].kota}
          </span>
        <h2 className="mt-3 text-lg">Inaccurate location? Select these options</h2>
        <ul className="grid grid-cols-5 gap-2 p-2 bg-blue-400">
          {topTenClosest.map((area) => {
            return (
              <li key={area.id} className="bg-green-300 p-1 justify-center text-center rounded hover:bg-green-200 cursor-pointer">
                {area.kota}
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center mt-3 bg-slate-300">
        <h1 className="font-bold text-lg">Coordinates</h1>
        <p>Unable to access your location, please check location permissions</p>
      </div>
    );
  }
};
