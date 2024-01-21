import React, { useEffect, useState } from 'react'
import './App.css'
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import axios from 'axios';
import Loader from './Loader';
const App = ()=>{
  const [city, setCity] = useState('');
  const [position, setPosition] = useState({latitude : null, longitude : null});
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const YOUR_API_KEY = '138c891aa2de594e179138288248aa9b'

  const fecthDataviaCity = async()=>{

    try{
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?appid=${YOUR_API_KEY}&q=${city}&units=metric`
      );

      setData(response.data);
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
    setCity(e.target.value);
  }

  useEffect(()=>{
    getCurrentLocation();
  },[])

  useEffect(()=>{
    fecthDataviaCoord();
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
      <div className='container'>
        <div className='left'>
            <img src = "https://ssl.gstatic.com/onebox/weather/64/sunny.png" />
            <div className='temp'>
              <div className='number'>25</div>
              <div className='deg'>&deg;C</div>
            </div>
            <div className='desc'>light rain</div>
        </div>

        <div className='right'>

            <div className='part1'>
              <div className='week'>Sunday,</div>
              <div className='date'>&nbsp;21 January</div>
            </div>

            <div className='part2'>
              <input type='text' placeholder='Enter City Name'/>
            </div>

            <div className='part3'>
              <div className='row1'>
                <div className='col1'>
                  <div>
                      <div>a</div>
                      <div>b</div>
                  </div>
                  <div>
                      abc
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default App