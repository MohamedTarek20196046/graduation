import React, { useEffect, useState, useRef } from 'react'
import styles from './Home.module.css'

export default function Home() {
  const [model, setModel] = useState(false)
  let [logincolor, setLoginColor] = useState(`${styles.loginBtn}`)
  let [registercolor, setRegisterColor] = useState(``)
  let [emailInput, setEmailInput] = useState(`d-none`)
  let [phoneInput, setPhoneInput] = useState(`d-none`)
  let [registerInput, setRegisterInput] = useState(`d-none`)
  let [loginInput, setLoginInput] = useState(`d-inline-block`)
  let [homeBtn, setHomeBtn] = useState(`Join Us`)
  
  let modelRef = useRef()

  const toggleModel = () => {
    setModel(!model)
  }
  useEffect(() => {
    let handler = (e) => {
      if (!modelRef.current.contains(e.target)) {
        console.log(e.target)
        setModel(false)
      }

    }
    document.addEventListener('mousedown', handler)
  })

  function login() {
    setEmailInput(`d-none`)
    setPhoneInput(`d-none`)
    setRegisterInput(`d-none`)
    setLoginInput(`d-inline-block`)
    setLoginColor(`${registercolor}`)
    setRegisterColor(``)
    document.getElementById('welcomeParagraph').innerHTML = `<h3 class="text-center my-2 fs-4">Welcome</h3>
    <p class="hh text-center my-2 fs-4">Login to unlock the power of detection</p>`
  }
  function Register() {
    setEmailInput(`d-block`)
    setPhoneInput(`d-block`)
    setRegisterInput(`${loginInput}`)
    setLoginInput(`${registerInput}`)
    setLoginColor(``)
    setRegisterColor(`${logincolor}`)
    document.getElementById('welcomeParagraph').innerHTML = `<h3 class="text-center my-2 fs-4">Welcome</h3>
    <p class="hh text-center my-2 fs-4">Please register to enjoy our app</p>`
  }

  function sign() {
    setHomeBtn(`Get Started`)
  }

  return <>
    <header id="home" className="container-fluid d-flex justify-content-center align-items-center">
      <div className="header-content text-center text-white p-3">
        <h4>Welcome !</h4>
        <h2 className="my-3">I am your Smart recognition system</h2>
        <div className="d-flex justify-content-center align-items-center">
          <p className="fs-4">I am ready to help</p>
          <i className="fa-regular fa-face-smile-wink fs-3 ms-2 mb-3"></i>
        </div>

        <button id="joinBtn" className={`${styles.join} w-50 btn rounded-pill p-3 fs-3 mt-5`} onClick={toggleModel}>{homeBtn}</button>
      </div>

      {model && (
        <div id="formPopUp" className="container position-fixed " ref={modelRef}>
          <div className={`d-flex flex-wrap ${styles.popUp} rounded justify-content-center`}>
            <button className={`btn w-50 ${logincolor} text-white`} onClick={login}>login</button>
            <button className={`btn w-50 ${registercolor} text-white`} onClick={Register}>register</button>
            <div className="my-3 text-white" id="welcomeParagraph">
              <h3 className="text-center my-2 fs-4">Welcome</h3>
              <p className="hh text-center my-2 fs-4">Login to unlock the power of detection</p>
            </div>
            <form action="" className="rounded p-4 w-100  text-center">

              <input type="text" className={`form-control w-75 mb-3 m-auto ${styles.formControl}`} placeholder="Enter Email" />
              <input className={`form-control w-75 mb-3 m-auto ${styles.formControl}`} type="text" placeholder="Enter Password" />
              <input className={`form-control w-75 mb-3 m-auto ${styles.formControl} ${emailInput}`} type="text" placeholder="Enter address" />
              <input className={`form-control w-75 mb-3 m-auto ${styles.formControl} ${phoneInput} `} type="text" placeholder="Enter phone" />

              <div className='w-75 m-auto'>
                <div>
                  <button className={`btn btn-info text-white mt-4 ${styles.submitBtn}  w-75 ${loginInput}`} onClick={sign}>login</button>
                  <button className={`btn btn-info text-white mt-4 ${styles.submitBtn}  w-75 ${registerInput}`} onClick={sign}>Register</button>

                  <button className={`btn btn-info text-white mt-4 ${styles.submitBtn}  w-75`}>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="fa-brands fa-google fs-4 me-2"></i> continue with Google
                    </div>

                  </button>
                </div>
              </div>

            </form>

          </div>
          <div>

          </div>
        </div>
      )}




    </header>

  </>


}
