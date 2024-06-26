import React, { Component } from 'react'
import './Weather.css'
import axios from 'axios'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
const API_KEY = 'fd9fbfc85428b4e61d69f93af731a947'
export class Weather extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         city:'',
         weather:null
      }
    }
   
    Handler=(event)=>{
        const {name,value} = event.target
        this.setState({[name]:value})
    }
    getWeatherData=(event)=>{
        if(event){
            event.preventDefault()
        }
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${API_KEY}`)
        .then((response) => {
          console.log(response.data);
          this.setState({ weather: response.data });
        })
        .catch((error) => {
          alert(`Error fetching weather data: ${this.state.city}`);
        });
       

    }
    getIcon = (weatherMain) => {
        switch (weatherMain) {
          case 'Clear':
            return clear_icon;
          case 'Clouds':
            return cloud_icon;
          case 'Drizzle':
            return drizzle_icon;
          case 'Rain':
            return rain_icon;
          case 'Snow':
            return snow_icon;
          case 'Wind':
            return wind_icon;
          default:
            return clear_icon;
        }
    }
  render() {
        let {weather} = this.state
    return (
      <div className='weather'>
        <div className='search-bar'>
        <form onSubmit={this.getWeatherData}>
       <input type='text' placeholder='Search' name="city" value={this.state.city} onChange={this.Handler} />
     <img src={search_icon} alt='search'/>
      </form>
      </div>
     {weather ?(
        <>
            <img src={this.getIcon(weather.weather[0].main)} className='weather-icon'/>
            {console.log(weather.weather[0].main)}
            <p className='temperature'>{Math.round(weather.main.temp)}°C</p>
            <p className='location'>{weather.name}</p>
            <div className='weather-data'>
              <div className='col'>
                  <img src={humidity_icon} />
                  <div>
                      <p>{weather.main.humidity}%</p>
                      <p>Humidity</p>
                  </div>
              </div>
              <div className='col'>
                  <img src={wind_icon} />
                  <div>
                      <p>{weather.wind.speed} km/h</p>
                      <p>wind Speed</p>
                  </div>
              </div>
             
            </div>
            </>
     ):(
        <>
        <p>No Data Availbale</p>
        </>
     )}
    </div>
    )
  }
}

export default Weather
