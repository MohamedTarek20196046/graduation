import React , {useState , useEffect, useRef} from 'react'
import axios from 'axios'
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

    const videoRef = useRef(null);
  const [error, setError] = useState(null);
  const [latestFrame, setLatestFrame] = useState(null);
  const [latestJson, setLatestJson] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startStream = async () => {
    try {
      const video = videoRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      video.play();
      setStreaming(true);

      const id = setInterval(async () => {
        try {
          const imageBlob = await getImageFromStream(stream);
          const formData = new FormData();
          formData.append('image', imageBlob);
          const response = await axios.post(
            'https://terfci.msp-asu.tech/detect_image',
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
              responseType: 'json',
            }
          );
          setLatestFrame(`data:image/jpeg;base64,${response.data.image}`);
          setLatestJson(response.data);
        } catch (error) {
          setError(error);
        }
      }, 200);

      setIntervalId(id);
    } catch (error) {
      setError(error);
    }
  };

  const startStream1 = async () => {
    try {
        const video = videoRef.current;
        const constraints = {
          video: true
        };
        
        if (navigator.mediaDevices.getSupportedConstraints().facingMode) {
          constraints.video = {
            facingMode: { exact: "environment" }
          };
        }
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        video.play();
        setStreaming(true);

      const id = setInterval(async () => {
        try {
          const imageBlob = await getImageFromStream(stream);
          const formData = new FormData();
          formData.append('image', imageBlob);
          const response = await axios.post(
            'https://terfci.msp-asu.tech/detect_image',
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
              responseType: 'json',
            }
          );
          setLatestFrame(`data:image/jpeg;base64,${response.data.image}`);
          setLatestJson(response.data);
        } catch (error) {
          setError(error);
        }
      }, 200);

      setIntervalId(id);
    } catch (error) {
      setError(error);
    }
  };




  const stopStream = () => {
    clearInterval(intervalId);
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setLatestFrame(null);
    setLatestJson(null);
    setStreaming(false);
    setIntervalId(null);
  };

  useEffect(() => {
    let id;

    const start = async () => {
      id = await startStream();
      
    };

    const stop = () => {
      stopStream();
    };

    return () => {
      stop();
    };
  }, []);

  const getImageFromStream = (stream) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 480;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to get image from stream'));
          }
        },
        'image/jpeg',
        0.8
      );
    });
  };

  const handleStartStream = () => {
    if (!streaming) {
      startStream();
    }
  };

  const handleStartStream1 = () => {
    if (!streaming) {
      startStream1();
    }
  };

  const handleStopStream = () => {
    if (streaming) {
      stopStream();
    }
  };
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
      <div className={`${styles.tracking} ${styles.display1} container`}>
        <div className="text-center w-75 m-auto">
          <p className="text-white fs-3 text-center">
            Live tracking is a dynamic service where the user will be able to
            open the camera and detect lane, Sign, traffic lights, crosswalks and pedestrians while your camera is
            rolling. </p>
        </div>

        <div className={`${styles.camera}  m-auto d-flex justify-content-center align-items-center`}>
          
          {/* {error && <div>{error.message}</div>} */}
          <video ref={videoRef} className={`${styles.cameraIcon} d-none`}  />
          {latestFrame && <img src={latestFrame} />}
          
        </div>

        <div className=" m-auto mt-md-4 w-50 p-4 d-flex justify-content-center">
          <button className={`btn p-2  ${styles.trackBtn} me-3`} onClick={handleStartStream} disabled={streaming}>Start Tracking</button>
          <button className={`btn p-2  ${styles.trackBtn} me-3`} onClick={handleStopStream} disabled={!streaming}>Stop Tracking</button>
        </div>

        {/* {latestJson && <pre>{JSON.stringify(latestJson, null, 2)}</pre>} */}

      </div>
         {/* mobile view*/}
      <div className={`${styles.tracking}  ${styles.display2}`}>
        <div className="text-center w-75 pt-3 pb-1 m-auto">
            <p className={`text-white ${styles.font} text-center`}>Live tracking is a dynamic service where the user will be able to
                open the camera and detect lane, Sign, traffic lights, crosswalks and pedestrians while your camera is
                rolling. </p>
        </div>

        <div className={`${styles.camera} m-auto d-flex justify-content-center align-items-center`}>
            <i className={`fa-solid fa-camera ${styles.cameraIcon}`}></i>
            
        </div>

        <div className=" m-auto mt-md-4 w-50 p-4 d-flex justify-content-center">
            <button className={`btn p-2  ${styles.trackBtn} me-3`} onClick={handleStartStream1} disabled={streaming}>Start Tracking</button>
            <button className={`btn p-2  ${styles.trackBtn} me-3`} onClick={handleStopStream} disabled={!streaming} >Stop Tracking</button>
        </div>
    </div>


      <Footer />
    </AnimatedPage>
   </>
  )
}
