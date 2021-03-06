import React, { useState, useEffect } from "react";
import personService from './services/persons';
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
    personService
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

  const addStateMessage = (message) => {
    setStateMessage(message);

    setTimeout(() => {
      setStateMessage(null)
    }, 5000)
  }

  const deletePerson = (person) => {
    if(!(window.confirm(`Delete ${person.name} ?`))) return;

    personService
      .deletePerson(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id ));
      })
      .then(() => {
        const message = {
          message: `Deleted ${person.name}`,
          type: "success"
        }
        addStateMessage(message);
      })
      .catch(error => {
        console.error(error);
        const message = {
          message: `Information of ${person.name} has already been removed from the server`,
          type: "error"
        }
        addStateMessage(message);
        setPersons(persons.filter(p => p.id !== person.id));
      })
  };

  

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

      personService
      .updatePerson(person.id, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
        setNewName("");
        setNewNumber("");
      })
      .then(() => {
        const message = {
          message: `Updated ${newName}`,
          type: "success"
        }
        addStateMessage(message);
      })
      .catch(error => {
        const message = {
          message: `${error.response.data.error}`,
          type: "error"
        }
        addStateMessage(message);
      })

      
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personService
      .createPerson(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewNumber("");
      })
      .then(() => {
        const message = {
          message: `Added ${newName}`,
          type: "success"
        }
        addStateMessage(message);
      })
      .catch(error => {
        const message = {
          message: `${error.response.data.error}`,
          type: "error"
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
