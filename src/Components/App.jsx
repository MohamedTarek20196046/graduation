import React, { Component } from 'react'
import About from './About/About'
import Contacts from './Contacts/Contacts'
import Footer from './Footer/Footer'
import Home from './Home/Home'
import Navbar from './Navbar/Navbar'
import Service from './Service/Service'



export default class App extends Component {

 
  render() {
    return (
      <>
      <Navbar/>
      <Home/>
      <About/>
      <Service/>
      <Contacts/>
      <Footer/>

      </>
    )
  }
}
