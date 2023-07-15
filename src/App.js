import './styles/stylesheet.css'
import {gsap} from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

import Header from "./components/Header";
import { useEffect, useState } from 'react';
import OutputLabel from './components/OutputLabel';






function App() {

  let apiKey = "d9b264d793e700a901dc8f4a174c26a3";

  const[countryName, setCountryName] = useState('')
  const[countries, setCountries] = useState([])
  const[temperature, setTemperature] = useState('')
  const[weather, setWeather] = useState('')
  let pickedCountry = "";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${countryName}&appid=${apiKey}`;


  const getCountryData = () =>{
    fetch('https://restcountries.com/v3.1/all')
    .then(response=>{
      return response.json()
    }).then(data=>{;
      setCountries(data);
    })
  }

  const getCountryWeather = () =>{
    fetch(apiUrl)
    .then(response=>{
      return response.json()
    }).then(data =>{
      console.log(data);
      setWeather(data.weather[0].description);
      setTemperature(data.main.temp);
    });

  }

//gets country name
  const handleChange = (event) =>{
    setCountryName(event.target.value);
  }

  useEffect(() => {
    getCountryData();
  }, []);

  const getCountryInformation = (filter) =>{
    for(const country of countries){
      if(country.name.common.toLowerCase() == filter.toLowerCase()){

        pickedCountry = country.name.common;
        getCountryWeather();
      }else{

      }
    }
  }



  return (  
    <>
      <header class='header'>        
      </header>

      <form onChange={getCountryInformation(countryName)}>
            <input id="search-bar"type="text" value={countryName} onChange={handleChange}/>
      </form>

      <div id="weather-box">
        <OutputLabel labelName ={"Country"} text={pickedCountry}/>
        <OutputLabel labelName ={"Description"} text={`${weather}`}/>
        <OutputLabel labelName ={"Temperature"} text={`${temperature} degrees celsius`}/>
      </div>
    </>


  );
}

export default App;
