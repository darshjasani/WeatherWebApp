import React, { useEffect, useState } from 'react'
import './App.css'
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import axios from 'axios';
const App = ()=>{
  const [city, setCity] = useState('');
  const [current,setCurrent] = useState(0);
  const [position, setPosition] = useState({latitude : null, longitude : null});
  const [data, setData] = useState(null);
  const YOUR_API_KEY = '138c891aa2de594e179138288248aa9b'
  const fecthData = async() =>{
    try{
      let response = '';
      console.log(current);
      if(current == 1){
        response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${YOUR_API_KEY}&q=${city}&units=metric`
        );
      }
      else{
        response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${YOUR_API_KEY}&lat=${position.latitude}&lon=${position.longitude}&units=metric`
        )
      }
      setData(response.data);
      console.log(response.data);
    }catch(error){
      console.error(error);
    }
  }

  useEffect(()=>{
    //getCurrentLocation();
    fecthData();
  },[]);

  const handleInputChange = (e) => {
    setCurrent(1);
    console.log(e);
    setCity(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fecthData();
  }

  const getCurrentLocation = async() =>{
    
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
    console.log(position);
    setCurrent(0);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='buttons'>
          
          <div className='current'>
              <button onClick={getCurrentLocation}>
                <div className='div1'> <MyLocationIcon/></div>
                <div className='div2'> Current Location</div>
              </button>
          </div>

          <div className='search'>
            <input type='text' placeholder='Search Location' onChange={handleInputChange}></input>
            <button type='submit'><SearchIcon/></button>
          </div> 

        </div>
      </form>

      <div className='title'>Weather App</div>

      {data ? (
        <div className='container'>
          <div className='card'>
              <div className='weatherIcon'>
                      <img src="https://ssl.gstatic.com/onebox/weather/64/sunny.png" />
              </div>

              <div className='temp'>
                {data ? (<div>{data.name} {data.main.temp}</div>) : ('16C') }
              </div>

              <div className='loc'>
                Long Beach
              </div>
          </div>
      </div>
      ) : (
        <div> Loading Weather Application</div>
      )}
    </>
  )
}

export default App