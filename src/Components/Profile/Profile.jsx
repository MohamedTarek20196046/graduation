import React from 'react'
import styles from './Profile.module.css'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import AnimatedPage from '../AnimatedPage'
import { FloatButton } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition , { useSpeechRecognition } from 'react-speech-recognition';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate  } from 'react-router-dom';
import TrackNav from '../TrackNav/TrackNav'
export default function Profile() {

    const [isRecording, setIsRecording] = useState(false);
    const [Uploads, setUploads] = useState([]);
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




    localStorage.setItem('actions', 'd-none')
    const click = () => {
        localStorage.clear();
    }

    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
   
    useEffect(() => {
        axios.get(`https://backend-ab6i.onrender.com/profile_uploaded_pictures/${localStorage.getItem('idusers')}`)
        .then(response => {
          
          setUploads(response.data)
        })
        .catch(error => {
          console.error(error);
        });
        async function fetchProfilePicture() {
            const response = await axios.get(`https://backend-ab6i.onrender.com/profile_picture/${localStorage.getItem('idusers')}`, {
                responseType: 'text'
            });
            setProfilePictureUrl(response.data)
            localStorage.setItem('profile_picture', response.data)
        }
        fetchProfilePicture();
    }, []);

    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [password, setPassword] = useState(localStorage.getItem('password'));
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [phonenumber, setPhonenumber] = useState(localStorage.getItem('phonenumber'));
    const [profilePicture, setProfilePicture] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    

    async function handleSaveChanges() {
      toast.info('Your profile is updating',{
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        const formData = new FormData();
        if (profilePicture) {
        const formData1 = new FormData()
        formData1.append("file", profilePicture)
        formData1.append("upload_preset", "qmyra1zh")
        let response1  = await axios.post("https://api.cloudinary.com/v1_1/djsf0enir/image/upload",formData1)
        const urla = await response1.data.url
        console.log("1111 : " +urla)
        formData.append('profile_picture', urla);
        } 
        else {
          const oldProfilePictureUrl = localStorage.getItem('profile_picture');
          formData.append('profile_picture_url', oldProfilePictureUrl);
        }
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('phonenumber', phonenumber);
        try {
          const result = await axios.put(`https://backend-ab6i.onrender.com/users/${localStorage.getItem('idusers')}`, formData, {
            responseType: 'text'
          });
          // Update local storage with new user information
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
          localStorage.setItem('email', email);
          localStorage.setItem('phonenumber', phonenumber);
          toast.dismiss()
          setIsEditMode(false);
          window.location.reload(false);
        } catch (error) {
          console.log(error);
        }
      }

      function view(event){
        const src = event.target.src;
        localStorage.setItem("viewmode","true")
        localStorage.setItem("view",src)
        navigate("/statictrack")
      }

      function togglefunction(){
        setIsEditMode(!isEditMode)
        setUsername(localStorage.getItem('username'))
        setPassword(localStorage.getItem('password'))
        setEmail(localStorage.getItem('email'))
        setPhonenumber(localStorage.getItem('phonenumber'))
      }
    return (
        <>
            <ToastContainer/>
            <FloatButton onClick={toggleListen} icon={<AudioOutlined />}/>
            <TrackNav />
            <AnimatedPage>
            <section className={`container p-5   ${styles.profile} ${styles.display1}`}>
                <h3 className="text-center text-white mb-4">My Profile</h3>
                <div className={`row p-4 ${styles.userProf}`}>
                    <div className="col-md-2">
                        {profilePictureUrl && <img src={profilePictureUrl} alt="profile picture" className="w-75 rounded-circle" />}
                        {isEditMode && (
                            <>
                                <label htmlFor="profilePictureInput" className={`btn mt-3 ${styles.editbtn} rounded-pill`}>
                                    Choose a new pic
                                </label>
                                <input
                                    id="profilePictureInput"
                                    type="file"
                                    onChange={(e) => setProfilePicture(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </>
                        )}
                    </div>
                    <div className="col-md-10">
                        <form>
                        <label htmlFor="username">Username:</label>
                            <input id='username' className={`form-control ${styles.formControl} w-50  my-4 text-white`} type="text" value={username} disabled={!isEditMode} onChange={(e) => setUsername(e.target.value)} />
                            <input className={`form-control ${styles.formControl} w-50 mb-4 text-white`} type={isEditMode ? "text" : "password"}  value={password}  disabled={!isEditMode} onChange={(e) => setPassword(e.target.value)} />
                            <input className={`form-control w-50  ${styles.formControl} mb-4 text-white`} type="email" value={email} disabled={!isEditMode} onChange={(e) => setEmail(e.target.value)} />
                            <input className={`form-control w-50  ${styles.formControl} mb-4 text-white`} type="number" value={phonenumber} disabled={!isEditMode} onChange={(e) => setPhonenumber(e.target.value)} />
                            {isEditMode && <button type="button" className={`btn mt-3 ${styles.editbtn} rounded-pill w-25 p-3`} onClick={handleSaveChanges}>Save Changes</button>}
                        </form>
                        {!isEditMode && <button type="button" className={`btn mt-3 ${styles.editbtn} rounded-pill w-25 p-3`} onClick={() => setIsEditMode(!isEditMode)}>Edit Profile</button>}
                        {isEditMode && <button type="button" className={`btn mt-3 ${styles.editbtn} rounded-pill w-25 p-3`} onClick={togglefunction}>Cancel</button>}
                    </div>
                </div>

                <div className={`row ${styles.userProf} mt-5 gy-3 text-center text-white py-5`}>
                    <h3>History of uploaded images</h3>
                    {Uploads.length === 0 ? (
                    <p className={`${styles.notice}`}>you haven't uploaded any images yet in the static tracking</p>
                      ) : (
                        Uploads.map(upload => (
                          <div className="col-md-4"><img src={upload} onClick={view} className={`w-100 ${styles.images}`} alt="" /></div>
                        ))
                      )}
                </div>
                <div className={`${styles.logout} text-center`}>
                    <Link to="/Home">
                    <button className={`${styles.text}`} onClick={click} href=''> Logout </button>
                    </Link>
                </div>
            </section>


            {/* Mobile view */}

            <section className={` p-5  ${styles.profile}  ${styles.display2}`}>
                <h3 className="text-center text-white mb-4">My Profile</h3>
                <div className={`row  ${styles.userProf}`}>
                <div className="col-md-2">
                        {profilePictureUrl && <img src={profilePictureUrl} alt="profile picture" className={`w-75 rounded-circle ${styles.profileimg}`} />}
                        {isEditMode && (
                            <>
                                <label htmlFor="profilePictureInput" className={`btn mt-3 ${styles.choose} rounded-pill`}>
                                    Choose a new pic
                                </label>
                                <input
                                    id="profilePictureInput"
                                    type="file"
                                    onChange={(e) => setProfilePicture(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </>
                        )}
                    </div>
                    <div className="col-md-10">
                        <form>
                            <label htmlFor="username">Username:</label>
                            <input id='username' className={`form-control ${styles.formControl} w-100  my-4 text-white`} type="text" value={username} disabled={!isEditMode} onChange={(e) => setUsername(e.target.value)} />
                            <input className={`form-control   ${styles.formControl} w-100 mb-4 text-white`} type="text" value={password} disabled={!isEditMode} onChange={(e) => setPassword(e.target.value)} />
                            <input className={`form-control  ${styles.formControl} w-100 mb-4 text-white`} type="email" value={email} disabled={!isEditMode} onChange={(e) => setEmail(e.target.value)} />
                            <input className={`form-control   ${styles.formControl} w-100 mb-4 text-white`} type="number" value={phonenumber} disabled={!isEditMode} onChange={(e) => setPhonenumber(e.target.value)} />
                            {isEditMode && <button type="button" className={`btn mt-3 ${styles.save} rounded-pill w-75 p-3`} onClick={handleSaveChanges}>Save Changes</button>}
                        </form>
                        <button type="button" className={`btn mt-3 mb-3 ${styles.editbtn} rounded-pill w-50 p-3`} onClick={() => setIsEditMode(!isEditMode)}>{isEditMode ? 'Cancel' : 'Edit Profile'}</button>
                    </div>
                </div>

                <div className={`row ${styles.userProf} mt-5 gy-3 text-center text-white py-5`}>
                    <h3>History of uploaded images</h3>
                    {Uploads.length === 0 ? (
                    <p className={`${styles.notice}`}>you haven't uploaded any images yet in the static tracking</p>
                      ) : (
                        Uploads.map(upload => (
                          <div className="col-md-4"><img src={upload} onClick={view} className={`w-100 ${styles.images}`} alt="" /></div>
                        ))
                      )}
                </div>
                <br></br>
                <div className={`${styles.logout} text-center`}>
                    <Link to="/Home">
                    <button className={`${styles.text}`} onClick={click} href=''> Logout </button>
                    </Link>
                </div>
                
            </section>

            <Footer/>
            </AnimatedPage>
        </>
    )
}
