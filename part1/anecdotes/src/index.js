import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => <h1>{text}</h1>;

const App = ({ anecdotes }) => {
  const makeRandomInt = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const startPoints = new Array(anecdotes.length).fill(0);

  const [points, setPoints] = useState(startPoints);
  const [selected, setSelected] = useState(makeRandomInt());

  const handleVoteClick = () => {
    const copyPoints = { ...points };
    copyPoints[selected] += 1;
    setPoints(copyPoints);
  };

  const handleNextClick = () => {
    setSelected(makeRandomInt());
  };

  const mostVotesIndex = Object.keys({ ...points }).reduce((a, b) =>
    points[a] > points[b] ? a : b
  );

  return (
    <div>
      <Header text={"Anecdote of the day"} />
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleNextClick}>next anecdote</button>
      <Header text={"Anecdote with the most votes"} />
      <p>{anecdotes[mostVotesIndex]}</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
