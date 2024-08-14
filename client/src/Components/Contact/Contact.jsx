import React from 'react'
import './Contact.css'
import icon from '../../assets/mail.png'

const Contact = () => {
  return (
    <div className='contact'>
        <div className="contact-col">
            <h3>Wag na kayo mag reklamo <img src={icon} alt="" /></h3>
            <p>Kayo na mag code kung gusto niyo.</p>
        </div>
        <ul>
            <li>duquejimson@gmail.com</li>
            <li>Jimson Duque</li>
            <li>Sison</li>
        </ul>
    </div>
  )
}

export default Contact