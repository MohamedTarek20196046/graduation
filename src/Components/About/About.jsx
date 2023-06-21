import React from 'react'
import styles from './About.module.css'
export default function About() {
  return (
    <>
      <section className={`${styles.about}`} id="about">
            <div className="container text-center p-4 ">
                <h3 className="text-center my-md-4">About Us</h3>
                <p className="text-white fs-2">Our topic here is to detect traffic elements like traffic lights, signs,
                    cross-walks, lanes, and pedestrians using Artificial Intelligence.</p>

                <p className="text-white fs-2">Our model, which will learn using Machine Learning and Deep Learning algorithms
                    on large traffic-related datasets, is built to handle such cases</p>
            </div>
        </section>
    </>
  )
}
