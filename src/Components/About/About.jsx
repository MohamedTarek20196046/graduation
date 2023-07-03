import React from 'react'
import styles from './About.module.css'
export default function About() {
  return (
    <>
      <section className={`${styles.about}`} id="about">
            <div className="container text-center p-4 ">
                <h3 className="text-center my-md-4">About Us</h3>
                <p className="text-white fs-5">Our driver assistance app uses your smartphone's camera and internet to detect traffic elements like cars, lights, and signs as you drive. The app then alerts you if you approach a stop sign or red light without slowing down. Our goal is to provide an extra layer of safety awareness for drivers by helping catch things you may miss.</p>
            </div>
        </section>
    </>
  )
}
