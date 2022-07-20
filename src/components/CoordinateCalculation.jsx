import { useEffect, useState } from "react";
import Select from "react-select";

export const CoordinateCalculation = (props) => {
  const coordinate = props.coordinate;
  const nearestAreas = props.nearestAreas;

  //! Render
  if(coordinate && nearestAreas[0]) {
    return (
      <div className="flex flex-col items-center justify-center mt-3 bg-slate-300">
        <h1 className="font-bold text-lg">Coordinates</h1>
        {
          <p className="text-center">
            latitude&emsp;:{" "}
            <span className="font-bold">{coordinate.latitude}</span>
            ,
            <br />
            longitude&emsp;:{" "}
            <span className="font-bold">{coordinate.longitude}</span>
          </p>
        }
        <h2 className="mt-3">
          Detected Location : 
        </h2>
          <span className="text-2xl font-bold text-purple-500">
            {nearestAreas[0].kota}
          </span>
        <h2 className="mt-3 text-lg">Inaccurate location? Select these options</h2>
        <Select 
          className="w-96"
          options={nearestAreas.map(area => {
            return({label:area.kota, value:area.id})
          })}
        />
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
