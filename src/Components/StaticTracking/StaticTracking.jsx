import React, { useState , useEffect , useRef } from 'react';
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
const { SpeechSynthesisUtterance, speechSynthesis } = window;
export default function StaticTracking() {

    localStorage.setItem('static','text-info')
    localStorage.setItem('live','text-white')
    localStorage.setItem('profilecolor','text-white')
    const [stopSign, setstopSign] = useState(false);
    const [TrafficLight, settrafficLight] = useState(false);
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
        resetTranscript()
      }

     
    }

    const [imageFile, setImageFile] = useState(null);
    const [processedImageURL, setProcessedImageURL] = useState(null);
    const [detections, setDetections] = useState([]);
    const hasMountedRef = useRef(false);
    useEffect(() => {
      // This code will run only once, when the component mounts
    if(!hasMountedRef.current && localStorage.getItem("viewmode")==="true") 
    {    
      fetch(localStorage.getItem("view")).then(response => response.blob()).then(blob => {
        toast.info('Your image is being processed ',{
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        const file = new File([blob], 'image.jpg', { type: blob.type });
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
            if (data && data.image && data.detections) {
              const imageURL = `data:image/jpeg;base64,${data.image}`;
              setProcessedImageURL(imageURL);
              setDetections(data.detections);
              let count = 0;
              let spoken = false;
              let spoken1 = false;
              let spoken2=false;
              localStorage.setItem("viewmode","false")
              toast.dismiss()
              data.detections.forEach((detection) => {
                if(detection.class.includes("stop") && !spoken)
                {
                  const utterance = new SpeechSynthesisUtterance("You are approaching a stop sign");
                  speechSynthesis.speak(utterance);
                  spoken=true;
                }
                else if(detection.class.includes("red") && !spoken1){
                  const utterance = new SpeechSynthesisUtterance("You are approaching a red light");
                  speechSynthesis.speak(utterance);
                  spoken1=true;
                }else if(detection.class.includes("person") && !spoken2){
                  count++
                  if(count>10)
                  {
                    const utterance = new SpeechSynthesisUtterance("Be careful you are approaching a crowded area");
                    speechSynthesis.speak(utterance);
                    spoken2=true
                  }
                }
              });
            } else {
              console.error('Response is not valid:', data);
            }
          })
          .catch(error => {
            console.error(error);
          });
        })
        .catch(error => {
          console.error(error);
        }); 
        
        hasMountedRef.current = true;
        
        

       }
    }, [localStorage.getItem("viewmode"), localStorage.getItem("view")]);
    
      
    async function handleImageUpload(event) {
      const file = event.target.files[0];
      setImageFile(file);
      const formData = new FormData();
      formData.append('image', file);
      toast.info('Your image is being processed ',{
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
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
          if (data && data.image && data.detections) {
            const imageURL = `data:image/jpeg;base64,${data.image}`;
            setProcessedImageURL(imageURL);
            setDetections(data.detections);
            toast.dismiss()
            let spoken = false;
            let spoken1 = false;
            let spoken2 = false;
            let count=0
            data.detections.forEach((detection) => {
              if(detection.class.includes("stop") && !spoken)
              {
                const utterance = new SpeechSynthesisUtterance("You are approaching a stop sign");
                speechSynthesis.speak(utterance);
                spoken=true;
              }else if(detection.class.includes("red") && !spoken1){
                const utterance = new SpeechSynthesisUtterance("You are approaching a red light");
                speechSynthesis.speak(utterance);
                spoken1=true;
              }else if(detection.class.includes("person") && !spoken2){
                count++
                if(count>10)
                {
                  const utterance = new SpeechSynthesisUtterance("Be careful you are approaching a crowded area");
                  speechSynthesis.speak(utterance);
                  spoken2=true
                }
              }
            });
          } else {
            console.error('Response is not valid:', data);
          }
        })
        .catch(error => {
          console.error(error);
        });
        const formData1 = new FormData();
        formData1.append("file", file)
        formData1.append("upload_preset", "qmyra1zh")
        let response1  = await axios.post("https://api.cloudinary.com/v1_1/djsf0enir/image/upload",formData1)
        const urla = await response1.data.url
        

        const formData2 = new FormData();
        formData2.append('picture', urla);
        formData2.append('user_id',localStorage.getItem('idusers'));
        axios.post('https://backend-ab6i.onrender.com/upload', formData2)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error(error);
      });
    }
  
    return (
      <>
         <ToastContainer/>
          <FloatButton onClick={toggleListen} icon={<AudioOutlined />}/>
        <TrackNav />
        <AnimatedPage>
        <div className={`${styles.tracking} ${styles.display1} container`}>
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
            <button className={`btn p-2 ${styles.trackBtn} me-3`} onClick={()=>{setProcessedImageURL(""); setDetections("");document.getElementById("image-input").value = "";}}>Remove</button>
          </div>
  
          {detections.length > 0 && (
            <div className="text-white  text-center">
              <h3 className={`${styles.mobfont}`}>These are the objects detected by our model</h3>
              <table >
              <tbody>
                <tr>
                  <th>Class</th>
                  <th>Confidence</th>
                </tr>
                {detections.map((detection) => (
                  <tr >
                    <td>{detection.class}</td>
                    <td>{detection.confidence.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
          <br></br>
          
        </div>

        {/* Mobile view */}

        <div className={`${styles.tracking} ${styles.display2} `}>
          <div className={`text-center ${styles.paragraph} m-auto`}>
            <p className="text-white fs-5 text-center">
              upload your image to start detecting your environment
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
            <button className={`btn p-2 ${styles.trackBtn} me-3`} onClick={()=>{setProcessedImageURL(""); setDetections("");document.getElementById("image-input").value = "";}}>Remove</button>
          </div>
  
          {detections.length > 0 && (
            <div className="text-white  text-center">
              <h3 className={`${styles.mobfont1}`}>These are the objects detected by our model</h3>
              <table >
              <tbody>
                <tr>
                  <th>Class</th>
                  <th>Confidence</th>
                </tr>
                {detections.map((detection) => (
                  <tr >
                    <td>{detection.class}</td>
                    <td>{detection.confidence.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
          <br></br>
        </div>

        <Footer />
        </AnimatedPage>
      </>
    );
  }
