import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import img9 from "../images/img-9.jpg";
import img2 from "../images/img-2.jpg";
import img3 from "../images/img-3.jpg";
import img4 from "../images/img-4.jpg";
import img8 from "../images/img-8.jpg";

function Cards() {
  return (
    <div className="cards">
      <h1>Check out these sample videos!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src={img9}
              text="Foley sound for walking events"
              label="Walking"
              path="/services"
            />
            <CardItem
              src={img2}
              text="Foley sound for jumping events"
              label="Jumping"
              path="/services"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src={img3}
              text="Foley sound for clapping"
              label="Clapping"
              path="/services"
            />
            <CardItem
              src={img4}
              text="Foley sound for sipping"
              label="Sipping"
              path="/products"
            />
            <CardItem
              src={img8}
              text="Foley sound for chewing"
              label="Chewing"
              path="/sign-up"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
