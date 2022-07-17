import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { Weather } from './components/Weather'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <header>
        <Navbar />
      </header>
      <main>
        <Weather />
      </main>
    </div>
  )
}

export default App
