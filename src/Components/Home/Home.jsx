import React, { useEffect, useState, useRef } from 'react'
import { useNavigate  } from 'react-router-dom';
import axios, { Axios } from 'axios'
import styles from './Home.module.css'
import About from '../About/About'
import Service from '../Service/Service'
import Contacts from '../Contacts/Contacts'
import Footer from '../Footer/Footer'
import Joi from 'joi'
import Navbar from '../Navbar/Navbar'
import { async } from 'q'
import { Link } from 'react-router-dom';
import AnimatedPage from '../AnimatedPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FloatButton } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition , { useSpeechRecognition } from 'react-speech-recognition';
export default function Home({ saveUserData }) {
  const [model, setModel] = useState(false)
  let [logincolor, setLoginColor] = useState(`${styles.loginBtn}`)
  let [registercolor, setRegisterColor] = useState(``)
  const [loginForm, setloginForm] = useState('d-block')
  const [registerForm, setregisterForm] = useState('d-none')
  localStorage.setItem('live','text-info')
  localStorage.setItem('static','text-white')
  localStorage.setItem('profilecolor','text-white')
  localStorage.setItem('actions', '')
  if (localStorage.getItem('viewProfile') === null) {
    localStorage.setItem('viewProfile', 'd-none')
  }
  if (localStorage.getItem('loginbtn') === null) {
    localStorage.setItem('loginbtn', 'd-none')
  }
  if (localStorage.getItem('Signbtn') === null) {
    localStorage.setItem('Signbtn', '')
  }


  let modelRef = useRef()
  let Popup1Ref = useRef()
  let Popup2Ref = useRef()
  let active = styles.loginBtn
  const [user, setUser] = useState({
    Name: '',
    Password: '',
    email: '',
    Phonenumber: 0,
    profile_picture: ''

  })
  const [userLogin, setUserLogin] = useState({
    email: '',
    Password: '',
  })
  const [errorRegister, seterrorRegister] = useState('')
  const [errorListRegister, seterrorListRegister] = useState([])
  const [error, seterror] = useState('')
  const [errorListLogin, seterrorListLogin] = useState([])
  const [image,setImage]= useState('')
  const [url,setUrl]= useState('')

  const [bool,setBool]= useState('No')
  const toggleModel = () => {
    setModel(!model)
  }
  useEffect(() => {
    const event = (e) => {
      if (model && !modelRef.current.contains(e.target)) {
        seterrorListRegister([])
        setModel(false)
      }
      else if (model && (Popup1Ref.current.contains(e.target))) {
        submitLogin(e)
      }


    }
    document.addEventListener('click', event, true)

    return () => {
      document.removeEventListener('click', event, true)
    }

  })

  function login() {
    setregisterForm('d-none')
    setloginForm('d-block')
    setLoginColor(`${active}`)
    setRegisterColor(``)
    document.getElementById('welcomeParagraph').innerHTML = `<h3 class="text-center my-2 fs-4">Welcome</h3>
    <p class="hh text-center my-2 fs-4">Login to unlock the power of detection</p>`
  }
  function Register() {
    setloginForm('d-none')
    setregisterForm('d-block')
    setLoginColor(``)
    setRegisterColor(`${active}`)
    document.getElementById('welcomeParagraph').innerHTML = `<h3 class="text-center my-2 fs-4">Welcome</h3>
    <p class="hh text-center my-2 fs-4">Please register to enjoy our app</p>`
  }

  function getUserData(event) {
    let myUser = { ...user }
    myUser[event.target.name] =
      event.target.name === 'profile_picture' ? event.target.files[0] : event.target.value;
      if(event.target.name === 'profile_picture'){
        console.log(event.target.files[0]) 
        setImage(event.target.files[0])
        setBool('yes')
      }
    setUser(myUser);
  }
  function getUserLoginData(event) {
    let myUser = { ...userLogin }
    myUser[event.target.name] = event.target.value;
    setUserLogin(myUser);

  }


  async function check() {
    
    let { data } = await axios.post("https://backend-ab6i.onrender.com/check", user);
    if (data.message === 'not found') {
      toast.info('Your account is being created ',{
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      sendRegisterDatatoApi()
    }
    else {
      toast.warn('Sorry this email is already used ', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }

  async function sendRegisterDatatoApi() {
    const formData1 = new FormData()
    const formData = new FormData();
    if(bool==="yes"){
      formData1.append("file", image)
      formData1.append("upload_preset", "qmyra1zh")
      let response1  = await axios.post("https://api.cloudinary.com/v1_1/djsf0enir/image/upload",formData1)
      const urla = await response1.data.url
      formData.append('profile_picture', urla);
    }else{
      formData.append('profile_picture', "https://res.cloudinary.com/djsf0enir/image/upload/v1688361175/facebook_huxaw2.jpg");
    }
    
   
    formData.append('Name', user.Name);
    formData.append('Password', user.Password);
    formData.append('email', user.email);
    formData.append('Phonenumber', user.Phonenumber);
    

    try {
      const response = await axios.post('https://backend-ab6i.onrender.com/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.message === 'success') {
        toast.dismiss()
        login();
        toast.success('Please login to start detecting ',{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      } else {
        seterrorRegister(response.data.message);
      }
    } catch (error) {
      console.error(error);
      seterrorRegister(error.message);
    }


  }
  async function sendLoginDatatoApi() {

    let { data } = await axios.post("https://backend-ab6i.onrender.com/login", userLogin);
    if (data.message === 'success') {
      localStorage.setItem('userToken', data.token);
      console.log(data);
      // console.log(data.token);
      saveUserData()
      setModel(false)
      localStorage.setItem('viewProfile', '')
      localStorage.setItem('loginbtn', '')
      localStorage.setItem('Signbtn', 'd-none')
      toast.success('Welcome  ' + localStorage.getItem("username") , {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    else {
      //seterrorRegister(data.message)
      toast.error('wrong credentials ', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      seterror(data.message)
    }
  }





  function submitRegister(e) {
    e.preventDefault();

    let validation = validateRegisterForm()
    if (validation.error) {
      seterrorListRegister(validation.error.details)

    }
    else {
      check()
    }


  }
  function submitLogin(e) {
    e.preventDefault();

    let validation = validateLoginForm()
    if (validation.error) {
      seterrorListLogin(validation.error.details)

    }
    else {
      sendLoginDatatoApi();
    }

  }
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
    

  function validateRegisterForm() {
    let scheme = Joi.object({
      Name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      Phonenumber: Joi.string().regex(/^(?!-)\d{11}$/).required(),
      Password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      profile_picture: Joi.optional()
    })
    return scheme.validate(user, { abortEarly: false });
  }
  function validateLoginForm() {
    let scheme2 = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      Password: Joi.string().min(3).max(30).required()
    })
    return scheme2.validate(userLogin, { abortEarly: false });
  }


  //console.log(errorListLogin.filter((err) => err.context.label === 'Name'));

  return <>
    <ToastContainer/>
    <FloatButton onClick={toggleListen} icon={<AudioOutlined />}/>
    <AnimatedPage>
    <Navbar />
    <header id="Home" className="container-fluid d-flex justify-content-center align-items-center">
      <div className="header-content text-center text-white p-3">
        <h4>Welcome !</h4>
        <h2 className="my-3">I am your Smart recognition system </h2>
        <div className="d-flex justify-content-center align-items-center">
          <p className="fs-4">I am ready to help</p>
          <i className="fa-regular fa-face-smile-wink fs-3 ms-2 mb-3"></i>
        </div>

        <button id="joinBtn" className={`${styles.join} w-50 btn rounded-pill p-3 fs-3 mt-5 ${localStorage.getItem('Signbtn')}`} onClick={toggleModel}>Join us</button>

        <Link to="/livetrack">
          <button id="joinBtn" className={`${styles.join} w-50 btn rounded-pill p-3 fs-3 mt-5 ${localStorage.getItem('loginbtn')}`}>Get Started</button>
        </Link>

      </div>

      {model && (
        <div id="formPopUp" className={`container position-fixed ${styles.pulse}`} ref={modelRef}>
          <div className={`d-flex flex-wrap ${styles.popUp} rounded justify-content-center`}>
            <button className={`btn w-50 ${logincolor} text-white`} onClick={login}>login</button>
            <button className={`btn w-50 ${registercolor} text-white`} onClick={Register}>register</button>
            <div className="my-3 text-white" id="welcomeParagraph">
              <h3 className="text-center my-2 fs-4">Welcome</h3>
              <p className="hh text-center my-2 fs-4">Login to unlock the power of detection</p>
            </div>


            <form onSubmit={submitRegister} action="" className={`rounded ${registerForm} pb-2 w-100  text-center`} encType="multipart/form-data">
              {/* {errorList.map((err, index) => <div key={index} className=" alert alert-danger m-auto mt-5">{err.message}</div>)} */}
              <input name='Name' type="text" className={`form-control w-75 mb-3 m-auto ${styles.formControl}`} required placeholder="Please enter full name" onChange={getUserData} />

              {errorListRegister.filter((err) => err.context.label === 'Name')[0]?.message ? <div className='alert alert-danger m-auto p-0 my-2 w-75'>
                <p>{errorListRegister.filter((err) => err.context.label === 'Name')[0]?.message}</p>
              </div> : ''}

              <input name='Password' className={`form-control w-75 mb-3 m-auto ${styles.formControl}`} required type="password" placeholder="Please enter your Password" onChange={getUserData} />

              {errorListRegister.filter((err) => err.context.label === 'Password')[0]?.message ? <div className='alert alert-danger m-auto p-0 my-2 w-75'>
                <p>Minimum eight characters, at least one uppercase letter, one lowercase letter and one number</p>
              </div> : ''}

              <input name='email' className={`form-control w-75 mb-3 m-auto ${styles.formControl} `} required type="email" placeholder="Please enter your email" onChange={getUserData} />

              {errorListRegister.filter((err) => err.context.label === 'email')[0]?.message ? <div className='alert alert-danger m-auto p-0 my-2 w-75'>
                <p>{errorListRegister.filter((err) => err.context.label === 'email')[0]?.message}</p>
              </div> : ''}

              <input name='Phonenumber' className={`form-control w-75 mb-3 m-auto ${styles.formControl}  `} required type="text" placeholder="Please enter your Phonenumber" onChange={getUserData} />

              {errorListRegister.filter((err) => err.context.label === 'Phonenumber')[0]?.message ? <div className='alert alert-danger m-auto p-0 my-2 w-75'>
                <p>The Phonenumber must be atLeast 11 characters</p>
              </div> : ''}
              <input name='profile_picture' type="file" className={`form-control w-75 mb-3 m-auto ${styles.formControl}`} placeholder="Please select your ProfilePic" onChange={getUserData} />
              

              {errorListRegister.filter((err) => err.context.label === 'profile_picture')[0]?.message ? <div className='alert alert-danger m-auto p-0 my-2 w-75'>
                <p>{errorListRegister.filter((err) => err.context.label === 'profile_picture')[0]?.message}</p>
              </div> : ''}
              <div className='w-75 m-auto'>
                <div>
                  <div >
                    <button className={`btn btn-info text-white mt-4 ${styles.submitBtn}  w-75 `} ref={Popup2Ref} >Register</button>
                  </div>


                  {/* <button className={`btn btn-info text-white mt-4 ${styles.submitBtn}  w-75`}>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="fa-brands fa-google fs-4 me-2" ></i> continue with Google
                    </div>

                  </button> */}
                </div>
              </div>

            </form>



            <form onSubmit={submitLogin} action="" className={`rounded ${loginForm} pb-2 w-100  text-center`}>
              {/* {error.length > 0 ? <div className="alert alert-danger p-0">{error}</div> : ''} */}
              <input name='email' className={`form-control w-75 mb-3 m-auto ${styles.formControl} `} type="email" placeholder="Please enter your email" onChange={getUserLoginData} />

              {errorListLogin.filter((err) => err.context.label === 'email')[0]?.message ? <div className='alert alert-danger m-auto p-0 my-2 w-75'>
                <p>{errorListLogin.filter((err) => err.context.label === 'email')[0]?.message}</p>
              </div> : ''}


              <input name='Password' className={`form-control w-75 mb-3 m-auto ${styles.formControl}`} type="password" placeholder="Please enter your Password" onChange={getUserLoginData} />

              {errorListLogin.filter((err) => err.context.label === 'Password')[0]?.message ? <div className='alert alert-danger m-auto p-0 my-2 w-75'>
                <p>{errorListLogin.filter((err) => err.context.label === 'Password')[0]?.message}</p>
              </div> : ''}



              <div className='w-75 m-auto'>
                <div>
                  <div >

                    <button type='button' className={`btn btn-info text-white mt-4 ${styles.submitBtn}  w-75 `} ref={Popup1Ref} >Login</button>
                  </div>


                  {/* <button className={`btn btn-info text-white mt-4 ${styles.submitBtn}  w-75`}>
                    <div className="d-flex justify-content-center align-items-center">
                      <i className="fa-brands fa-google fs-4 me-2" ></i> continue with Google
                    </div>

                  </button> */}
                </div>
              </div>

            </form>




          </div>
          <div>

          </div>
        </div>
      )}

    </header>
    {/* This part is the About part */}
    <About />
    {/* This part is the services part */}
    <Service />
    <Contacts />
    <Footer/>
    </AnimatedPage>    
    
  </>


}
