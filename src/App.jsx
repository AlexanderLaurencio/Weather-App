import { useState, useEffect } from 'react'
import './index.css'
import {Routes, Route} from 'react-router'
import Today from './Components/Today.jsx';
import { getGeolocation } from './getGeolocation.js';
import Yesterday from './Components/Yesterday.jsx';
import NextDays from './Components/NextDays.jsx';

function App() {
  let [weather, setWeather] = useState(null);
    useEffect(() => {
        const loadWeather = async () => {
            const weatherData = await getGeolocation();
            setWeather(weatherData);
        };
        loadWeather();
        const id = setInterval(() => {
            loadWeather();
        },54000);
        clearInterval(id);
    },[]);
return (
    <>
        {weather 
        ? (
            <>
                <Today todayWeather={weather.today}/> 
                <Yesterday yesterdayWeather={weather.yesterday}/>
                <NextDays nextDays={weather.next_days}/>
            </>
        )
        : <h1>Fetching data...</h1>
        }
    </>
  )

};

export default App;
