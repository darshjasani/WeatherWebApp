import React, { useEffect } from 'react'
import './App.css'
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
const App = ()=>{
  useEffect(()=>{
  })
  return (
    <>
      <div className='buttons'>
        
        <div className='current'>
            <button>
              <div className='div1'> <MyLocationIcon/></div>
              <div className='div2'> Current Location</div>
            </button>
        </div>

        <div className='search'>
          <input type='text' placeholder='Search Location'></input>
          <SearchIcon/>
        </div>

        

      </div>

      <div className='title'>Weather App</div>

      <div className='container'>
          <div className='card'>
              <div className='weatherIcon'>
                      <img src="https://ssl.gstatic.com/onebox/weather/64/sunny.png" />
              </div>

              <div className='temp'>
                16C
              </div>

              <div className='loc'>
                Long Beach
              </div>
          </div>
      </div>
    </>
  )
}

export default App