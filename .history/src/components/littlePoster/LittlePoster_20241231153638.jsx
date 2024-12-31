import React from 'react';
import { Link } from 'react-router-dom';
import "./LittlePoster.scss";
import backgroundImg from "./backgroundImg.png";
import people1 from "./people (1).png";
import people2 from "./people (2).png";
import people3 from "./people (3).png"; 
const LittlePoster = () => {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover", 
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
      };
  return (
    <div id='poster' style={backgroundStyle}>
        <div className="images">
            <img src={people3} alt="" />
            <img src={people1} alt="" />
            <img src={people2} alt="" />
        </div>
        <div className="texts">
            <h1>Endi o'zingizga mos ishni bizda oson va tezkor topa olasiz</h1>
            <Link to="#">Hoziroq boshlang</Link>
        </div>
    </div>
  )
}

export default LittlePoster