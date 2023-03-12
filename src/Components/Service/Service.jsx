import React from 'react'
import styles from './Service.module.css'
import lane from '../images/lane.jpeg'
import Pedestrian from '../images/Pedestrian-Detection-Results.png'
import cross from '../images/cross2.jpg'
import sign from '../images/profile_hud79532efb6eb74901e92fd381f814933_919458_300x170_fit_box_2.png'
import traffic from '../images/traffic-light-detection-using-tensorflow-object-detection-api-fig7-755150.jpg'


export default function Service() {
  return (
    <section id="services" className={styles.services}>
        <div className="container text-center p-4">
            <h3 className="my-md-4">Our Services</h3>
            <div className="row justify-content-center gy-3">
                <div className="col-md-4">
                    <div className={`${styles.serviceCard} text-white`}>
                        <img src={lane} className="w-100" alt=""/>
                        <h4 className="pt-3">Lane detection</h4>

                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illo delectus repellat error
                            accusantium.</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className={`${styles.serviceCard} text-white`}>
                        <img src={Pedestrian} className="w-100" alt=""/>
                        <h4 className="pt-3">Pedestrians detection</h4>

                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illo delectus repellat error
                            accusantium.</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className={`${styles.serviceCard} text-white`}>
                        <img src={traffic}
                            className="w-100" alt=""/>
                        <h4 className="pt-3">Traffic-lights detection</h4>

                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illo delectus repellat error
                            accusantium.</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className={`${styles.serviceCard} text-white`}>
                        <img src={sign}
                            className="w-100" alt=""/>
                        <h4 className="pt-3">Signs detection</h4>

                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illo delectus repellat error
                            accusantium.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`${styles.serviceCard} text-white`}>
                        <img src={cross} className="w-100" alt=""/>
                        <h4 className="pt-3">Crosswalks detection</h4>

                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit illo delectus repellat error
                            accusantium.</p>
                    </div>
                </div>

            </div>


        </div>

    </section>
  )
}
