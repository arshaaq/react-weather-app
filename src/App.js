import './styles/stylesheet.css'
import {gsap} from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

import CountryLabel from "./components/OutputLabel";
import { useEffect, useState } from 'react';






function App() {

  let apiKey = "d9b264d793e700a901dc8f4a174c26a3";

  const[countryName, setCountryName] = useState('')
  const[countries, setCountries] = useState([])
  const[temperature, setTemperature] = useState('')
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
      setTemperature(data.main.temp);
    });

  }


  const handleChange = (event) =>{
    setCountryName(event.target.value);
  }

  useEffect(() => {
    getCountryData();
  }, []);

  const getCountryInformation = (filter) =>{
    for(const country of countries){
      if(country.name.common.toLowerCase() == filter.toLowerCase()){
        console.log("it worked!");
        pickedCountry = country.name.common;
        getCountryWeather();
      }else{

      }
    }
  }



  return (  
    
      <div id="weather-box">

        <form onChange={getCountryInformation(countryName)}>
        <input type="text" value={countryName} onChange={handleChange}/>
        <input type="submit"/>
        </form>
        
        <CountryLabel labelName ={"Country"} text={pickedCountry}/>
        
        <CountryLabel labelName ={"Temperature"} text={`${temperature} degrees celsius`}/>
      </div>



  );
}

export default App;
