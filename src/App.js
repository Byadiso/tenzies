import React from "react";
import Die from "./Die";
// import Won from "./Won"
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
// import Timer from "easytimer";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [countRolled, setcountRolled] = React.useState(0);
  // const [timer, setTimer] = React.useState(0);
  const [highScore, sethighScore] = React.useState(0);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      sethighScore((prev) => calcuateHighcore(prev, countRolled));
      console.log("You won!");
    }
  }, [dice, countRolled, highScore]);
  const handleCounts = () => {
    setcountRolled((prev) => prev + 1);
  };
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  // console.log(calcuateHighcore([3, 2, 6, 8, 4], 5));
  function calcuateHighcore(prevScore, score) {
    let array = [];
    if (prevScore === 0) {
      array.push(score);
      return score;
    } else {
      // console.log(prevScore === 0, prevScore);
      array.push(prevScore, score);
      let myScore = array.sort((a, b) => a - b)[0];
      // console.log(
      //   array.sort((a, b) => a - b),
      //   myScore
      // );
      return myScore;
    }
  } /**
 * Challenge: Allow the user to play a new game when the
 * button is clicked and they've already won
//  */
  //     set timer

  function rollDice() {
    if (tenzies) {
      setTenzies((prev) => !prev);
      setDice(allNewDice());
      setcountRolled(0);
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      handleCounts();
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  const renderMessage = () => {
    return (
      <div className="message">
        <h2>My counts:{countRolled}</h2>
        <h2>Highest score: {highScore}</h2>
      </div>
    );
  };

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">
        Tenzies <span className="counts">{countRolled}</span>
      </h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">
        {tenzies ? renderMessage() : diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
