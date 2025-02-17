import  { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './NavBar'
import Rsvp from './components/rsvp/Rsvp'
import Countdown from './components/countdown/Countdown'
import Header from './components/Header/Header'

function App() {
  const [count, setCount] = useState(0)



  return (
    <>
        <NavBar/>

        <Header/>

        <Countdown/>

        <Rsvp/>
      
    </>
  )
}

export default App
