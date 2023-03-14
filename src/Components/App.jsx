import React, { Component } from 'react'
import Footer from './Footer/Footer'
import Home from './Home/Home'
import Navbar from './Navbar/Navbar'




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
