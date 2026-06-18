const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satuday",
    "Sunday"
  ];

const weatherCodes = Object.freeze({
  0: {
    name: "Clear sky",
    emoji: "☀️"
  },
  1: {
    name: "Mainly clear",
    emoji: "🌤️"
  },
  2: {
    name: "Partly cloudy",
    emoji: "⛅"
  },
  3: {
    name: "Overcast",
    emoji: "☁️"
  },
  45: {
    name: "Fog",
    emoji: "🌫️"
  },
  48: {
    name: "Depositing rime fog",
    emoji: "🌫️"
  },
  51: {
    name: "Light drizzle",
    emoji: "🌦️"
  },
  53: {
    name: "Moderate drizzle",
    emoji: "🌦️"
  },
  55: {
    name: "Dense drizzle",
    emoji: "🌧️"
  },
  56: {
    name: "Light freezing drizzle",
    emoji: "🧊🌦️"
  },
  57: {
    name: "Dense freezing drizzle",
    emoji: "🧊🌧️"
  },
  61: {
    name: "Slight rain",
    emoji: "🌦️"
  },
  63: {
    name: "Moderate rain",
    emoji: "🌧️"
  },
  65: {
    name: "Heavy rain",
    emoji: "🌧️"
  },
  66: {
    name: "Light freezing rain",
    emoji: "🧊🌦️"
  },
  67: {
    name: "Heavy freezing rain",
    emoji: "🧊🌧️"
  },
  71: {
    name: "Slight snowfall",
    emoji: "🌨️"
  },
  73: {
    name: "Moderate snowfall",
    emoji: "❄️"
  },
  75: {
    name: "Heavy snowfall",
    emoji: "❄️❄️"
  },
  77: {
    name: "Snow grains",
    emoji: "❄️"
  },
  80: {
    name: "Slight rain showers",
    emoji: "🌦️"
  },
  81: {
    name: "Moderate rain showers",
    emoji: "🌧️"
  },
  82: {
    name: "Violent rain showers",
    emoji: "⛈️"
  },
  85: {
    name: "Slight snow showers",
    emoji: "🌨️"
  },
  86: {
    name: "Heavy snow showers",
    emoji: "❄️🌨️"
  },
  95: {
    name: "Thunderstorm",
    emoji: "⛈️"
  },
  96: {
    name: "Thunderstorm with slight hail",
    emoji: "⛈️🧊"
  },
  99: {
    name: "Thunderstorm with heavy hail",
    emoji: "⛈️🧊"
  }
});

export const getGeolocation = () => {
        return new Promise((resolve,reject) => {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&hourly=precipitation_probability&current=temperature_2m,apparent_temperature,weather_code&past_days=1`);
                    if (!response.ok) {
                      throw new Error("Failed while fetching data")
                    }
                    const data = await response.json();
                    resolve(processWeatherData(data));
            },() => reject(Error("Error getting your geolocation")))
        })
};

function processWeatherData(obj) {
        //HERE I ADDED THE PROPERTY YESTERDAY WHICH CONTAINS ALL THE DATA RELATED
        //TO THE WEATHER YESTERDAY
        const yesterday = {};
        yesterday.weather_code = weatherCodes[obj.daily.weather_code[0]];
        yesterday.temperature_2m_max = obj.daily.temperature_2m_max[0];
        yesterday.temperature_2m_min = obj.daily.temperature_2m_min[0];
        yesterday.hours = []; 
        getHours(yesterday,0,23);

        //HERE I ADDED THE PROPERTY TODAY WHICH CONTAINS ALL THE DATA RELATED
        //TO THE WEATHER TODAY
        const today = {};
        today.temperature = obj.current.temperature_2m;
        today.apparent_temperature = obj.current.apparent_temperature;
        today.weather_code = weatherCodes[obj.current.weather_code];
        today.temperature_2m_max = obj.daily.temperature_2m_max[1];
        today.temperature_2m_min = obj.daily.temperature_2m_min[1];
        today.hours = []; 
        getHours(today,24,47);
        
        //HERE I ADDED THE PROPERTY NEXTDAYS WHICH CONTAINS AN ARRAY, THAT CONTAINS
        //DATA RELATED TO THE WEATHER DURING THE NEXT 6 DAYS COUNTING FROM TODAY. EACH DAY IS REPRESENTED
        //AS AN OBJECT

        const next_days = [];
        for (let i = 2; i <= 7; i++) {
            const date = new Date(obj.daily.time[i]);
            const dateName = days[date.getDay()];

            next_days.push({
                dayId: days.indexOf(String(dateName)),
                dayName: dateName,
                min_temperature: obj.daily.temperature_2m_min[i],
                max_temperature: obj.daily.temperature_2m_max[i],
                precipitation_probability_max: obj.daily.precipitation_probability_max[i]
            })
        }
        function getHours(object,indexStart, indexEnd) {
            for (let i = indexStart; i <= indexEnd; i++) {
            object.hours.push({
                time: obj.hourly.time[i], 
                precipitation_probability: obj.hourly.precipitation_probability[i]})
          }
        }
        return {
          yesterday: yesterday,
          today: today,
          next_days: next_days
        }
};
