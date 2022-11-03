import React from "react";

const UlDetailAccess = ({detail}) => {
  return (
    <ul className="list-group list-group-horizontal mb-2 ">
      <li className="list-group-item">{detail.name}</li>
      <li className="list-group-item">Inicio: {detail.startTime}</li>
      <li className="list-group-item">Fin: {detail.endTime}</li>
    </ul>
  );
};

export default UlDetailAccess;
