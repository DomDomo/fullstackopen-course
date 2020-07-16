import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistic = (props) => (
  <p>
    {props.text} {props.value}
  </p>
);

const Statistics = (props) => {
  const components = [];

  props.feedback.forEach((statistic) => {
    components.push(
      <Statistic text={statistic.text} value={statistic.value} />
    );
  });

  return <div>{components}</div>;
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  const all = good + neutral + bad;
  const average = all ? (good - bad) / all : 0;
  const positive = `${all ? (good / all) * 100 : 0} %`;

  const feedback = [
    {
      text: "good",
      value: good,
    },
    {
      text: "neutral",
      value: neutral,
    },
    {
      text: "bad",
      value: bad,
    },
    {
      text: "all",
      value: all,
    },
    {
      text: "average",
      value: average,
    },
    {
      text: "positive",
      value: positive,
    },
  ];

  return (
    <div>
      <Header text={"give feedback"} />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Header text={"statistics"} />
      <Statistics feedback={feedback} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
