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

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalReviews = good + neutral + bad;
  const averageReviews = totalReviews ? (good - bad) / totalReviews : 0;
  const positive = totalReviews ? (good / totalReviews) * 100 : 0;
  const positiveReviews = `${positive}%`;

  return (
    <div>
      <Header text={"give feedback"} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text={"statistics"} />
      <Statistic text={"good"} value={good} />
      <Statistic text={"neutral"} value={neutral} />
      <Statistic text={"bad"} value={bad} />
      <Statistic text={"all"} value={totalReviews} />
      <Statistic text={"average"} value={averageReviews} />
      <Statistic text={"positive"} value={positiveReviews} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
