import { useState, useEffect } from 'react'
import './index.css'
import { Weather } from './Components/Today'
import { DayTemperatureMinMax } from './Components/Today'
import { DayTemperatureMinMaxContainer } from './Components/Today'
import { Hour } from './Components/Today'
import { Hours } from './Components/Today'

function Yesterday({yesterdayWeather}) {
    return(
        <section className="yesterday_weather">
            <span className="day">Yesterday</span>
            <DayTemperatureMinMaxContainer 
            dayTemperatureMin={yesterdayWeather.temperature_2m_min}
            dayTemperatureMax={yesterdayWeather.temperature_2m_max}/>
            <Weather weatherCode={yesterdayWeather.weather_code} />
            <Hours hours={yesterdayWeather.hours}/>
        </section>
    )
}

export default Yesterday;