import React, { useState, useEffect } from "react";
import axios from "axios";

const OneCountry = ({ country }) => {
  console.log(country);
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>populaton {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language, index) => (
          <li key={index}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="" height="200"></img>
    </div>
  );
};

const Countries = ({ countries }) => {
  if (countries.length <= 0) {
    return <p>No country exists with that name</p>;
  } else if (countries.length === 1) {
    return <OneCountry country={countries[0]} />;
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map((country) => (
          <p key={country.numericCode}>{country.name}</p>
        ))}
      </div>
    );
  } else {
    return <p>Too many matches, specify another filter</p>;
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const countriesToShow = search
    ? countries.filter((country) =>
        country.name.toLowerCase().startsWith(search.toLowerCase())
      )
    : countries;

  console.log(countriesToShow);

  return (
    <div>
      <h1>Country search</h1>
      <input value={search} onChange={handleSearch}></input>
      <Countries countries={countriesToShow} />
    </div>
  );
};

export default App;
