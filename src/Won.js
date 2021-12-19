import React from "react";

export default function Won(props) {
  // const styles = {
  //     backgroundColor: props.isHeld ? "#59E391" : "white"
  // }
  return (
    <div className="die-face">
      <h2 className="die-num">{props.countRolled}</h2>
      <h2 className="die-num">{props.timer}</h2>
      <h2 className="die-num">{props.highScore}</h2>
    </div>
  );
}
