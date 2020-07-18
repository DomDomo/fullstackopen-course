import React, { useState } from "react";

const Filter = (props) => {
  return (
    <p>
      filter shown with
      <input value={props.newSearch} onChange={props.handleChange} />
    </p>
  );
};

const PersonForm = (props) => {
  console.log(props);
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
        <br />
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
);

const Persons = (props) => {
  return (
    <div>
      {props.people.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const duplicateName = persons
      .map((person) => person.name)
      .includes(newName);

    if (duplicateName) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
        })
      );
      setNewName("");
      setNewNumber("");
    }
  };

  const peopleToShow = newSearch
    ? persons.filter((person) =>
        person.name.toLowerCase().startsWith(newSearch.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} handleChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons people={peopleToShow} />
    </div>
  );
};

export default App;
