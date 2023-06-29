import React, { useState } from 'react';
import styles from './StaticTracking.module.css';
import Footer from '../Footer/Footer';
import TrackNav from '../TrackNav/TrackNav';
import axios, { Axios } from 'axios'
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
  
    function test()
    {
      axios.get('https://terfci.msp-asu.tech/test')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    }
    function handleImageUpload(event) {
      const file = event.target.files[0];
      setImageFile(file);
    
      const formData = new FormData();
      formData.append('image', file);
    
      fetch('https://terfci.msp-asu.tech/detect_image', {
        method: 'POST',
        body: formData,
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          else{
            return response
          }
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
        <TrackNav />
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
        <Footer />
        </AnimatedPage>
      </>
    );
  }
