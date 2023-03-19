import React, { Component, useState } from 'react'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Profile from './Components/Profile/Profile'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import jwtDecode from 'jwt-decode'

export default function App () {
  const [userData, setuserData] = useState(null)

  function saveUserData()
  {
    let encodedToken = localStorage.getItem('userToken');
    
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);//
    
    setuserData(decodedToken);
  }

  let routers = createBrowserRouter([
    {path:'/',element:<Layout userData={userData}/>,children:[
      {index:true,element:<Home saveUserData={saveUserData}/>},
      {path:'home',element:<Home saveUserData={saveUserData}/>},
      {path:'profile',element:<Profile userData={userData}/>}
    ]}
  ])
 
    return (
      <>
      <RouterProvider router={routers}/>
      {/* <Navbar/>
      <Home/>
      <Footer/> */}

      </>
    )
  
}
