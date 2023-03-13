import React from 'react'
import styles from './Contacts.module.css'
export default function Contacts() {
  return (
   <>
   <section id="contact" className={styles.contact}>
        <div className="container  w-50 text-center p-4 ">
            <h3 className="text-center my-md-4">Contact Us</h3>
            <form action="" className="rounded p-4">
                <div className="row gy-3">
                    <div className="col-md-6"> <input className={`form-control ${styles.formControlBg}`} type="text" placeholder="Enter Name"/></div>

                    <div className="col-md-6"><input className={`form-control ${styles.formControlBg}`} type="text" placeholder="Enter Email"/></div>
                    <div className="col-md-12">
                        <textarea className={`form-control ${styles.formControlBg}`} placeholder="Enter your complaint" rows="7"></textarea>
                    </div>
                </div>
                <button className={`btn btn-info text-white mt-4 ${styles.submitBtn} rounded-pill`}>submit</button>
            </form>
        </div>
    </section>
    

   </>
  )
}
