import React, { useState, useEffect } from 'react'
import style from './Service.module.css'
import lane from '../images/crosswalk.jpg'
import Pedestrian from '../images/Person.png'
import cross from '../images/cross2.jpg'
import vechile from '../images/Vechile.png'
import sign from '../images/StopSign.png'
import traffic from '../images/traffic-light-detection-using-tensorflow-object-detection-api-fig7-755150.jpg'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
export default function Service() {
  const [activeTab, setActiveTab] = useState('lane')

  const tabs = [
    { id: 'lane', title: 'Lane & Crosswalk Detection' },
    { id: 'pedestrian', title: 'Pedestrian Detection' },
    { id: 'trafficLights', title: 'Traffic Lights Detection' },
    { id: 'stop', title: 'Stop Sign Detection' },
    { id: 'Vehicle', title: 'Vehicle Detection'}
    // Add other tabs here...
  ]
  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (tabIndex + 1) % tabs.length
      setTabIndex(nextIndex)
      setActiveTab(tabs[nextIndex].id)
    }, 9000)
    return () => clearInterval(interval)
  }, [tabIndex, tabs])

  const tabClick = (tab) => {
    setActiveTab(tab)
    setTabIndex(tabs.findIndex(t => t.id === tab))
  }

  const card = tabs.map(tab => {
    if (tab.id === activeTab) {
      return (
        <div key={tab.id} className={`row ${style.test}`}>
          <div className='col-md-6'>
            <div><img src={images[tab.id]} className="w-100" alt="" /></div>
          </div>
          <div className='col-md-6 text-white d-flex align-items-center'>
            <div className='w-100'>
              <h4 className="pt-3 ">{tab.title}</h4>
              <p className={`${style.font}`}>{descriptions[tab.id]}</p>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  })
  const isSmallScreen = useMediaQuery({ maxWidth: 700 })
  return (
    <section id="services" className={style.services}>
      <div className="container  text-center  p-4">
        <h3 className="my-md-4">Our Services</h3>

        <div className={`${style.serviceCard} m-auto ${style.edit} text-white`}>

          <div className="row p-lg-3">

            <div className="col-md-9 d-flex  align-items-center justify-content-center">
              <div>
                <h4 className={`${style.textcolor}  ${style.edit2}`}>Live Detection</h4>

                <p className='text-white'>Perform object detection in real-time using a camera's live feed. This is our main service that we provide along with the voice notifications we send upon detecting crucial elements, and we know for a fact that it will help drivers around the world.</p>
              </div>
            </div>

            <div className='col-md-3 d-flex mt-2 align-items-center justify-content-center'>
              <button className={`btn mt-3 ${style.trybtn}  p-2 mb-3`}> <Link className={`${style.customlink}`} to="/livetrack">Try it yourself</Link> </button>
            </div>
          </div>

        </div>

        <div className={`${style.serviceCard}  ${style.edit} mt-4 m-auto text-white`}>
          <div className="row p-lg-3">

            <div className="col-md-12 d-flex  align-items-center justify-content-center">
              <div>
                <h4 className={`${style.textcolor} ${style.edit2}`}>Static Detection</h4>
                <p className='text-white'>Upload any photo that you want and our model will detect the traffic environment objects in it. It is mainly used to let the user be familiar with our system and to test it statically and show them how our model works and what it detects.</p>
              </div>
            </div>


          </div>
        </div>



        <div className='text-white d-block mt-5 mb-2'><h3 className='text-white'>They provides the following services:</h3></div>

        {isSmallScreen ? (
          <div className="container text-center p-4">
            <div className="row">
              <div className="col">
                <div className="dropdown">
                  <button className={`btn dropdown-toggle btn-info ${style.dropdownToggle}`} type="button" id="tabDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    {activeTab.concat(" detection")}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="tabDropdown">
                    {tabs.map(tab => (
                      <li key={tab.id} className={`nav-item `}>
                        <a className={`dropdown-item ${activeTab === tab.id ? 'active' : ''}`} onClick={() => tabClick(tab.id)}>{tab.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className={`row justify-content-center gy-3 ${style.Carddiv}`}>
              {card}
            </div>
          </div>

        ) : (
          <div className="container text-center p-4">
            <ul className={`nav  nav-tabs  ${style.navtest} d-flex justify-content-center`}>
              {tabs.map(tab => (
                <li key={tab.id} className={`nav-item `}>
                  <a className={`nav-link ${style.navlink} ${activeTab === tab.id ? 'active' : ''}`} onClick={() => tabClick(tab.id)}>{tab.title}</a>
                </li>
              ))}
            </ul>
            <div className={`row justify-content-center gy-3 ${style.Carddiv}`}>
              {card}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

const images = {
  lane: lane,
  pedestrian: Pedestrian,
  trafficLights: traffic,
  stop: sign,
  Vehicle:vechile
}

const descriptions = {
  lane: 'Lane and Cross-walks detection is a crucial component of advanced driver-assistance systems that helps drivers maintain their lane and avoid accidents. Lane detection algorithms use computer vision techniques to identify lane markings on the road and estimate the vehicle\'s position relative to them. This detection system is particularly useful on highways and busy roads.',
  pedestrian: 'Pedestrian detection is an essential technology for improving pedestrian safety on our roads. Using our model we can identify and track pedestrians in real-time and provide alerts to drivers to help avoid collisions. Pedestrian detection systems have become increasingly common in modern vehicles, and will help in features such as automatic emergency braking.',
  trafficLights: 'Our model identifies the location and status of traffic lights on the road. This technology is particularly useful for autonomous vehicles that need to react to changing traffic conditions on the road to help reduce traffic congestion.',
  stop: 'Stop signs detection is an essential component of advanced driver-assistance systems that helps drivers stay informed about critical road signs. Using our trained model we can recognize and interpret stop signs, ensuring that drivers are alerted by a voice notification to the need to stop at intersections. It is used to improve driver safety and reducing the risk of accidents caused by failure to observe stop signs.',
  Vehicle :'Vehicle detection is a crucial aspect in traffic monitoring while driving. In the realm of autonomous driving, vehicle detection serves as a fundamental component. Autonomous vehicles heavily rely on accurate and robust vehicle detection algorithms to perceive and interpret their surroundings. So, our model detects all types of vehicles ranging from cars obviously to bicycles and even trains!!'
}