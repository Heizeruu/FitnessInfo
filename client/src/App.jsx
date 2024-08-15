import React from 'react'
import './App.css'
import Home from './Components/Hero/Home'
import Navbar from './Components/Navbar/Navbar'
import NutritionInfo from './Components/Nutrition/NutritionInfo'
import Contact from './Components/Contact/Contact'
import LogInSignUp from './Components/LoginSignUp/LogInSignUp'
import {BrowserRouter} from "react-router-dom"

ReactDom.createRoot(document.getElementbyId())



const App = () => {
  return (
    <>
    <Navbar/>
    <Home/>
    <NutritionInfo/>
    <Contact/>
    </>
  )
}

export default App