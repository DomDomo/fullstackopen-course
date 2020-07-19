import React, { useState, useEffect } from "react";
import axios from "axios";

const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({});

  console.log(weather);

  axios
    .get(
      `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${country}`
    )
    .then((response) => {
      console.log(response.data.current);
      setWeather(response.data.current);
    });

  if (!weather) {
    return <p>Loading....</p>;
  } else {
    return (
      <div>
        <h2>Weather in {country.name}</h2>
        <p>
          <b>temperature: </b>
          {weather.temperature} Celcius
        </p>
        <img src={weather.weather_icons} alt="" height="100"></img>
        <p>
          <b>wind: </b>
          {weather.wind_speed} km/h direction {weather.wind_dir}
        </p>
      </div>
    );
  }
};

const OneCountry = ({ country }) => {
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
      <Weather country={country.name} />
    </div>
  );
};

const CountryOption = ({ country, handleClick }) => (
  <p>
    {country.name}
    <button onClick={handleClick} country={country.name}>
      show
    </button>
  </p>
);
const Countries = ({ countries, handleClick }) => {
  if (countries.length <= 0) {
    return <p>No country exists with that name</p>;
  } else if (countries.length === 1) {
    return <OneCountry country={countries[0]} />;
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map((country) => (
          <CountryOption
            key={country.numericCode}
            handleClick={handleClick}
            country={country}
          />
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

  const handleClick = (event) => {
    setSearch(event.target.attributes.country.value);
  };

  const countriesToShow = search
    ? countries.filter((country) =>
        country.name.toLowerCase().startsWith(search.toLowerCase())
      )
    : countries;

  return (
    <div>
      <h1>Country search</h1>
      <input value={search} onChange={handleSearch}></input>
      <Countries countries={countriesToShow} handleClick={handleClick} />
    </div>
  );
};

export default App;
