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
  setTimeout(() => {
    textTemperature.classList.remove(...textTemperature.classList);
  }, 1000);

 } else if (temperatureNumber > -10 && temperatureNumber <= 0 ){
  textTemperature.classList.add("chill");
  setTimeout(() => {
    textTemperature.classList.remove(...textTemperature.classList);
  }, 1000);

 } else if (temperatureNumber > 0 && temperatureNumber <= 4 ){
  textTemperature.classList.add("fridge");
  setTimeout(() => {
    textTemperature.classList.remove(...textTemperature.classList);
  }, 1000);

 } else if (temperatureNumber > 4 && temperatureNumber <= 15 ){
  textTemperature.classList.add("okay");
  setTimeout(() => {
    textTemperature.classList.remove(...textTemperature.classList);
  }, 1000);

 } else if (temperatureNumber > 15 && temperatureNumber <= 25 ){
  textTemperature.classList.add("warm");
  setTimeout(() => {
    textTemperature.classList.remove(...textTemperature.classList);
  }, 1000);

 } else if (temperatureNumber > 25 && temperatureNumber <= 30 ){
  textTemperature.classList.add("hot");
  setTimeout(() => {
    textTemperature.classList.remove(...textTemperature.classList);
  }, 1000);

  } else if (temperatureNumber > 30){
  textTemperature.classList.add("very_hot");
  setTimeout(() => {
    textTemperature.classList.remove(...textTemperature.classList);
  }, 1000);
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

      <svg width="50" height="50" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" id='question-icon'>
      <g clipPath="url(#clip0_306_13)">
      <path fillRule="evenodd" clipRule="evenodd" d="M75 37.5C75 47.4456 71.0491 56.9839 64.0165 64.0165C56.9839 71.0491 47.4456 75 37.5 75C27.5544 75 18.0161 71.0491 10.9835 64.0165C3.95088 56.9839 0 47.4456 0 37.5C0 27.5544 3.95088 18.0161 10.9835 10.9835C18.0161 3.95088 27.5544 0 37.5 0C47.4456 0 56.9839 3.95088 64.0165 10.9835C71.0491 18.0161 75 27.5544 75 37.5ZM30.8036 28.125C30.8036 26.8006 31.1963 25.5059 31.9321 24.4047C32.6679 23.3034 33.7138 22.4451 34.9374 21.9383C36.161 21.4315 37.5074 21.2989 38.8064 21.5572C40.1054 21.8156 41.2986 22.4534 42.2351 23.3899C43.1716 24.3264 43.8094 25.5196 44.0678 26.8186C44.3261 28.1176 44.1935 29.464 43.6867 30.6876C43.1799 31.9112 42.3216 32.9571 41.2203 33.6929C40.1191 34.4287 38.8244 34.8214 37.5 34.8214C36.4344 34.8214 35.4124 35.2447 34.6589 35.9982C33.9055 36.7517 33.4821 37.7737 33.4821 38.8393V42.3C33.4821 43.3656 33.9055 44.3876 34.6589 45.1411C35.4124 45.8945 36.4344 46.3179 37.5 46.3179C38.5656 46.3179 39.5876 45.8945 40.3411 45.1411C41.0945 44.3876 41.5179 43.3656 41.5179 42.3C44.1565 41.5534 46.5345 40.0854 48.3843 38.0611C50.2342 36.0369 51.4827 33.5367 51.9892 30.8416C52.4958 28.1466 52.2404 25.3637 51.2517 22.8059C50.2631 20.2481 48.5804 18.0169 46.3929 16.3632C44.2055 14.7095 41.6 13.6989 38.8696 13.445C36.1391 13.1912 33.392 13.7042 30.9372 14.9263C28.4824 16.1485 26.4173 18.0313 24.974 20.363C23.5308 22.6947 22.7668 25.3828 22.7679 28.125C22.7679 29.1906 23.1912 30.2126 23.9447 30.9661C24.6982 31.7195 25.7201 32.1429 26.7857 32.1429C27.8513 32.1429 28.8733 31.7195 29.6268 30.9661C30.3803 30.2126 30.8036 29.1906 30.8036 28.125ZM42.8571 56.25C42.8571 57.6708 42.2927 59.0334 41.2881 60.0381C40.2834 61.0427 38.9208 61.6071 37.5 61.6071C36.0792 61.6071 34.7166 61.0427 33.7119 60.0381C32.7073 59.0334 32.1429 57.6708 32.1429 56.25C32.1429 54.8292 32.7073 53.4666 33.7119 52.4619C34.7166 51.4573 36.0792 50.8929 37.5 50.8929C38.9208 50.8929 40.2834 51.4573 41.2881 52.4619C42.2927 53.4666 42.8571 54.8292 42.8571 56.25Z" fill="#D6D6DD"/>
      </g>
      <defs>
      <clipPath id="clip0_306_13">
      <rect width="75" height="75" fill="white"/>
      </clipPath>
      </defs>
      </svg>

      </header>



      <section id="weather-box" className='weather-box'>
        <div className="weather-box_header">
          <OutputLabel name="country" text={pickedCountry}/>
        </div>

        <div className='weather-box_main'>
          <OutputLabel name="weather" text={pickedWeather}/>
          <OutputLabel name="temperature" text={pickedTemperature}/>
        </div>
      </section>

      <div id='tutorial-text-container'>
        <svg width="58" height="102" viewBox="0 0 58 102" fill="none" xmlns="http://www.w3.org/2000/svg" className='up-arrow-icon'>
        <path fillRule="evenodd" clipRule="evenodd" d="M26.3697 1.06215C26.7055 0.725462 27.1045 0.458339 27.5437 0.276078C27.9829 0.0938172 28.4538 0 28.9293 0C29.4049 0 29.8758 0.0938172 30.315 0.276078C30.7542 0.458339 31.1532 0.725462 31.489 1.06215L56.7965 26.3697C57.3035 26.8753 57.6488 27.5201 57.7889 28.2222C57.9289 28.9244 57.8573 29.6523 57.5831 30.3138C57.309 30.9752 56.8446 31.5403 56.2488 31.9375C55.6531 32.3346 54.9529 32.546 54.2369 32.5447H36.1601V94.0058C36.1601 95.9235 35.3983 97.7627 34.0422 99.1187C32.6862 100.475 30.8471 101.237 28.9293 101.237C27.0116 101.237 25.1725 100.475 23.8165 99.1187C22.4604 97.7627 21.6986 95.9235 21.6986 94.0058V32.5447H3.62183C2.90584 32.546 2.20559 32.3346 1.60986 31.9375C1.01413 31.5403 0.549737 30.9752 0.275566 30.3138C0.00139523 29.6523 -0.0702112 28.9244 0.0698246 28.2222C0.20986 27.5201 0.555231 26.8753 1.06215 26.3697L26.3697 1.06215Z" fill="#1B1B2E"/>
        </svg>

        <p>enter a country here!</p>
      </div>
    </>


  );
}

export default App;
