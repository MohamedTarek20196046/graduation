import React from 'react'
import styles from './Home.module.css'
export default function Home() {
  return <>
    <header id="home" className="container-fluid d-flex justify-content-center align-items-center">

      <div className="header-content text-center text-white p-3">
        <h4>Welcome !</h4>
        <h2 className="my-3">I am your Smart recognition system</h2>
        <div className="d-flex justify-content-center align-items-center">
          <p className="fs-4">I am ready to help</p>
          <i className="fa-regular fa-face-smile-wink fs-3 ms-2 mb-3"></i>
        </div>

        <button id="joinBtn" className={`${styles.join} w-50 btn rounded-pill p-3 fs-3 mt-5`}>Join us</button>
      </div>
      


    </header>

  </>


}
