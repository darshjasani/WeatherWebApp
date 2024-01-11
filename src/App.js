import React, { useEffect } from 'react'
import './App.css'
import SearchIcon from '@mui/icons-material/Search';
const App = ()=>{
  useEffect(()=>{
  })
  return (
    <>
      <div className='buttons'>
        
        <div className='search'>
          <SearchIcon/>
          <input type='text'></input>
          <button>Search</button>
        </div>

        <div className='current'></div>
      </div>

      <div className='title'>Weather App</div>

      <div className='container'>
          <div className='card'>

          </div>
      </div>
    </>
  )
}

export default App