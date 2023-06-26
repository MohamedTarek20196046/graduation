import React , {useState} from 'react'
import styles from './LiveTracking.module.css'
import TrackNav from '../TrackNav/TrackNav'
import Footer from '../Footer/Footer'
import AnimatedPage from '../AnimatedPage'
import { FloatButton } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition , { useSpeechRecognition } from 'react-speech-recognition';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate  } from 'react-router-dom';
const { SpeechSynthesisUtterance, speechSynthesis } = window;
export default function LiveTracking() {
    const [isRecording, setIsRecording] = useState(false);
  
    const { transcript, resetTranscript, stopListening ,browserSupportsSpeechRecognition} = useSpeechRecognition({ interimResults: true});
    const navigate = useNavigate ();
    const toggleListen = () => {
      if(!browserSupportsSpeechRecognition){
        alert("your browser doesn't support mic ")
      }
      if (!isRecording) {
        toast.info("mic on", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        SpeechRecognition.startListening();
        setIsRecording(true)
      } else {
        SpeechRecognition.stopListening()
        setIsRecording(false)
        console.log(transcript)
        toast.info("mic off", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        if(transcript.includes("live"))
        {
          navigate("/livetrack")
        }else if(transcript.includes("static"))
        {
          navigate("/statictrack")
        }else if(transcript.includes("profile"))
        {
          navigate("/profile")
        }else if(transcript.includes("logout") || transcript.includes("log out") )
        {
          localStorage.clear();
          navigate("/")
        }else if(transcript.includes("home"))
        {
            navigate("/")
        }
        resetTranscript()
      }

     
    }


    function sound(){
        const utterance = new SpeechSynthesisUtterance("Live tracking");
        speechSynthesis.speak(utterance);
    }
  return (
   <>
    <ToastContainer
    position="top-center"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    />
    <FloatButton onClick={toggleListen} icon={<AudioOutlined />}/>
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
            <button onClick={sound} className={`btn p-2  ${styles.trackBtn} me-3`}>Start Tracking</button>
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
