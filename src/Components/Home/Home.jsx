import React, { useEffect, useState, useRef } from 'react'
import lane from '../images/lane.jpeg'
import Pedestrian from '../images/Pedestrian-Detection-Results.png'
import cross from '../images/cross2.jpg'
import sign from '../images/profile_hud79532efb6eb74901e92fd381f814933_919458_300x170_fit_box_2.png'
import traffic from '../images/traffic-light-detection-using-tensorflow-object-detection-api-fig7-755150.jpg'
import styles from '../styles/Home.module.css'
import fstyles from '../styles/About.module.css'
import Sstyles from '../styles/Service.module.css'
import Cstyles from '../styles/Contacts.module.css'
export default function Home() {
  const [model, setModel] = useState(false)
  let [logincolor, setLoginColor] = useState(`${styles.loginBtn}`)
  let [registercolor, setRegisterColor] = useState(``)
  let [emailInput, setEmailInput] = useState(`d-none`)
  let [phoneInput, setPhoneInput] = useState(`d-none`)
  let [registerInput, setRegisterInput] = useState(`d-none`)
  let [loginInput, setLoginInput] = useState(`d-inline-block`)
  let [loggedBtn, setloggedBtn] = useState(`d-none`)
  let [SignBtn, setSignBtn] = useState(``)
  
  let modelRef = useRef()
  let Popup1Ref = useRef()
  let Popup2Ref = useRef()
  let active = styles.loginBtn
  
  const toggleModel = () => {
    setModel(!model)
  }
  useEffect(() => {
    const event = (e) => {
      if (model&&!modelRef.current.contains(e.target)) { 
        setModel(false)
      }
      else if(model && (Popup1Ref.current.contains(e.target) || (Popup2Ref.current.contains(e.target))))
      {
        setModel(false)
        setloggedBtn("")
        setSignBtn("d-none")
      }
      
    }
    document.addEventListener('click', event,true)
    
    return()=>{
      document.removeEventListener('click', event,true)
    }
  
  })

  function login() {
    setEmailInput(`d-none`)
    setPhoneInput(`d-none`)
    setRegisterInput(`d-none`)
    setLoginInput(`d-inline-block`)
    setLoginColor(`${active}`)
    setRegisterColor(``)
    document.getElementById('welcomeParagraph').innerHTML = `<h3 class="text-center my-2 fs-4">Welcome</h3>
    <p class="hh text-center my-2 fs-4">Login to unlock the power of detection</p>`
  }
  function Register() {
    setEmailInput(`d-block`)
    setPhoneInput(`d-block`)
    setRegisterInput(`d-inline-block`)
    setLoginInput(`d-none`)
    setLoginColor(``)
    setRegisterColor(`${active}`)
    document.getElementById('welcomeParagraph').innerHTML = `<h3 class="text-center my-2 fs-4">Welcome</h3>
    <p class="hh text-center my-2 fs-4">Please register to enjoy our app</p>`
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

        <button id="joinBtn" className={`${styles.join} w-50 btn rounded-pill p-3 fs-3 mt-5 ${SignBtn}`} onClick={toggleModel}>Join us</button>
        <button id="joinBtn" className={`${styles.join} w-50 btn rounded-pill p-3 fs-3 mt-5 ${loggedBtn}`} >Get Started</button>
        
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
                  <div >
                  <button className={`btn btn-info text-white mt-4 ${styles.submitBtn}  w-75 ${loginInput}`} ref={Popup1Ref} >login</button>
                  <button className={`btn btn-info text-white mt-4 ${styles.submitBtn}  w-75 ${registerInput}`} ref={Popup2Ref} >Register</button>
                  </div>
                  

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
    {/* This part is the About part */ }
          <section className={fstyles.about} id="about">
            <div className="container text-center p-4 ">
                <h3 className="text-center my-md-4">About Us</h3>
                <p className="text-white fs-2">Our topic here is to detect traffic elements like traffic lights, signs,
                    cross-walks, lanes, and pedestrians using Artificial Intelligence.</p>

                <p className="text-white fs-2">Our model, which will learn using Machine Learning and Deep Learning algorithms
                    on large traffic-related datasets, is built to handle such cases</p>
            </div>
        </section>
    {/* This part is the services part */ }   
    <section id="services" className={Sstyles.services}>
        <div className="container text-center p-4">
            <h3 className="my-md-4">Our Services</h3>
            <div className="row justify-content-center gy-3">
                <div className="col-md-4">
                    <div className={`${Sstyles.serviceCard} text-white`}>
                        <img src={lane} className="w-100" alt=""/>
                        <h4 className="pt-3">Lane detection</h4>

                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illo delectus repellat error
                            accusantium.</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className={`${Sstyles.serviceCard} text-white`}>
                        <img src={Pedestrian} className="w-100" alt=""/>
                        <h4 className="pt-3">Pedestrians detection</h4>

                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illo delectus repellat error
                            accusantium.</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className={`${Sstyles.serviceCard} text-white`}>
                        <img src={traffic}
                            className="w-100" alt=""/>
                        <h4 className="pt-3">Traffic-lights detection</h4>

                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illo delectus repellat error
                            accusantium.</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className={`${Sstyles.serviceCard} text-white`}>
                        <img src={sign}
                            className="w-100" alt=""/>
                        <h4 className="pt-3">Signs detection</h4>

                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illo delectus repellat error
                            accusantium.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`${Sstyles.serviceCard} text-white`}>
                        <img src={cross} className="w-100" alt=""/>
                        <h4 className="pt-3">Crosswalks detection</h4>

                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illo delectus repellat error
                            accusantium.</p>
                    </div>
                </div>

            </div>


        </div>

    </section>
    {/* This part is the services part */ }  
    <section id="contact" className={Cstyles.contact}>
        <div className="container  w-50 text-center p-4 ">
            <h3 className="text-center my-md-4">Contact Us</h3>
            <form action="" className="rounded p-4">
                <div className="row gy-3">
                    <div className="col-md-6"> <input className={`form-control ${Cstyles.formControlBg}`} type="text" placeholder="Enter Name"/></div>

                    <div className="col-md-6"><input className={`form-control ${Cstyles.formControlBg}`} type="text" placeholder="Enter Email"/></div>
                    <div className="col-md-12">
                        <textarea className={`form-control ${Cstyles.formControlBg}`} placeholder="Enter your complaint" rows="7"></textarea>
                    </div>
                </div>
                <button className={`btn btn-info text-white mt-4 ${Cstyles.submitBtn} rounded-pill`}>submit</button>
            </form>
        </div>
    </section>
    

    
  </>


}
