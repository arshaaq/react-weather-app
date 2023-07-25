import './styles/stylesheet.css'
import {gsap} from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';


import { useEffect, useState } from 'react';
import OutputLabel from './components/OutputLabel';






function App() {

//---------------------------------VARIABLES----------------------------------------------//
  let apiKey = "d9b264d793e700a901dc8f4a174c26a3";

  const[countryName, setCountryName] = useState('')
  const[countries, setCountries] = useState([])
  const[temperature, setTemperature] = useState('')
  const[weather, setWeather] = useState('')


  let pickedCountry = "";
  let pickedWeather = "";
  let pickedTemperature = "";


  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${countryName}&appid=${apiKey}`;

//---------------------------------GSAP----------------------------------------------//



//---------------------------------FUNCTIONS----------------------------------------------//

const backgroundChange = (weatherType) =>{
 
 if(weatherType.includes("clouds")){
  document.body.classList.remove(...document.body.classList);
  document.body.classList.add('overcastClouds');
  
 }else if(weatherType.includes("sky")){
  document.body.classList.remove(...document.body.classList);
  document.body.classList.add('clearSky');

}else if(weatherType.includes("mist")){
  document.body.classList.remove(...document.body.classList);
  document.body.classList.add('mist');

}else if(weatherType.includes("rain")){
  document.body.classList.remove(...document.body.classList);
  document.body.classList.add('rain');

}else{
  document.body.classList.remove(...document.body.classList);
 }
 




}



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
      setWeather(data.weather[0].description);
      setTemperature(data.main.temp + " degrees celsius");
      
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
    const weatherBox = document.getElementById('weather-box');
    for(const country of countries){
      //if there's a country name match with the API
      if(country.name.common.toLowerCase() == filter.toLowerCase()){

        getCountryWeather();
        backgroundChange(weather);
        pickedCountry = country.name.common;
        pickedWeather = weather;
        pickedTemperature = temperature;
        

        //set a delay so that info update doesn't look funky on the UI
        setTimeout(() => {
          weatherBox.classList.add('countryFound');
        }, 100);
        break;
        
      }else{
        weatherBox.classList.remove('countryFound');
        backgroundChange("");
      }
    }
  }


//---------------------------------RENDER OUTPUT----------------------------------------------//
  return (  
    <>
      <header className='header'>  
      <form id='form-search-bar' onChange={getCountryInformation(countryName)}>
            <input id="search-bar" type="text" value={countryName} onChange={handleChange}/>
      </form>      
      </header>



      <div id="weather-box" className='weather-box'>
        <div className="weather-box_header">
          <OutputLabel name="country" text={pickedCountry}/>
        </div>

        <div className='weather-box_main'>
          <OutputLabel name="weather" text={pickedWeather}/>
          <OutputLabel name="temperature" text={pickedTemperature}/>
        </div>
      </div>
    </>


  );
}

export default App;
