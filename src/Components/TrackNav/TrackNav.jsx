import React from 'react'
import style from './TrackNav.module.css'

import { Link } from 'react-router-dom'

export default function TrackNav() {


    return (
        <>


            <nav className={`${style.navbarBg} navbar navbar-expand-lg fixed-top`}>
                <div className="container">
                    <Link className={`navbar-brand ${style.logo}`} to="/Home">Code Hub</Link>
                    <button className={`navbar-toggler ${style.togglerColor}`} type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className={`nav-link text-white `} aria-current="page" to="/livetrack" >
                                Live Tracking
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link text-white `} aria-current="page" to="/statictrack" >
                                Static Tracking
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className={`nav-link text-white ${localStorage.getItem('viewProfile')}`} aria-current="page" to="/profile" >
                                    <i className="fa-solid fa-user-large"></i>
                                    {localStorage.getItem('username')}
                                </Link>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>



        </>
    )
}