import { useState } from 'react'
import { useEffect } from 'react'
import '../index.css'

export function Weather({weatherCode}) {
    return(
        <h2 className="weather">
            <span className="weather_name">{weatherCode.name}</span>
            <span className="weather_emoji">{weatherCode.emoji}</span>
        </h2>
    )
}

export function DayTemperatureMinMax({dayTemperatureType, dayTemperature}) {
    return(
        <article className="day_temperature_minmax">
            <h3 className="day_temperature">
                {dayTemperatureType} temperature
            </h3>
            <p className="day_temperature_type">
                {dayTemperature}
            </p>
        </article>
    )
};

export function DayTemperatureMinMaxContainer({dayTemperatureMin, dayTemperatureMax}) {
    return(
        <div className="day_temperatures_minmax_container">
                <DayTemperatureMinMax dayTemperatureType="min" dayTemperature={dayTemperatureMin} />
                <DayTemperatureMinMax dayTemperatureType="max" dayTemperature={dayTemperatureMax} />
            </div>
    )
}


export function CurrentTime() {
    let [currentTime, setcurentTime] = useState({hour: "00",minutes: "00",seconds: "00"})
    const date = new Date();
    useEffect(() => {
        const id = setInterval(() => {
            setcurentTime({hour: date.getHours(), minutes: date.getMinutes(), seconds: date.getSeconds()})
        },1000)
        return () => clearInterval(id)
    },[currentTime])
    return(
        <span className="current_time">
            {String(currentTime.hour).length === 1 ? "0" + currentTime.hour : currentTime.hour}:
            {String(currentTime.minutes).length === 1 ? "0" + currentTime.minutes : currentTime.minutes}:
            {String(currentTime.seconds).length === 1 ? "0" + currentTime.seconds : currentTime.seconds}
            {currentTime.hour <= 12 ? "AM" : "PM"}
        </span>
    )
};

export function Hour({hour}) {
    return(
            <article className="hour">
                <h3 className="hour_time">
                    {String(hour.time).slice(-5)}
                    {Number(String(hour.time).slice(-5).slice(0,2)) <= 12 ? "AM" : "PM"}
                </h3>
                <p className="hour_precipitation_probability">🌧{hour.precipitation_probability}%</p>
            </article>
    )
}

export function Hours({hours}) {
    return(
        <div className="hours_container">
            {hours.map(h => {
            return <Hour hour={h} key={Number(h.time.slice(-5).slice(0,2))}/>
        })}
        </div>
    )
};


function Today({todayWeather}) {
    return(
        <main>
            <span className="day">Today</span>
            <h1>
                <span className="temperature">
                    {todayWeather.temperature}
                </span>
                <span className="feels_like">Feels like</span>
                <span className="apparent_temperature">
                    {todayWeather.apparent_temperature}
                </span>
            </h1>
            <Weather weatherCode={todayWeather.weather_code} />

            <DayTemperatureMinMaxContainer 
            dayTemperatureMin={todayWeather.temperature_2m_min} 
            dayTemperatureMax={todayWeather.temperature_2m_max}/>
            
            <CurrentTime />
            <Hours hours={todayWeather.hours}/>
        </main>
    )
};

export default Today;