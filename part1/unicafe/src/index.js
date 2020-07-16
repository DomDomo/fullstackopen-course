import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Buttons = (props) => {
  const components = [];

  props.buttons.forEach((button) => {
    components.push(
      <Button handleClick={button.handleClick} text={button.text} />
    );
  });

  return <div>{components}</div>;
};

const Statistic = (props) => (
  <p>
    {props.text} {props.value}
  </p>
);

const Statistics = (props) => {
  const allFeedback = props.feedback.find(({ text }) => text === "all").value;
  if (allFeedback === 0) {
    return <div>No feedback given</div>;
  }

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

  const buttons = [
    {
      text: "good",
      handleClick: handleGoodClick,
    },
    {
      text: "neutral",
      handleClick: handleNeutralClick,
    },
    {
      text: "bad",
      handleClick: handleBadClick,
    },
  ];

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
      <Buttons buttons={buttons} />

      <Header text={"statistics"} />
      <Statistics feedback={feedback} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
