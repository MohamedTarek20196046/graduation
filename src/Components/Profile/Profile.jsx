import React from 'react'
import styles from './Profile.module.css'
import cross from '../images/cross2.jpg'
import hasbik from '../images/CM229-2.jpg'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

export default function Profile() {
    localStorage.setItem('actions', 'd-none')
    const click = () => {
        localStorage.clear();
    }

    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    console.log(localStorage.getItem('userToken'));

    useEffect(() => {
        async function fetchProfilePicture() {
            const response = await axios.get(`http://localhost:3001/profile_picture/${localStorage.getItem('idusers')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                },
                responseType: 'blob'
            });
            const pictureUrl = URL.createObjectURL(response.data);
            setProfilePicture(pictureUrl);
        }
        fetchProfilePicture();
    }, []);
    console.log(profilePictureUrl);

    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [password, setPassword] = useState(localStorage.getItem('password'));
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [phonenumber, setPhonenumber] = useState(localStorage.getItem('phonenumber'));
    const [profilePicture, setProfilePicture] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    async function handleSaveChanges() {
        const formData = new FormData();
        if (profilePicture) {
          formData.append('profile_picture', profilePicture);
        } else {
          const oldProfilePictureUrl = localStorage.getItem('profile_picture');
          formData.append('profile_picture_url', oldProfilePictureUrl);
        }
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('phonenumber', phonenumber);
        try {
          const result = await axios.put(`http://localhost:3001/users/${localStorage.getItem('idusers')}`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(result.data);
          // Update local storage with new user information
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
          localStorage.setItem('email', email);
          localStorage.setItem('phonenumber', phonenumber);
          setIsEditMode(false);
        } catch (error) {
          console.log(error);
        }
      }
    return (
        <>
            <Navbar />
            <section className={`container p-5 my-3 ${styles.profile}`}>
                <h3 className="text-center text-white mb-4">My Profile</h3>
                <div className={`row p-4 ${styles.userProf}`}>
                    <div className="col-md-2">
                        {profilePicture && <img src={profilePicture} alt="profile picture" className="w-75 rounded-circle" />}
                        {isEditMode && <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} />}
                    </div>
                    <div className="col-md-10">
                        <form>
                            <input className={`form-control ${styles.formControl} w-50  my-4 text-white`} type="text" value={username} disabled={!isEditMode} onChange={(e) => setUsername(e.target.value)} />
                            <input className={`form-control w-50  ${styles.formControl} mb-4 text-white`} type="text" value={password} disabled={!isEditMode} onChange={(e) => setPassword(e.target.value)} />
                            <input className={`form-control w-50  ${styles.formControl} mb-4 text-white`} type="email" value={email} disabled={!isEditMode} onChange={(e) => setEmail(e.target.value)} />
                            <input className={`form-control w-50  ${styles.formControl} mb-4 text-white`} type="number" value={phonenumber} disabled={!isEditMode} onChange={(e) => setPhonenumber(e.target.value)} />
                            {isEditMode && <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>}
                        </form>
                        <button type="button" className={`btn mt-3 ${styles.editbtn} rounded-pill w-25 p-3`} onClick={() => setIsEditMode(!isEditMode)}>{isEditMode ? 'Cancel' : 'Edit Profile'}</button>
                    </div>
                </div>

                <div className={`row ${styles.userProf} mt-5 gy-3 text-center text-white py-5`}>
                    <h3>History of uploaded images</h3>
                    <div className="col-md-4"><img src={cross} className="w-100" alt="" /></div>
                    <div className="col-md-4"><img src={cross} className="w-100" alt="" /></div>
                    <div className="col-md-4"><img src={cross} className="w-100" alt="" /></div>
                    <div className="col-md-4"><img src={cross} className="w-100" alt="" /></div>
                    <div className="col-md-4"><img src={cross} className="w-100" alt="" /></div>
                    <div className="col-md-4"><img src={cross} className="w-100" alt="" /></div>
                </div>
                <button onClick={click}><Link to="/Home">delete</Link></button>
            </section>
        </>
    )
}
