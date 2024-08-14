import React from 'react'
import './Navbar.css'
import logo from '../../assets/FF.png'


const Navbar = () => {
  return (
    <nav className='container'>
        <img src={logo} alt="" className='logo' />
        <ul>
        <li><button className='btn'>About</button></li>
        <li><button className='btn'>Contact</button></li>
        </ul>
    </nav>
  )
}

export default Navbar