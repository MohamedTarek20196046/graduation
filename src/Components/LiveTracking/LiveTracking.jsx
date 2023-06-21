import React from 'react'
import styles from './LiveTracking.module.css'
import TrackNav from '../TrackNav/TrackNav'
import Footer from '../Footer/Footer'
import AnimatedPage from '../AnimatedPage'
export default function LiveTracking() {
  return (
   <>
  
   <TrackNav/>
   <AnimatedPage>
   <div className={`${styles.tracking} container ${styles.display1}`}>
    
        <div className="text-center w-75 m-auto">
            <p className="text-white fs-3 text-center">Live tracking is a dynamic service where the user will be able to
                open the camera and detect lane, Sign, traffic lights, crosswalks and pedestrians while your camera is
                rolling. </p>
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

        <div className=" m-auto mt-md-4 w-50 p-4 d-flex justify-content-center">
            <button className={`btn p-2  ${styles.trackBtn} me-3`}>Start Tracking</button>
            <button className={`btn p-2  ${styles.trackBtn} me-3`}>Stop Tracking</button>
        </div>
    </div>


    {/* Mobile view */}

    <div className={`${styles.tracking}  ${styles.display2}`}>
        <div className="text-center w-75 pt-3 pb-1 m-auto">
            <p className={`text-white ${styles.font} text-center`}>Live tracking is a dynamic service where the user will be able to
                open the camera and detect lane, Sign, traffic lights, crosswalks and pedestrians while your camera is
                rolling. </p>
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

        <div className=" m-auto mt-md-4 w-50 p-4 d-flex justify-content-center">
            <button className={`btn p-2  ${styles.trackBtn} me-3`}>Start Tracking</button>
            <button className={`btn p-2  ${styles.trackBtn} me-3`}>Stop Tracking</button>
        </div>
    </div>








    <Footer/>
    </AnimatedPage>
   </>
  )
}
