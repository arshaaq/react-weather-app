import './styles/stylesheet.css'
import { useEffect, useState } from 'react';
import OutputLabel from './components/OutputLabel';

function App() {

//---------------------------------VARIABLES----------------------------------------------//
  let apiKey = "d9b264d793e700a901dc8f4a174c26a3";

  const[countryName, setCountryName] = useState('')
  const[countries, setCountries] = useState([])
  const[weather, setWeather] = useState('')
  const[humidity, setHumidity] = useState('')
  const[temperature, setTemperature] = useState('')
  const[tempUnit, setUnit] = useState('celsius')
  let unit = "°C";
  if(tempUnit == 'celsius'){
    unit = "°C";
  } else {
    unit = "°F";
  }

  let pickedCountry = "";
  let pickedWeather = "";
  let pickedHumidity = "";
  let pickedTemperature = "";


  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${countryName}&appid=${apiKey}`;

//---------------------------------GSAP----------------------------------------------//



//---------------------------------FUNCTIONS----------------------------------------------//

const UIChange = (weatherType, temperature) =>{

  const temperatureNumber = parseInt(temperature.replace(`${unit}`,""));
  const textTemperature = document.getElementById("temperature");
  textTemperature.classList.remove(...textTemperature.classList);


 //for temperature
 switch(tempUnit){
  
  case("celsius"):
    if(temperatureNumber <= -30){
      
      textTemperature.classList.add("very_cold");
      setTimeout(() => {
        textTemperature.classList.remove(...textTemperature.classList);
      }, 500);

    } else if (temperatureNumber > -30 && temperatureNumber <= -10 ){
      textTemperature.classList.add("cold");
      setTimeout(() => {
        textTemperature.classList.remove(...textTemperature.classList);
      }, 500);

    } else if (temperatureNumber > -10 && temperatureNumber <= 0 ){
      textTemperature.classList.add("chill");
      setTimeout(() => {
        textTemperature.classList.remove(...textTemperature.classList);
      }, 500);

    } else if (temperatureNumber > 0 && temperatureNumber <= 4 ){
      textTemperature.classList.add("fridge");
      setTimeout(() => {
        textTemperature.classList.remove(...textTemperature.classList);
      }, 1000);

    } else if (temperatureNumber > 4 && temperatureNumber <= 15 ){
      textTemperature.classList.add("okay");
      setTimeout(() => {
        textTemperature.classList.remove(...textTemperature.classList);
      }, 500);

    } else if (temperatureNumber > 15 && temperatureNumber <= 25 ){
      textTemperature.classList.add("warm");
      setTimeout(() => {
        textTemperature.classList.remove(...textTemperature.classList);
      }, 1000);

    } else if (temperatureNumber > 25 && temperatureNumber <= 30 ){
      textTemperature.classList.add("hot");
      setTimeout(() => {
        textTemperature.classList.remove(...textTemperature.classList);
      }, 500);

    } else if (temperatureNumber > 30){
      textTemperature.classList.add("very_hot");
      setTimeout(() => {
        textTemperature.classList.remove(...textTemperature.classList);
      }, 500);
    }
    break;
  case("fahrenheit"):
    if(temperatureNumber <= -22){
        
      textTemperature.classList.add("very_cold");
      setTimeout(() => {
        textTemperature.classList.remove(...textTemperature.classList);
      }, 500);

    } else if (temperatureNumber > -22 && temperatureNumber <= 14 ){
      textTemperature.classList.add("cold");
      setTimeout(() => {
        textTemperature.classList.remove(...textTemperature.classList);
      }, 500);

    } else if (temperatureNumber > -14 && temperatureNumber <= 32 ){
      textTemperature.classList.add("chill");
      setTimeout(() => {
        textTemperature.classList.remove(...textTemperature.classList);
      }, 500);

    } else if (temperatureNumber > 32 && temperatureNumber <= 39.2 ){
      textTemperature.classList.add("fridge");
      setTimeout(() => {
        textTemperature.classList.remove(...textTemperature.classList);
      }, 500);

    } else if (temperatureNumber > 39.2 && temperatureNumber <= 59 ){
      textTemperature.classList.add("okay");
      setTimeout(() => {
        textTemperature.classList.remove(...textTemperature.classList);
      }, 500);

    } else if (temperatureNumber > 59 && temperatureNumber <= 77 ){
      textTemperature.classList.add("warm");
      setTimeout(() => {
        textTemperature.classList.remove(...textTemperature.classList);
      }, 1000);

    } else if (temperatureNumber > 77 && temperatureNumber <= 86 ){
      textTemperature.classList.add("hot");
      setTimeout(() => {
        textTemperature.classList.remove(...textTemperature.classList);
      }, 500);

    } else if (temperatureNumber > 86){
      textTemperature.classList.add("very_hot");
      setTimeout(() => {
        textTemperature.classList.remove(...textTemperature.classList);
      }, 500);
    }
  break;
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
  //get's a list of countries
  const getCountryData = () =>{
    fetch('https://restcountries.com/v3.1/all')
    .then(response=>{
      return response.json()
    }).then(data=>{;
      setCountries(data);
    })
  }

  //gets specific country weather
  const getCountryWeather = () =>{
    fetch(apiUrl)
    .then(response=>{
      return response.json()
    }).then(data =>{
      //temperature to two decimal places
      let dataTemp = data.main.temp.toFixed(2);
      //weather description
      let dataWeather = data.weather[0].description;
      //humidity
      let dataHumidity = data.main.humidity;

      //console.log(data.main);
      if(tempUnit=="celsius"){
        setTemperature(dataTemp + `${unit}`);
      } else {
        let dataFahrenTemp = (dataTemp * 9/5) + 32;
        setTemperature(dataFahrenTemp.toFixed(2) + `${unit}`);
      }
      
      setWeather(dataWeather);
      setHumidity(dataHumidity + "%");

    });

  }

//temperature unit change

  const changeTemperatureUnit = ()=>{

   switch (tempUnit) {
    case "celsius":
      document.getElementById("unit-icon").classList.remove("celsius");
      document.getElementById("unit-icon").classList.add("fahrenheit");
      setUnit("fahrenheit");
      break;

    case "fahrenheit":
      document.getElementById("unit-icon").classList.add("celsius");
      document.getElementById("unit-icon").classList.remove("fahrenheit");
      setUnit("celsius");
      break;
   
    default:
      break;
   }
  }
//add the function to onclick with element:



//gets country name
  const handleChange = (event) =>{
    document.getElementById("tutorial-text-container").style.opacity=0;
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
        pickedHumidity = humidity;
        

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

      <svg width="75" height="75" viewBox="0 0 179 118" fill="none" xmlns="http://www.w3.org/2000/svg" id="weather-icon">
        <path d="M0 83.0133C0 75.0344 2.49842 67.8615 7.49527 61.6558C12.4921 55.45 18.8591 51.4203 26.6767 49.6472C28.7722 40.2177 33.5272 32.4 41.0225 26.4361C48.5178 20.3915 57.1414 17.4095 66.9739 17.4095C76.484 17.4095 85.027 20.3109 92.4417 26.1943C99.937 32.0777 104.773 39.5729 106.949 48.7607H109.125C118.635 48.7607 126.694 52.065 133.384 58.7544C140.073 65.4437 143.458 73.5031 143.458 82.9327C143.458 92.4428 140.073 100.502 133.384 107.192C126.694 113.881 118.635 117.266 109.125 117.266H34.4138C29.7393 117.266 25.3066 116.379 21.1157 114.526C16.9248 112.672 13.1369 110.415 10.0743 107.353C7.0117 104.29 4.59388 100.583 2.74021 96.3919C0.886537 92.201 0 87.6071 0 83.0133ZM11.6862 83.0133C11.6862 89.1384 13.9428 94.4577 18.2949 98.8098C22.647 103.162 28.0468 105.418 34.3332 105.418H109.125C115.33 105.418 120.73 103.242 125.163 98.8098C129.596 94.3771 131.852 89.1384 131.852 83.0133C131.852 76.8881 129.676 71.5689 125.163 67.2168C120.73 62.8647 115.411 60.608 109.125 60.608H97.9221C97.1162 60.608 96.7132 60.2051 96.7132 59.3991L96.149 55.45C95.3431 47.8741 92.1193 41.5072 86.5583 36.5103C80.9973 31.5135 74.3886 29.0151 66.8127 29.0151C59.2368 29.0151 52.6281 31.5135 46.9865 36.5909C41.3449 41.5878 38.2017 47.9547 37.4764 55.45L36.9122 58.835C36.9122 59.6409 36.5092 60.0439 35.6227 60.0439L31.9959 60.608C26.1932 61.0916 21.3575 63.5094 17.4084 67.7809C13.701 72.0524 11.6862 77.1299 11.6862 83.0133ZM83.0121 12.735C82.2062 13.4604 82.3674 14.0245 83.5763 14.4275C87.0419 15.9588 89.9433 17.4095 92.2805 18.8602C93.167 19.102 93.8118 19.0214 94.0536 18.6184C98.9698 14.0245 104.611 11.6873 111.14 11.6873C117.668 11.6873 123.229 13.8633 128.064 18.2154C132.819 22.5675 135.479 27.9673 136.043 34.3343L136.769 39.4923H148.213C153.452 39.4923 157.965 41.346 161.753 45.1339C165.541 48.9219 167.394 53.3546 167.394 58.5126C167.394 63.3483 165.702 67.5392 162.398 71.1659C159.093 74.7926 154.983 76.8075 150.067 77.3717C149.261 77.3717 148.858 77.7746 148.858 78.6612V87.7683C148.858 88.6549 149.261 89.0578 150.067 89.0578C158.207 88.5743 165.057 85.3505 170.618 79.4671C176.179 73.5837 179 66.572 179 58.5126C179 49.9696 176.018 42.7161 169.973 36.7521C163.929 30.7076 156.675 27.7256 148.213 27.7256H147.004C144.909 19.6661 140.476 13.0574 133.706 7.81877C127.017 2.58014 119.441 0.00111943 111.14 0.00111943C99.8564 -0.0794749 90.4268 4.19202 83.0121 12.735Z" fill="#D6D6DD"/>
      </svg>

      <form id='form-search-bar' onChange={getCountryInformation(countryName)}>
        <input id="search-bar" type="text" value={countryName} onChange={handleChange}/>
      </form>

      <div id='unit-icon' onClick={changeTemperatureUnit} className='celsius'>

      </div>

      </header>



      <section id="weather-box" className='weather-box'>
        <div className="weather-box_header">
          <h1>{pickedCountry}</h1>
          <div id='unit-icon' onClick={changeTemperatureUnit} className='celsius'>
            
          </div>
        </div>

        <div className='weather-box_main'>
          <OutputLabel name="weather" text={pickedWeather}/>
          <OutputLabel name="humidity" text={pickedHumidity}/>
          <OutputLabel name="temperature" text={pickedTemperature}/>
        </div>
      </section>

      <div id='tutorial-text-container'>
        <svg width="58" height="102" viewBox="0 0 58 102" fill="none" xmlns="http://www.w3.org/2000/svg" className='up-arrow-icon'>
        <path fillRule="evenodd" clipRule="evenodd" d="M26.3697 1.06215C26.7055 0.725462 27.1045 0.458339 27.5437 0.276078C27.9829 0.0938172 28.4538 0 28.9293 0C29.4049 0 29.8758 0.0938172 30.315 0.276078C30.7542 0.458339 31.1532 0.725462 31.489 1.06215L56.7965 26.3697C57.3035 26.8753 57.6488 27.5201 57.7889 28.2222C57.9289 28.9244 57.8573 29.6523 57.5831 30.3138C57.309 30.9752 56.8446 31.5403 56.2488 31.9375C55.6531 32.3346 54.9529 32.546 54.2369 32.5447H36.1601V94.0058C36.1601 95.9235 35.3983 97.7627 34.0422 99.1187C32.6862 100.475 30.8471 101.237 28.9293 101.237C27.0116 101.237 25.1725 100.475 23.8165 99.1187C22.4604 97.7627 21.6986 95.9235 21.6986 94.0058V32.5447H3.62183C2.90584 32.546 2.20559 32.3346 1.60986 31.9375C1.01413 31.5403 0.549737 30.9752 0.275566 30.3138C0.00139523 29.6523 -0.0702112 28.9244 0.0698246 28.2222C0.20986 27.5201 0.555231 26.8753 1.06215 26.3697L26.3697 1.06215Z" fill="#1B1B2E"/>
        </svg>

        <p>enter a country here!</p>
      </div>

      <footer>
        <p> powered by https://openweathermap.org/ © 2012</p>
      </footer>
    </>


  );
}

export default App;
