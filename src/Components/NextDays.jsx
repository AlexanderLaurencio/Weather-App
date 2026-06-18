import { useState } from 'react'
import { useEffect } from 'react'
import '../index.css'
import { DayTemperatureMinMaxContainer } from "./Today";
import { DayTemperatureMinMax } from "./Today";

export function NextDay({nextDay}) {
    return(
        <article className="next_day">
            <h3 className="next_day_name">{String(nextDay.dayName)}</h3>
            <div className="next_day_subcontainer">
                <section className="next_day_temperature">
                <h4 className="next_day_temperature_type">
                    min temperature
                </h4>
                <p className="next_day_temperature_minmax">{nextDay.min_temperature}</p>
                </section>
                <section className="next_day_temperature">
                    <h4 className="next_day_temperature_type">
                        max temperature
                    </h4>
                    <p className="next_day_temperature_minmax">{nextDay.max_temperature}</p>
                </section>
            </div>
            <span className="next_day_precipitation_probilities">
                🌧{nextDay.precipitation_probability_max}%
            </span>
        </article>
    )
}

function NextDays({nextDays}) {
    return(
        <section className="next_days">
            {nextDays.map(nd => {
                return(
                    <NextDay nextDay={nd} key={nd.dayId}/>
                )
            })}
        </section>
    )
};

export default NextDays;