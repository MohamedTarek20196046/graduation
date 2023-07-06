import React from 'react'
import styles from './Manual.module.css'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Tab, Tabs } from 'react-bootstrap';
import { WarningOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive'
export default function Manual() {
    const [key, setKey] = useState('color-pallets');
    const isSmallScreen = useMediaQuery({ maxWidth: 700 })
    const data = [
        { color: 'cyan', detection: 'Person' },
        { color: 'rose', detection: 'Bicycle' },
        { color: 'purple', detection: 'Car' },
        { color: 'navy blue', detection: 'Motorbike' },
        { color: 'goldenred', detection: 'Bus' },
        { color: 'maroon', detection: 'Train' },
        { color: 'dark red ', detection: 'Truck' },
        { color: 'orange', detection: 'Traffic Lights' },
        { color: 'dark green ', detection: 'stop sign' },
        { color: 'bright green ', detection: 'Lane' },
        { color: 'bright red ', detection: 'Crosswalk' }
    ];
    const rows = data.map(rowData => (
        <tr key={rowData.color}>
            <td>{rowData.color}</td>
            <td>{rowData.detection}</td>
        </tr>
    ));
    const data1 = [
        { command: 'if it includes live tracking', action: 'go to live tracking page' },
        { command: 'if it includes static tracking', action: 'go to static tracking page' },
        { command: 'if it includes my profile', action: 'go to profile page' },
        { command: 'if it includes home', action: 'go to Home page' },
        { command: 'if it includes Lane', action: 'open lane option' },
        { command: 'if it includes Crosswalk', action: 'open Crosswalk option' },
        { command: 'if it includes start tracking ', action: 'start live tracking' },
        { command: 'if it includes stop tracking', action: 'start live tracking' },

    ];
    const rows1 = data1.map(rowData => (
        <tr key={rowData.command}>
            <td>{rowData.command}</td>
            <td>{rowData.action}</td>
        </tr>
    ));

    return (
        <>
            <section className={`${styles.about}`} >
                <div className="container text-center p-4 ">
                    <h3 className="text-center my-md-4 text-white">Warning & Limitations</h3>

                </div>

                {isSmallScreen ? (<div>
                    <div className={`${styles.serviceCard}  ${styles.edit}  p-3 mx-3 m-auto text-white`}>
                        <div className="row p-lg-3">

                            <div className="col-md-12 d-flex  align-items-center justify-content-center">
                                <div>
                                    <h4 className={`${styles.textcolor} ${styles.edit3} `}><WarningOutlined className={`${styles.laneIcon} `} /> CAUTION</h4>
                                    <p className='text-white'>Ensure all cameras are clean. Dirty cameras , as well as environmental conditions such as rain and faded lane markings, can affect detection performance.</p>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className={`${styles.serviceCard1}  ${styles.edit} p-3 mx-3 mt-4 m-auto text-white`}>
                        <div className="row p-lg-3">

                            <div className="col-md-12 d-flex  align-items-center justify-content-center">
                                <div>
                                    <h4 className={`${styles.textcolor} ${styles.edit3}`}><WarningOutlined className={`${styles.laneIcon1}`} />Lane detection Warning</h4>
                                    <p className='text-white'>Lane Assist features are for guidance purposes only and is not intended to replace your own direct visual checks. Before changing lanes, always use side mirrors and perform the appropriate shoulder checks to visually determine if it is safe and appropriate to change lanes.Never depend on Lane Assist to inform you if you unintentionally drive outside of the driving lane, or to inform you that there is a vehicle beside you or in your blind spot. Several external factors can reduce the performance of Lane Assist </p>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className={`${styles.serviceCard1}  ${styles.edit}  p-3 mx-3 mt-4 m-auto text-white`}>
                        <div className="row p-lg-3">

                            <div className="col-md-12 d-flex  align-items-center justify-content-center">
                                <div>
                                    <h4 className={`${styles.textcolor} ${styles.edit3}`}><WarningOutlined className={`${styles.laneIcon1}`} />Crosswalk Detection Warning</h4>
                                    <p className='text-white'>Crosswalk detection algorithms are typically designed to work at lower speeds, such as those encountered in urban areas. At higher speeds, such as on highways, the system may not be able to detect crosswalks in time to alert the driver.</p>
                                </div>
                            </div>


                        </div>
                    </div>



                </div>) : (<div>
                    <div className={`${styles.serviceCard}  ${styles.edit} w-50  m-auto text-white`}>
                        <div className="row p-lg-3">

                            <div className="col-md-12 d-flex  align-items-center justify-content-center">
                                <div>
                                    <h4 className={`${styles.textcolor} ${styles.edit2}`}><WarningOutlined className={`${styles.laneIcon}`} /> CAUTION</h4>
                                    <p className='text-white'>Ensure all cameras are clean. Dirty cameras , as well as environmental conditions such as rain and faded lane markings, can affect detection performance.</p>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className={`${styles.serviceCard1}  ${styles.edit} w-50 mt-4 m-auto text-white`}>
                        <div className="row p-lg-3">

                            <div className="col-md-12 d-flex  align-items-center justify-content-center">
                                <div>
                                    <h4 className={`${styles.textcolor} ${styles.edit2}`}><WarningOutlined className={`${styles.laneIcon1}`} />Lane detection Warning</h4>
                                    <p className='text-white'>Lane Assist features are for guidance purposes only and is not intended to replace your own direct visual checks. Before changing lanes, always use side mirrors and perform the appropriate shoulder checks to visually determine if it is safe and appropriate to change lanes.Never depend on Lane Assist to inform you if you unintentionally drive outside of the driving lane, or to inform you that there is a vehicle beside you or in your blind spot. Several external factors can reduce the performance of Lane Assist </p>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className={`${styles.serviceCard1}  ${styles.edit} w-50 mt-4 m-auto text-white`}>
                        <div className="row p-lg-3">

                            <div className="col-md-12 d-flex  align-items-center justify-content-center">
                                <div>
                                    <h4 className={`${styles.textcolor} ${styles.edit2}`}><WarningOutlined className={`${styles.laneIcon1}`} />Crosswalk Detection Warning</h4>
                                    <p className='text-white'>Crosswalk detection algorithms are typically designed to work at lower speeds, such as those encountered in urban areas. At higher speeds, such as on highways, the system may not be able to detect crosswalks in time to alert the driver.</p>
                                </div>
                            </div>


                        </div>
                    </div>



                </div>)}

                <div className="container text-center p-4 ">
                    <h3 className="text-center my-md-4 text-white">Quick guide for our system</h3>

                </div>

                <Tabs className={`w-75 m-auto ${styles.navlink}`}  activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab className={`${styles.navlink}`} eventKey="color-pallets" title="Color Pallets">
                        <div>
                            <table className='table m-auto w-75'>
                                <thead>
                                    <th>Color</th>
                                    <th>Object Detected</th>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                    </Tab>
                    <Tab eventKey="voice-commands" title="Voice Commands">
                        <div>
                            <table className='table m-auto w-75'>
                                <thead>
                                    <th>Command</th>
                                    <th>Action</th>
                                </thead>
                                <tbody>
                                    {rows1}
                                </tbody>
                            </table>
                        </div>
                    </Tab>
                </Tabs>
                <Link to="/home" className='text-center d-block'>
                        <button id="joinBtn" className={`${styles.join} mt-3 btn rounded-pill fs-3 mb-3 `}>go back to Home</button>
                    </Link>

            </section>
        </>
    )
}