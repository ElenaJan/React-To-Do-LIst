import React from "react";
import ornament from "../img/ornament.png";
import "../styles/Ornaments.sass";

const Ornament = () => {
    return (
        <div className="ornament">
            <img src={ornament} alt="ornament" />
        </div>
    );
};

export default Ornament;
