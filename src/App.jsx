import React, { Component } from 'react'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Profile from './Components/Profile/Profile'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
let routers = createBrowserRouter([
  {path:'/',element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path:'home',element:<Home/>},
    {path:'profile',element:<Profile/>}
  ]}
])


export default class App extends Component {

 
  render() {
    return (
      <>
      <RouterProvider router={routers}/>
      {/* <Navbar/>
      <Home/>
      <Footer/> */}

      </>
    )
  }
}
