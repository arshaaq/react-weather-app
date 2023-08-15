import './styles/stylesheet.css'
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

const UIChange = (weatherType, temperature) =>{

  const temperatureNumber = parseInt(temperature.replace(" degrees celsius",""));
  const textTemperature = document.getElementById("temperature");
  textTemperature.classList.remove(...textTemperature.classList);

 //for temperature
 if(temperatureNumber <= -30){
  
  textTemperature.classList.add("very_cold");

 } else if (temperatureNumber > -30 && temperatureNumber <= -10 ){
  textTemperature.classList.add("cold");

 } else if (temperatureNumber > -10 && temperatureNumber <= 0 ){
  textTemperature.classList.add("chill");

 } else if (temperatureNumber > 0 && temperatureNumber <= 4 ){
  textTemperature.classList.add("fridge");

 } else if (temperatureNumber > 4 && temperatureNumber <= 15 ){
  textTemperature.classList.add("okay");

 } else if (temperatureNumber > 15 && temperatureNumber <= 25 ){
  textTemperature.classList.add("warm");

 } else if (temperatureNumber > 25 && temperatureNumber <= 30 ){
  textTemperature.classList.add("hot");

  } else if (temperatureNumber > 30){
  textTemperature.classList.add("very_hot");
  }

 //for the type of weather
 if(weatherType.includes("overcast clouds")){
  document.body.classList.remove(...document.body.classList);
  document.body.classList.add('overcastClouds');
  
 }else if(weatherType.includes("few clouds")){
  document.body.classList.remove(...document.body.classList);
  document.body.classList.add('fewClouds');

}else if(weatherType.includes("scattered clouds") || weatherType.includes("broken clouds")){
  document.body.classList.remove(...document.body.classList);
  document.body.classList.add('scatteredClouds');

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
  //document.body.classList.remove(...document.body.classList);
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
        UIChange(weather, temperature);
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
        UIChange("","");
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
