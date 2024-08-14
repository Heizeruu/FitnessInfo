import React from 'react'
import './App.css'
import Home from './Components/Hero/Home'
import Navbar from './Components/Navbar/Navbar'
import NutritionInfo from './Components/Nutrition/NutritionInfo'
import Contact from './Components/Contact/Contact'




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