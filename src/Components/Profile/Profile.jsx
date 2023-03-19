import React from 'react'
import styles from './Profile.module.css'
import cross from '../images/cross2.jpg'
import hasbik from '../images/CM229-2.jpg'
export default function Profile(props) {
  return (
    <>
     <section className={`container p-5 my-3 ${styles.profile}`}>
        <h3 className="text-center text-white mb-4">My Profile</h3>
        <div className={`row p-4 ${styles.userProf}`}>
            <div className="col-md-2 ">
                <img src={hasbik} className="w-50 h-50 rounded-circle" alt=""/>
            </div>
            <div className="col-md-10">
                <div>
                    <input className={`form-control ${styles.formControl} w-50  my-4 text-white`} type="text" value={props.userData.Name} disabled/>
                    <input className={`form-control w-50  ${styles.formControl} mb-4 text-white`} type="text" value={props.userData.Password} disabled/>
                    <input className={`form-control w-50  ${styles.formControl} mb-4 text-white`} type="email" value={props.userData.email} disabled/>
                    <input className={`form-control w-50  ${styles.formControl} mb-4 text-white`} type="number" value={props.userData.phonenumber} disabled/>

                    <div className="text-center"><button id="joinBtn" className={`btn mt-3 ${styles.editbtn} rounded-pill w-25 p-3 `}>edit Profile</button></div>
                </div>

            </div>
        </div>

        <div className={`row ${styles.userProf} mt-5 gy-3 text-center text-white py-5`}>
            <h3>History of uploaded images</h3>
            <div className="col-md-4"><img src={cross} className="w-100" alt=""/></div>
            <div className="col-md-4"><img src={cross} className="w-100" alt=""/></div>
            <div className="col-md-4"><img src={cross} className="w-100" alt=""/></div>
            <div className="col-md-4"><img src={cross} className="w-100" alt=""/></div>
            <div className="col-md-4"><img src={cross} className="w-100" alt=""/></div>
            <div className="col-md-4"><img src={cross} className="w-100" alt=""/></div>
        </div>

    </section>
    </>
  )
}
