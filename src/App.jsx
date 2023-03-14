import React, { Component } from 'react'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'




export default class App extends Component {

 
  render() {
    return (
      <>
      <Navbar/>
      <Home/>
      <Footer/>

      </>
    )
  }
}
