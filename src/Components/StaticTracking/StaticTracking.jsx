import React from 'react'
import styles from './StaticTracking.module.css'
import lane from '../images/lane.jpeg'
import Pedestrian from '../images/Pedestrian-Detection-Results.png'
import cross from '../images/cross2.jpg'
import sign from '../images/profile_hud79532efb6eb74901e92fd381f814933_919458_300x170_fit_box_2.png'
import traffic from '../images/traffic-light-detection-using-tensorflow-object-detection-api-fig7-755150.jpg'
import Footer from '../Footer/Footer'
import TrackNav from '../TrackNav/TrackNav'
export default function StaticTracking() {
  return (
    <>
     <TrackNav/>
   <div className={`${styles.tracking} container`}>
        <div className="text-center w-75 m-auto">
            <p className="text-white fs-3 text-center">static tracking is a  service where the user will be able to upload a picture or a video  to detect lane, Sign, traffic lights, crosswalks and pedestrians.</p>
        </div>

        <div className={`${styles.camera} m-auto d-flex justify-content-center align-items-center`}>
            <i className={`fa-solid fa-camera ${styles.cameraIcon}`}></i>
            
        </div>

        <div className={`${styles.check} m-auto p-3 mt-4 text-white`}>
            <p>Choose the objects you want to detect:</p>
            <form>
                <label>
                    <input type="checkbox" name="lane" value="lane"/> Lane
                </label>
                <br/>
                <label>
                    <input type="checkbox" name="sign" value="sign"/> Sign
                </label>
                <br/>

                <label>
                    <input type="checkbox" name="Trafficlights" value="Traffic Lights"/> Traffic Lights
                </label>
                <br/>
                <label>
                    <input type="checkbox" name="Crosswalks" value="Crosswalks"/> Crosswalks
                </label>
                <br/>
                <label>
                    <input type="checkbox" name="Pedestrians" value="Pedestrians"/> Pedestrians
                </label>
            </form>
        </div>
        <div className={`${styles.camera} m-auto p-3 mt-3`}>
            <p className="text-white mb-3">You can use one of sample examples to test our service..</p>
           <div className="row g-2 d-flex justify-content-center">
            <div className="col-md-4">
                <div className={`${styles.serviceCard} text-white`}>
                    <img src={lane} className="w-100" alt=""/>
                </div>
            </div>
            <div className="col-md-4">
                <div className={`${styles.serviceCard} text-white`}>
                    <img src={Pedestrian} className="w-100" alt=""/>
                </div>
            </div>
            <div className="col-md-4">
                <div className={`${styles.serviceCard} text-white`}>
                    <img src={sign} className="w-100" alt=""/>
                </div>
            </div>
            <div className="col-md-4">
                <div className={`${styles.serviceCard} text-white`}>
                    <img src={traffic} className="w-100" alt=""/>
                </div>
            </div>
            <div className="col-md-4">
                <div className={`${styles.serviceCard} text-white`}>
                    <img src={cross} className="w-100" alt=""/>
                </div>
            </div>
            <div className="col-md-4">
                <div className={`${styles.serviceCard} text-white`}>
                    <img src={lane} className="w-100" alt=""/>
                </div>
            </div>
           
           </div>

        </div>

        <div className=" m-auto mt-md-4 w-50 p-4 d-flex justify-content-center">
            <button className={`btn p-2  ${styles.trackBtn} me-3`}>Upload</button>
            <button className={`btn p-2  ${styles.trackBtn} me-3`}>Stop Tracking</button>
        </div>
    </div>
    <Footer/>
    </>
  )
}
