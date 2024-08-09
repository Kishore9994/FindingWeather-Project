import { useEffect, useState } from 'react'
import "./App.css"

// Images
import searchIcon from './assets/search.png'
import drizzleIcon from './assets/drizzle.png'
import rainyIcon from './assets/rainy.png'
import cloudyIcon from './assets/cloudy.png';
import humidityIcon from './assets/humidity.png';
import snowIcon from './assets/snow.png';
import sunIcon from './assets/sun.png';
import windyIcon from './assets/windy.png';

// weather detailes components
const WeatherDetailes =({ icon , temp, city, country, lat, log, humidity, windy}) => {
  
  return(
    <>
  <div className='image'>
    <img src={icon} alt="Image" />
  </div>

  <div className='temp'>{temp}℃</div>
  <div className='location'>{city}</div>
  <div className='country'>{country}</div>
  
 <div  className='cord'>
  <div>
    <span className='lat'>Latitude</span>
    <span>{lat}</span>
  </div>

  <div>
    <span className='log'>Longitude</span>
    <span>{log}</span>
  </div>
 </div>

 <div className='data-container'>

  <div className='element'>

    <img src={humidityIcon} alt="humidity" className='icon' />

    <div className='data'>
      <div className='humidity-percent'>{humidity}%</div>
      <div className='text'> Humidity</div>
    </div>
    
  </div>

  <div className='element'>

    <img src={windyIcon} alt="wind" className='icon' />

    <div className='data'>
      <div className='wind-percent'>{windy} km/h</div>
      <div className='text'> Wind Speed</div>
    </div>
    
  </div>

  
 </div>
  </>
  )
}

``

// main app
function App() {
  const [icon,setIcon] = useState(snowIcon);
  const [temp,setTemp] = useState(0);
  const [city,setCity] = useState("Chennai");
  const [country,setCountry] = useState("India");
  const [lat,setLat] = useState(0);
  const [log,setlog] = useState(0);
  const [humidity,setHumidity] = useState(0)
  const [windy,setWindy] = useState(0)
  const [text,setText]=useState("Chennai")
  

  const [cityNotFound,setCItyNotFound] = useState(false)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)


//icon kosam thaniga object create chesam
  const weatherIconMap= {
    "01d":sunIcon,
    "01n":sunIcon,
    "02d":cloudyIcon,
    "02n":cloudyIcon,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainyIcon,
    "09n":rainyIcon,
    "10d":rainyIcon,
    "10n":rainyIcon,
    "13d":snowIcon,
    "13n":snowIcon,
 
  }

// async search function
  const search= async()=>{

    setLoading(true);


    let api_key="e752d3ae53165480ec96928b5419a284"
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
  

  try{
    let res = await fetch(url);
    let data = await res.json();
    if(data.cod === "404"){
      console.error("City not found")
      setCItyNotFound(true);
      setLoading(false);
      return
    }

    setHumidity(data.main.humidity);
    setWindy(data.wind.speed);
    setTemp(Math.floor(data.main.temp))
    setCity(data.name)
    setCountry(data.sys.country)
    setLat(data.coord.lat)
    setlog(data.coord.lon)
    
    const weatherIconCode = data.weather[0].icon;
    setIcon(weatherIconMap[weatherIconCode] || sunIcon)

    setCItyNotFound(false)

  } catch(error) {
    console.error("An error occured:",error.message)
    setError("An error occured while fecthing weather data.")
  } finally {
    setLoading(false)
  }


  };  

  const handleCIty=(e)=>{
    setText(e.target.value) //this function is use handle Text
  }


  const handleKeyDown=(e)=>{
    if (e.key === "Enter"){  // this function is use to search once click enter button
      search()
    }
  }

  useEffect(function(){    // search function call avvali so ee func
  },[])
   return (
    <>
      <div className="container">

        <div className='input-container'>

          <input type="text"
           className='cityInput' 
           placeholder='Search City'
           onChange={handleCIty}
           value={text}
           onKeyDown={handleKeyDown}
           />

          <div className='search-icon' onClick={() =>search()} >
          <img src={searchIcon}alt="Search" />

        </div>
        </div>

        {loading && <div className='loading-message'>Loading...</div>} 
       {error && <div className='erroe-message'>{error}</div>}
       {cityNotFound && <div className='city-not-found'>City not found</div>}
        
        {! loading && ! cityNotFound &&<WeatherDetailes icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} windy={windy}/>}
        <p className='copyright'>
          Designed by <span>Kishore</span>
        </p>
      </div>
      
    </>
  )
}

export default App;
