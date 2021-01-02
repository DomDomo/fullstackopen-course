import React, { useState, useEffect } from "react";
import personsService from './services/persons';
import './index.css'

const Notification = (props) => {
  if (props.stateMessage === null) {
    return null
  }

  return (
    <div className={props.stateMessage.type}>
      {props.stateMessage.message}
    </div>
  )
}

const Filter = (props) => {
  return (
    <p>
      filter shown with
      <input value={props.newSearch} onChange={props.handleChange} />
    </p>
  );
};

const PersonForm = (props) => {
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

const Person = (props) => (
  <p>{props.person.name} {props.person.number} <button onClick={props.deletePerson}>delete</button></p>
);

const Persons = (props) => {
  return (
    <div>
      {props.people.map((person) => (
        <Person key={person.id} person={person} deletePerson={() => props.deletePerson(person)}/>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [stateMessage, setStateMessage] = useState({});

  useEffect(() => {
    personsService
    .getAll()
    .then(persons => {
      setPersons(persons)
    });
  }, []);

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const deletePerson = (person) => {
    if(!(window.confirm(`Delete ${person.name} ?`))) return;

    personsService
      .deletePerson(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id ));
      })
      .then(() => {
        const message = {
          message: `Deleted ${newName}`,
          type: "success"
        }
        addStateMessage(message);
      })
  };

  const addStateMessage = (message) => {
    setStateMessage(message);

    setTimeout(() => {
      setStateMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault();

    const duplicateName = persons
      .map((person) => person.name)
      .includes(newName);

    if (duplicateName) {
      if(!(window.confirm(
      `${newName} is already added to the phonebook, do you want to replace the old number with a new one?`
      )))return;

      const newPerson = {
        name: newName,
        number: newNumber,
      }

      const person = persons.find((p) => p.name === newName);

      personsService
      .updatePerson(person.id, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
      })
      .then(() => {
        const message = {
          message: `Updated ${newName}`,
          type: "success"
        }
        addStateMessage(message);
      })

      
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personsService
      .createPerson(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewNumber("");
      }).then(() => {
        const message = {
          message: `Added ${newName}`,
          type: "success"
        }
        addStateMessage(message);
      })
      
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
      <Notification stateMessage={stateMessage}/>
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
      <Persons people={peopleToShow} deletePerson={deletePerson}/>
    </div>
  );
};

export default App;
