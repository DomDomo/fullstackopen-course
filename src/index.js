import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.header}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts.part1} exercises={props.parts.exercises1}/>
      <Part part={props.parts.part2} exercises={props.parts.exercises2}/>
      <Part part={props.parts.part3} exercises={props.parts.exercises3}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = {
   part1: 'Fundamentals of React',
   exercises1: 10,
   part2: 'Using props to pass data',
   exercises2: 7,
   part3: 'State of a component',
   exercises3: 14
  }

  return (
    <div>
      <Header header={course} />
      <Content parts={parts} />
      <Total exercises1={parts.exercises1} exercises2={parts.exercises2} exercises3={parts.exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))