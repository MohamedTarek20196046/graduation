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
import image from '../images/Untitled2.png'
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
      if(username.length <2){
        console.log(username.length)
        toast.error('Your username must be atleast of 3 characters',{
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        setUsername(localStorage.getItem('username'))
        return
      }
      const pattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if(!pattern.test(password)){
        toast.error('Password must be minimum eight characters, at least one uppercase letter, one lowercase letter and one number',{
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        setPassword(localStorage.getItem('password'))
        return
      }
        const regex2=/^\S+@\S+\.\S+$/;
        if(!regex2.test(email)){
          toast.error('The email must be in email format',{
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setEmail(localStorage.getItem('email'))
          return
        }
        const pattern1 =/^(?!-)\d{11}$/;
        if(!pattern1.test(phonenumber))
        {
          toast.error('The Phonenumber must be exactly 11 numbers',{
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
          setPhonenumber(localStorage.getItem('phonenumber'))
          return
        }
        if(email!==(localStorage.getItem('email')))
        {
          const data = { email: email };
          let responsez  = await axios.post("https://backend-ab6i.onrender.com/check",data)
          const k = await responsez.data.message
          if(k=== "email already used"){
            toast.error('this email is already taken',{
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setEmail(localStorage.getItem('email'))
            return;
          }
        }
        
      

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
        const secureUrl = src.replace('http://', 'https://');
        localStorage.setItem("viewmode","true")
        localStorage.setItem("view",secureUrl)
        navigate("/statictrack")
      }
      function togglefunction(){
        setIsEditMode(!isEditMode)
        setUsername(localStorage.getItem('username'))
        setPassword(localStorage.getItem('password'))
        setEmail(localStorage.getItem('email'))
        setPhonenumber(localStorage.getItem('phonenumber'))
      }
      function homeRedirect(){
        navigate("/")
       }
    return (
      <>
      {localStorage.getItem('viewProfile')!=="d-none" ? (
       <>
            <ToastContainer/>
            <FloatButton onClick={toggleListen} icon={<AudioOutlined />}/>
            <TrackNav />
            <AnimatedPage>
            <section className={`container p-5   ${styles.profile} ${styles.display1}`}>
                <h3 className="text-center text-white mb-4">My Profile</h3>
                <div className={`row p-4 ${styles.userProf}`}>
                    <div className="col-md-3">
                        {profilePictureUrl && <img src={profilePictureUrl} alt="profile picture" className={` ${styles.profilebox} `} />}
                        {isEditMode && (
                            <>
                                <label htmlFor="profilePictureInput" className={`btn mt-3 ${styles.editbtn2} rounded-pill`}>
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
                    <div className={`col-md-9 `}>
                        <form className={`${styles.form1}`}>
                            <label className={`${styles.label1} mt-3`} htmlFor="username">Username</label>
                            <input id='username' className={`form-control ${styles.formControl} w-50  mb-4 text-white`} required type="text" value={username} disabled={!isEditMode} onChange={(e) => setUsername(e.target.value)} />
                            <label className={`${styles.label1}`} htmlFor="password">Password</label>
                            <input id='password' className={`form-control ${styles.formControl} w-50 mb-4 text-white`} required type={isEditMode ? "text" : "password"}  value={password}  disabled={!isEditMode} onChange={(e) => setPassword(e.target.value)} />
                            <label className={`${styles.label1}`} htmlFor="email">Email</label>
                            <input id='email' className={`form-control w-50  ${styles.formControl} mb-4 text-white`} required type="email" value={email} disabled={!isEditMode} onChange={(e) => setEmail(e.target.value)} />
                            <label className={`${styles.label1}`} htmlFor="phonenumber">Phonenumber </label>
                            <input id='phonenumber'className={`form-control w-50  ${styles.formControl} mb-4 text-white`} required type="number" value={phonenumber} disabled={!isEditMode} onChange={(e) => setPhonenumber(e.target.value)} />
                            {isEditMode && <button type="button" className={`btn mt-3 ${styles.editbtn} rounded-pill w-25 p-3`} onClick={handleSaveChanges}>Save Changes</button>}
                        </form>
                        {!isEditMode && <button type="button" className={`btn mt-3 ${styles.editbtn} rounded-pill w-25 p-3`} onClick={() => setIsEditMode(!isEditMode)}>Edit Profile</button>}
                        {isEditMode && <button type="button" className={`btn mt-3 ${styles.editbtn1} rounded-pill w-25 p-3`} onClick={togglefunction}>Cancel</button>}
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
                    <button className={`${styles.text}`} onClick={click} > Logout </button>
                    </Link>
                </div>
            </section>


            {/* Mobile view */}

            <section className={` p-5  ${styles.profile}  ${styles.display2}`}>
                <h3 className="text-center text-white mb-4">My Profile</h3>
                <div className={`row  ${styles.userProf}`}>
                <div className="col-md-2">
                        {profilePictureUrl && <img src={profilePictureUrl} alt="profile picture" className={` ${styles.profileimg}`} />}
                        {isEditMode && (
                            <>
                                <label htmlFor="profilePictureInput" className={`btn mt-3 ${styles.choose} ${styles.editbtn2} rounded-pill`}>
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
                            <label className={`${styles.label1} pt-3`} htmlFor="username">Username</label>
                            <input id='username' className={`form-control ${styles.formControl} w-100  mb-2 text-white`} type="text" value={username} required disabled={!isEditMode} onChange={(e) => setUsername(e.target.value)} />
                            <label className={`${styles.label1}`} htmlFor="password">Password</label>
                            <input id='password' className={`form-control ${styles.formControl} w-100 mb-2 text-white`} required type={isEditMode ? "text" : "password"}  value={password}  disabled={!isEditMode} onChange={(e) => setPassword(e.target.value)} />
                            <label className={`${styles.label1}`} htmlFor="email">Email</label>
                            <input className={`form-control  ${styles.formControl} w-100 mb-2 text-white`} type="email" required value={email} disabled={!isEditMode} onChange={(e) => setEmail(e.target.value)} />
                            <label className={`${styles.label1}`} htmlFor="phonenumber">Phonenumber </label>
                            <input className={`form-control   ${styles.formControl} w-100 mb-2 text-white`} type="number" required value={phonenumber} disabled={!isEditMode} onChange={(e) => setPhonenumber(e.target.value)} />
                            {isEditMode && <button type="button" className={`btn mt-3 ${styles.save} ${styles.editbtn} rounded-pill w-75 p-3 `} onClick={handleSaveChanges}>Save Changes</button>}
                        </form>
                        {!isEditMode && <button type="button" className={`btn mt-3 ${styles.editbtn} rounded-pill w-50 p-3 mb-3`} onClick={() => setIsEditMode(!isEditMode)}>Edit Profile</button>}
                        {isEditMode && <button type="button" className={`btn mt-3 ${styles.editbtn1} rounded-pill w-75 p-3 mb-3`} onClick={togglefunction}>Cancel</button>}
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
        ) : (
          <div className={`${styles.alert} mx-auto  text-center p-5`}>
          <img className={`${styles.imageEdit}`} src={image} />
          <h1 className={`${styles.head} text-info`}>404 Error</h1>
          <p className={`text-info`}>You must be logged in to access this page</p>
          <button className={`${styles.buttonedit}`} onClick={homeRedirect}>Return To HomePage</button>
          </div>
          )}
        </>
    )
}
