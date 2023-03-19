import React from 'react'
import Home from './Components/Home/Home'
import Profile from './Components/Profile/Profile'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import jwtDecode from 'jwt-decode'

export default function App () {
 

  function saveUserData()
  {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    
   
    localStorage.setItem('username',decodedToken.Name)
    localStorage.setItem('password',decodedToken.Password)
    localStorage.setItem('email',decodedToken.email)
    localStorage.setItem('phonenumber',decodedToken.phonenumber)
    
  }

  let routers = createBrowserRouter([
    {path:'/',element:<Layout />,children:[
      {index:true,element:<Home saveUserData={saveUserData}/>},
      {path:'home',element:<Home saveUserData={saveUserData}/>},
      {path:'profile',element:<Profile/>}
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
