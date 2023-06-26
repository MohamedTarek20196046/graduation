import React , {useState}from 'react'
import styles from './StaticTracking.module.css'
import lane from '../images/lane.jpeg'
import Pedestrian from '../images/Pedestrian-Detection-Results.png'
import cross from '../images/cross2.jpg'
import sign from '../images/profile_hud79532efb6eb74901e92fd381f814933_919458_300x170_fit_box_2.png'
import traffic from '../images/traffic-light-detection-using-tensorflow-object-detection-api-fig7-755150.jpg'
import Footer from '../Footer/Footer'
import TrackNav from '../TrackNav/TrackNav'
import AnimatedPage from '../AnimatedPage'
import { FloatButton } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition , { useSpeechRecognition } from 'react-speech-recognition';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate  } from 'react-router-dom';
export default function StaticTracking() {
    localStorage.setItem('static','text-info')
    localStorage.setItem('live','text-white')

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
    const [imageFile, setImageFile] = useState(null);
    const [processedImageURL, setProcessedImageURL] = useState(null);
    const [detections, setDetections] = useState([]);
  
    function handleImageUpload(event) {
      const file = event.target.files[0];
      setImageFile(file);
    
      const formData = new FormData();
      formData.append('image', file);
    
      fetch('http://156.196.27.90:8080/detect_image', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          console.log(data);
          if (data && data.image && data.detections) {
            const imageURL = `data:image/jpeg;base64,${data.image}`;
            setProcessedImageURL(imageURL);
            setDetections(data.detections);
          } else {
            console.error('Response is not valid:', data);
          }
        })
        .catch(error => {
          console.error(error);
        });
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
     <div className={`${styles.tracking} container`}>
          <div className="text-center w-75 m-auto">
            <p className="text-white fs-3 text-center">
              static tracking is a service where the user will be able to upload a picture or a video to detect lane, Sign, traffic lights, crosswalks and pedestrians.
            </p>
          </div>
  
          <div className={`${styles.camera} m-auto d-flex justify-content-center align-items-center`}>
            {processedImageURL ? (
              <img src={processedImageURL} alt="Processed image" className={styles.processedImage} />
            ) : (
              <i className={`fa-solid fa-camera ${styles.cameraIcon}`}></i>
            )}
          </div>
  
          <div className="m-auto mt-md-4 w-50 p-4 d-flex justify-content-center">
            <label htmlFor="image-input" className={`btn p-2 ${styles.trackBtn} me-3`}>
              Upload
            </label>
            <input type="file" id="image-input" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
            <button className={`btn p-2 ${styles.trackBtn} me-3`}>Stop Tracking</button>
          </div>
  
          {detections.length > 0 && (
            <div className="text-white fs-3 text-center">
              <ul>
                {detections.map((detection, index) => (
                  <li key={index}>{`${detection.class} (${detection.confidence.toFixed(2)})`}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
       


    {/* Mobile view */}


    <div className={`${styles.tracking} ${styles.display2} `}>
        <div className="text-center w-75 pt-3 pb-1 m-auto">
            <p className={`text-white  text-center ${styles.font}`}>static tracking is a  service where the user will be able to upload a picture or a video  to detect lane, Sign, traffic lights, crosswalks and pedestrians.</p>
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
            <p className="text-white mb-3 mt-3">You can use one of sample examples to test our service..</p>
           <div className="row g-2 d-flex justify-content-center">
            <div className="col-md-4 mb-3">
                <div className={`${styles.serviceCard} text-white`}>
                    <img src={lane} className="w-100" alt=""/>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className={`${styles.serviceCard} text-white`}>
                    <img src={Pedestrian} className="w-100" alt=""/>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className={`${styles.serviceCard} text-white`}>
                    <img src={sign} className="w-100" alt=""/>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className={`${styles.serviceCard} text-white`}>
                    <img src={traffic} className="w-100" alt=""/>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className={`${styles.serviceCard} text-white`}>
                    <img src={cross} className="w-100" alt=""/>
                </div>
            </div>
            <div className="col-md-4 mb-3">
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
    </AnimatedPage>
    </>
  )
}
