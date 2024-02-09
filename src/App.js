import React, { useEffect, useState } from 'react'
import './App.css'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import axios from 'axios';
import Loader from './Loader';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import LightModeIcon from '@mui/icons-material/LightMode';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import SearchIcon from '@mui/icons-material/Search';

const App = ()=>{
  const [city, setCity] = useState('Long Beach');
  const [position, setPosition] = useState({latitude : null, longitude : null});
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(true);
  const YOUR_API_KEY = '138c891aa2de594e179138288248aa9b'

  const fecthDataviaCity = async()=>{
    try{
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?appid=${YOUR_API_KEY}&q=${city}&units=metric`
      );
      setData(response.data);
      setPosition({
        latitude : response.data.coord.lat,
        longitude: response.data.coord.lon
      });
      setLoader(false);
    }catch(error){
      alert('Please enter correct city!!');
      setLoader(false);
    }
  }

  const fecthDataviaCoord = async() =>{
    
    try{
      const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${YOUR_API_KEY}&lat=${position.latitude}&lon=${position.longitude}&units=metric`
        )
      setData(response.data);
      setCity(response.data.name);
      setLoader(false);
    }catch(error){
      console.error(error);
      setLoader(false);
    }
  }

  const fecthData = (e)=>{
    if(e.code == "Enter"){
      setCity(e.target.value);
    }
  }

  useEffect(()=>{
    fecthDataviaCity();
  },[]);

  useEffect(()=>{
    setLoader(true);
    fecthDataviaCity();
  },[city]);

  useEffect(()=>{
    setLoader(true);
    fecthDataviaCoord();
  },[position]);

  const getImgLink = ()=>{
    let str = data.weather[0].main;
    switch(str){
      case 'Clear':
        return 'https://cdn-icons-png.flaticon.com/128/4814/4814268.png';
      case 'Clouds':
        return 'https://cdn-icons-png.flaticon.com/128/414/414927.png';
      case 'Rain':
        return 'https://cdn-icons-png.flaticon.com/128/4088/4088981.png';
      case 'Drizzle':
        return 'https://cdn-icons-png.flaticon.com/128/9231/9231646.png';
      case 'Thunderstorm':
        return 'https://cdn-icons-png.flaticon.com/128/2864/2864448.png';
      case 'Snow':
        return 'https://cdn-icons-png.flaticon.com/128/2315/2315309.png';
      case 'Mist':
        return 'https://cdn-icons-png.flaticon.com/128/4005/4005817.png';
      case 'Fog':
        return 'https://cdn-icons-png.flaticon.com/128/7774/7774309.png';
      default:
        return 'https://cdn-icons-png.flaticon.com/128/4814/4814489.png';

    }
  }
  const getCurrentLocation = () =>{
    setLoader(true);
    if( "geolocation" in navigator){
      navigator.geolocation.getCurrentPosition((pos)=>{
        setPosition({
          latitude : pos.coords.latitude,
          longitude : pos.coords.longitude
        });
        setLoader(false);
      }, (error)=>{
        if (error.code === error.PERMISSION_DENIED) {
          alert('Please allow access to your location.');
        }
      });

    }else{
      console.log("Geolcation not available in your browser.");
    }
  }
  return (
    <>
      {loader ? <Loader/> : (
        <>
      <div className='name'>{data.name} Weather Forecast</div>
      <div className='container'>
        <div className='left'>
            <img src = {getImgLink()} />
            <div className='temp'>
              <div className='number'>{data.main.temp}</div>
              <div className='deg'>&deg;C</div>
            </div>
            <div className='desc'>{data.weather[0].main}</div>
        </div>

        <div className='right'>

            <div className='part1'>
              <div className='week'>{new Date().toLocaleDateString('en-US',{weekday:'long'})},</div>
              <div className='date'>&nbsp;{new Date().toLocaleDateString('en-US',{day:'numeric', month:'long'})}</div>
            </div>

            <div className='part2'>
              <input type='text' placeholder='Enter City Name'  onKeyDown={fecthData}/>
              <button onClick={getCurrentLocation}> Current Location</button>
            </div>

            <div className='part3'>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className='leftPart3'>
                        <div>
                          <div className='desc3'>Feels like</div>
                          <div className='temp3'>{data.main.feels_like} <span>&deg;C</span></div>
                        </div>
                        <div>
                          <DeviceThermostatIcon style={{color:'orange'}}/>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='leftPart3'>
                          <div>
                            <div className='desc3'>Wind</div>
                            <div className='temp3'>{data.wind.speed} <span>m/s</span></div>
                          </div>
                          <div>
                            <AirIcon style={{color:'rgb(73, 141, 243)'}}/>
                          </div>
                        </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='leftPart3'>
                        <div>
                          <div className='desc3'>Humidity</div>
                          <div className='temp3'>{data.main.humidity}&nbsp;<span>%</span></div>
                        </div>
                        <div>
                          <InvertColorsIcon style={{color:'rgb(56, 131, 243)'}}/>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='leftPart3'>
                        <div>
                          <div className='desc3'>Clouds</div>
                          <div className='temp3'>{data.clouds.all}&nbsp;<span>%</span></div>
                        </div>
                        <div>
                          <FilterDramaIcon style={{color:'rgb(56, 131, 243)', paddingRight:'3px'}}/>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='leftPart3'>
                        <div>
                          <div className='desc3'>Sunrise</div>
                          <div className='temp3'>{new Date(((data.sys.sunrise + (new Date().getTimezoneOffset() * 60) + data.timezone)) * 1000).toLocaleTimeString().slice(0,4)} <span>AM</span></div>
                        </div>
                        <div>
                          <LightModeIcon style={{color:'rgb(243, 155, 48)'}}/>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='leftPart3'>
                        <div>
                          <div className='desc3'>Sunset</div>
                          <div className='temp3'>{new Date(((data.sys.sunset + (new Date().getTimezoneOffset() * 60) + data.timezone)) * 1000).toLocaleTimeString().slice(0,4)} <span>PM</span></div>
                        </div>
                        <div>
                          <WbTwilightIcon style={{color:'rgb(243, 155, 48)'}}/>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      </div>

      <div className='mobile'>
        <div className='inputM'>
          <div className='dayInfo'>
            <div>{new Date().toLocaleDateString('en-US',{weekday:'long'})},</div>
            <div>&nbsp;{new Date().toLocaleDateString('en-US',{day:'numeric', month:'long'})}</div>
          </div>

          <div className='input'>
            <input type='text' placeholder='Enter City Name' onKeyDown={fecthData}></input>
            <button onClick={fecthData}><SearchIcon/></button>
          </div>
          
        </div>

        <div className='tempInfo'>
            <img src = {getImgLink()} />
            <div>
              <div className='temp'>{data.main.temp} <span>&deg;C</span></div>
              <div className='desc'>{data.weather[0].main}</div>
            </div>
          <div>
          </div>
        </div>

        <div className='detailM'>
          <div className='one'>
              <div>
                <div className='desc3'>Feels like</div>
                <div className='temp3'>{data.main.feels_like} <span>&deg;C</span></div>
              </div>
              <div>
                <DeviceThermostatIcon style={{color:'orange'}}/>
              </div>
          </div>
          <div className='two'>
              <div>
                <div className='desc3'>Wind</div>
                <div className='temp3'>{data.wind.speed} <span>m/s</span></div>
              </div>
              <div>
                <AirIcon style={{color:'rgb(73, 141, 243)'}}/>
              </div>
          </div>
          <div className='three'>
            <div>
              <div className='desc3'>Humidity</div>
              <div className='temp3'>{data.main.humidity}&nbsp;<span>%</span></div>
            </div>
            <div>
              <InvertColorsIcon style={{color:'rgb(56, 131, 243)'}}/>
            </div>
          </div>
          <div className='four'>
            <div>
              <div className='desc3'>Clouds</div>
              <div className='temp3'>{data.clouds.all}&nbsp;<span>%</span></div>
            </div>
            <div>
              <FilterDramaIcon style={{color:'rgb(56, 131, 243)', paddingRight:'3px'}}/>
            </div>
          </div>
          <div className='five'>
            <div>
              <div className='desc3'>Sunrise</div>
              <div className='temp3'>{new Date(((data.sys.sunrise + (new Date().getTimezoneOffset() * 60) + data.timezone)) * 1000).toLocaleTimeString().slice(0,4)} <span>AM</span></div>
            </div>
            <div>
              <LightModeIcon style={{color:'rgb(243, 155, 48)'}}/>
            </div>
          </div>
          <div className='six'>
              <div>
                <div className='desc3'>Sunset</div>
                <div className='temp3'>{new Date(((data.sys.sunset + (new Date().getTimezoneOffset() * 60) + data.timezone)) * 1000).toLocaleTimeString().slice(0,4)} <span>PM</span></div>
              </div>
              <div>
                <WbTwilightIcon style={{color:'rgb(243, 155, 48)'}}/>
              </div>
          </div>
          </div>
      </div>
    </>
      )}
    </>
  )
}

export default App