import React from "react";

const Titles = () => (
  //show pictures and city names first
  <div>
    <h1 className="title-container__title">
      You searched for a destination that fits this profile:
    </h1>
    <h3 className="title-container__subtitle">Historical</h3>
    <h3 className="title-container_subtitle">Walkable:</h3>
    <h3 className="title-container_subtitle">Many attractions</h3>

    <hr />

    <h1 className="title-container__title">Info: </h1>
    <h3 className="title-container__subtitle">Cost:</h3>
    <h3 className="title-container_subtitle">Weather:</h3>
    <h3 className="title-container_subtitle">Attractions:</h3>
  </div>
);

export default Titles;
