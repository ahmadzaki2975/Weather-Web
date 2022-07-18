import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { CoordinateCalculation } from './components/CoordinateCalculation'

function App() {
  //* States
  const [location, setLocation] = useState({});

  //* Functions
  function getLocation(foundLocation) { //? Callback function to get the closest city
    setLocation(foundLocation);
  }

  //* Render
  return (
    <div className='App'>
      <header>
        <Navbar />
      </header>
      <main>
        <CoordinateCalculation 
          getLocation={getLocation}
        />
      </main>
    </div>
  )
}

export default App
