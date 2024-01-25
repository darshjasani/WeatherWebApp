import React, { useEffect, useState } from 'react'
import './App.css'
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import axios from 'axios';
import Loader from './Loader';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import LightModeIcon from '@mui/icons-material/LightMode';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
const App = ()=>{
  const [city, setCity] = useState('Vadodara');
  const [position, setPosition] = useState({latitude : 22.3, longitude : 73.2});
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const YOUR_API_KEY = '138c891aa2de594e179138288248aa9b'

  const fecthDataviaCity = async()=>{
    try{
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?appid=${YOUR_API_KEY}&q=${city}&units=metric`
      );
      setData(response.data);
      console.log(response.data);
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  const fecthDataviaCoord = async() =>{
    try{
      const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${YOUR_API_KEY}&lat=${position.latitude}&lon=${position.longitude}&units=metric`
        )
      setData(response.data);
    }catch(error){
      console.error(error);
    }finally{
      setLoading(false);
    }
  }

  const fecthData = (e)=>{
    if(e.code == "Enter"){
      setCity(e.target.value);
      fecthDataviaCity();
    }
  }

  useEffect(()=>{
    getCurrentLocation();
    fecthDataviaCoord();
  },[])
  useEffect(()=>{
    //fecthDataviaCity();
    //fecthDataviaCoord();
  },[position])

  const getCurrentLocation = () =>{
    if( "geolocation" in navigator){
      navigator.geolocation.getCurrentPosition((pos)=>{
        setPosition({
          latitude : pos.coords.latitude,
          longitude : pos.coords.longitude
        });
      });

    }else{
      console.log("Geolcation not available in your browser.");
    }
  }
  // return (
  //   <>

  //     {data == null ? (<Loader/>) : (
  //       <>
  //       <div>
  //         <div className='buttons'>
            
  //           <div className='current'>
  //               <button onClick={getCurrentLocation}>
  //                 <div className='div1'> <MyLocationIcon/></div>
  //                 <div className='div2'> Current Location</div>
  //               </button>
  //           </div>

  //           <div className='search'>
  //             <input type='text' placeholder='Search Location'onChange={fecthData} ></input>
  //             <button type='submit' onClick={fecthDataviaCity}><SearchIcon/></button>
  //           </div> 

  //         </div>
  //       </div>

  //       <div className='title'>Weather App</div>

  //       {data ? (
  //         <div className='container'>
  //           <div className='card'>
  //               <div className='weatherIcon'>
  //                       <img src="https://ssl.gstatic.com/onebox/weather/64/sunny.png" />
  //               </div>

  //               <div className='temp'>
  //                 {data ? (<div>{data.name} {data.main.temp}</div>) : ('16C') }
  //               </div>

  //               <div className='loc'>
  //                 Long Beach
  //               </div>
  //           </div>
  //       </div>
  //       ) : (
  //         <Loader/>
  //       )}
  //     </>
  //     )} 
  //     </>
  // )

  return (
    <>
      {data == null ? <Loader/> : (
        <>
      <div className='name'>{data.name} Weather Forecast</div>
      <div className='container'>
        <div className='left'>
            <img src = "https://ssl.gstatic.com/onebox/weather/64/sunny.png" />
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
              <input type='text' placeholder='Enter City Name' onKeyDown={fecthData}/>
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
                          <div className='temp3'>{data.main.humidity}<span>%</span></div>
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
                          <div className='temp3'>{data.clouds.all}<span>%</span></div>
                        </div>
                        <div>
                          <FilterDramaIcon style={{color:'rgb(56, 131, 243)'}}/>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='leftPart3'>
                        <div>
                          <div className='desc3'>Sunrise</div>
                          <div className='temp3'>{new Date(data.sys.sunrise * 1000).toLocaleTimeString().slice(0,4)} <span>AM</span></div>
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
                          <div className='temp3'>{new Date(data.sys.sunset * 1000).toLocaleTimeString().slice(0,4)} <span>PM</span></div>
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
    </>
      )}
    </>
  )
}

export default App