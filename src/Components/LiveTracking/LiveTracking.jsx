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
import {Switch} from 'antd'
const { SpeechSynthesisUtterance, speechSynthesis } = window;
export default function LiveTracking() {
    const switchRef = useRef(null);
    const switchRef1 = useRef(null);
    const switchRef2 = useRef(null);
    const switchRef3 = useRef(null);
    const switchRef4 = useRef(null);
    const switchRef5 = useRef(null);
    const switchRef6 = useRef(null);
    const switchRef7 = useRef(null)
    const [isRecording, setIsRecording] = useState(false);
    const { transcript, resetTranscript,browserSupportsSpeechRecognition} = useSpeechRecognition({ interimResults: true});
    const videoRef = useRef(null);
    const [error1, setError] = useState(null);
    const [latestFrame, setLatestFrame] = useState(null);
    const [streaming, setStreaming] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [detectLane, setDetectLane] = useState(false);
    const [CrossWalk, setCrossWalk] = useState(false);
    const navigate = useNavigate ();
    const toggleListen = () => {
      if(!browserSupportsSpeechRecognition){
        alert("your browser doesn't support mic ")
      }
      if (!isRecording) {   //voice commands
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
            localStorage.setItem('static','text-white')
            localStorage.setItem('live','text-info')
            localStorage.setItem('profilecolor','text-white')
          }else if(transcript.includes("static"))
          {
            navigate("/statictrack")
            localStorage.setItem('static','text-info')
            localStorage.setItem('live','text-white')
            localStorage.setItem('profilecolor','text-white')
          }else if(transcript.includes("profile"))
          {
            navigate("/profile")
            localStorage.setItem('static','text-white')
            localStorage.setItem('live','text-white')
            localStorage.setItem('profilecolor','text-info')
            
          }else if(transcript.includes("logout") || transcript.includes("log out") )
          {
            localStorage.clear();
            navigate("/")
          }else if(transcript.includes("home"))
          {
              navigate("/")
              localStorage.setItem('static','text-white')
              localStorage.setItem('live','text-info')
              localStorage.setItem('profilecolor','text-white')
          }
          else if(transcript.includes("lane") || transcript.includes("Lane"))
          {
            switchRef.current.click();
            switchRef2.current.click();
            
          }
          else if(transcript.includes("crosswalk") || transcript.includes("Crosswalk"))
          {
            switchRef1.current.click();
            switchRef3.current.click(); 
          }
          else if(transcript.includes("start") || transcript.includes("Start"))
          {
            switchRef4.current.click();
            switchRef5.current.click();
            
          }
          else if(transcript.includes("stop") || transcript.includes("Stop"))
          {
            switchRef6.current.click();
            switchRef7.current.click(); 
          }
          resetTranscript()
      }
    }

    const startStream = async () => {
      try {
        const video = videoRef.current;
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.play();
        setStreaming(true);
        let count = 600;
        let count1 = 900;
        let count2 = 130;
        const id = setInterval(async () => {
          try {
            const imageBlob = await getImageFromStream(stream);
            const formData = new FormData();
            formData.append('image', imageBlob);
            const response = await axios.post(
              'https://terfci.msp-asu.tech/detect_video',
              formData,
              {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'json',
              }
            );
            setLatestFrame(`data:image/jpeg;base64,${response.data.image}`);
  
            if(response.data.nearest_dist<2 && response.data.nearest_dist>0.8)
            {
              if(count2>130)
              {
                const utterance = new SpeechSynthesisUtterance("There is a pedestrian ahead of you");
                      speechSynthesis.speak(utterance);
                count2=0;
              } 
            }
            count2++;
            response.data.detections.forEach((detection) => {
              count++;
              count1++;
              if (detection.class.includes("stop")) {
                if (count > 650) {
                  const utterance = new SpeechSynthesisUtterance("You are approaching a stop sign");
                  speechSynthesis.speak(utterance);
                  count = 0;
                }
  
              } else if (detection.class.includes("red")) {
  
                if (count1 > 950) {
                  const utterance = new SpeechSynthesisUtterance("You are approaching a red light");
                  speechSynthesis.speak(utterance);
                  count1 = 0;
                }
  
              }
            });
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
      video: {
        facingMode: { exact: "environment" }
      }
    };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;
      video.play();
      setStreaming(true);
      let count = 600;
      let count1 = 600;
      let count2 = 60;
      const id = setInterval(async () => {
        try {
          const imageBlob = await getImageFromStream1(stream);
          const formData = new FormData();
          formData.append('image', imageBlob);
          const response = await axios.post(
            'https://terfci.msp-asu.tech/detect_video',
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
              responseType: 'json',
            }
          );
          setLatestFrame(`data:image/jpeg;base64,${response.data.image}`);
          if(response.data.nearest_dist<2 && response.data.nearest_dist>0.8)
          {
            if(count2>60)
            {
              const utterance = new SpeechSynthesisUtterance("There is a pedestrian ahead of you");
                    speechSynthesis.speak(utterance);
              count2=0;
            } 
          }
          count2++;
          response.data.detections.forEach((detection) => {
            count++;
            count1++;
            if (detection.class.includes("stop")) {
              if (count > 50) {
                const utterance = new SpeechSynthesisUtterance("You are approaching a stop sign");
                speechSynthesis.speak(utterance);
                count = 0;
              }

            } else if (detection.class.includes("red")) {

              if (count1 > 300) {
                const utterance = new SpeechSynthesisUtterance("You are approaching a red light");
                speechSynthesis.speak(utterance);
                count1 = 0;
              }

            }
          });

        } catch (error) {
          setError(error);
        }
      }, 300);
      setIntervalId(id);
    } catch (error) {
      setError(error);
    }
  };

  const stopStream = () => {    //function to stop the stream
    clearInterval(intervalId);
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setLatestFrame(null);
    setStreaming(false);
    setIntervalId(null);
  };
  
  useEffect(() => {
    
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

  const getImageFromStream1 = (stream) => {    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
     canvas.width = window.innerWidth; 
      canvas.height = window.innerHeight;
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
  const handleDetectLaneChange = () => {
    console.log('Lane change detected!');
    const newDetectLane = !detectLane;
    setDetectLane(newDetectLane);
    sendDetectLaneToServer(newDetectLane);
  };

  const sendDetectLaneToServer= async (detectLaneValue) => {
    try {
      await axios.post('https://terfci.msp-asu.tech/update_detect_lane', { detectLane: detectLaneValue });
    } catch (error) {
      setError(error);
    }
  };
  const handleCrossWalkChange = () => {
    const newCrossWalk = !CrossWalk;
    setCrossWalk(newCrossWalk);
    sendCrossWalkToServer(newCrossWalk);
  };

  const sendCrossWalkToServer  = async (CrossWalkValue) => {
    try {
      await axios.post('https://terfci.msp-asu.tech/update_detect_crosswalk', { crossWalk: CrossWalkValue });
    } catch (error) {
      setError(error);
    }
  };
  return (
   <>
    <ToastContainer />
    <FloatButton onClick={toggleListen} icon={<AudioOutlined />}/>
   <TrackNav/>
   <AnimatedPage>
      <div className={`${styles.tracking} ${styles.display1} container`}>
        <div className="text-center w-75 m-auto">
          <p className="text-white fs-3 text-center">
          Press on the start tracking button and try out our live tracking now!! Experience our live detection along with real-time voice notifications of the most important traffic related events around you. Drive safe 🙂 </p>
        </div>

        <div className={`${styles.camera}  m-auto d-flex justify-content-center align-items-center`}>
            {!streaming && <i className={`fa-solid fa-camera ${styles.cameraIcon}`}></i>}
            {/* {error && <div>{error.message}</div>} */}
            <video ref={videoRef} className={`${styles.cameraIcon} d-none`} />
            {streaming && latestFrame && <img className={`${styles.cameraOpen}`} src={latestFrame} alt='video will play'/>}
          </div>

        
        <div className=" m-auto mt-md-4 w-50 p-4 d-flex justify-content-center">
          <button className={`btn p-2  ${styles.trackBtn} me-3`} ref={switchRef4} onClick={handleStartStream} disabled={streaming}>Start Tracking</button>
          <button className={`btn p-2  ${styles.trackBtn} me-3`} ref={switchRef6} onClick={handleStopStream} disabled={!streaming}>Stop Tracking</button>
        </div>
        <div className={`${styles.lane}  md-4  py-3 d-flex justify-content-center `}>Lane detection<Switch ref={switchRef} className={`${styles.lane1} `} onClick={handleDetectLaneChange}/></div>
        <div className={`${styles.lane}  md-4  py-3 d-flex justify-content-center `}>Crosswalk detection<Switch ref={switchRef1} className={`${styles.lane2}`} onClick={handleCrossWalkChange}/></div>
        <br></br>
        
      
        
      </div>
         {/* mobile view*/}
      <div className={`${styles.tracking}  ${styles.display2}`}>
        <div className="text-center w-100 pt-3  pb-1 m-auto">
            <p className={`text-white ${styles.font} text-center`}> Start tracking and experience our live detection along with real-time voice notifications of the most important traffic related events around you. Drive safe 🙂 </p>
        </div>

        <div className={`${styles.camera}  m-auto d-flex justify-content-center align-items-center`}>
            {!streaming && <i className={`fa-solid fa-camera ${styles.cameraIcon}`}></i>}
            <video ref={videoRef} className={`${styles.cameraIcon} d-none`} />
            {streaming && latestFrame && <img className={`${styles.cameraOpen}`} src={latestFrame} alt='video will play'/>}
        </div>

        <div className=" m-auto mt-md-4 w-50 p-4 d-flex justify-content-center">
            <button className={`btn p-2  ${styles.trackBtn} me-3`} ref={switchRef5} onClick={handleStartStream1} disabled={streaming}>Start Tracking</button>
            <button className={`btn p-2  ${styles.trackBtn} me-3`} ref={switchRef7} onClick={handleStopStream} disabled={!streaming} >Stop Tracking</button>
        </div>
        
        <div className={`${styles.lane}  md-4  py-3 d-flex justify-content-center `}>Lane detection<Switch ref={switchRef2} className={`${styles.lane1}`} onClick={handleDetectLaneChange}/></div>
        <div className={`${styles.lane}  md-4  py-3 d-flex justify-content-center `}>Crosswalk detection<Switch ref={switchRef3} className={`${styles.lane2}`} onClick={handleCrossWalkChange}/></div>
        <br></br>
    </div>


      <Footer />
    </AnimatedPage>
   </>
  )
}
