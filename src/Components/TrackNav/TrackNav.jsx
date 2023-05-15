import React from 'react'
import style from './TrackNav.module.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

export default function TrackNav() {
    const navigate = useNavigate();
    if(localStorage.getItem('live')===null){
        localStorage.setItem('live','text-white')
    }
    if(localStorage.getItem('static')===null){
        localStorage.setItem('static','text-white')
    }
    function live(event){
        event.preventDefault();
        localStorage.setItem('live','text-info')
        localStorage.setItem('static','text-white')
        navigate('/livetrack');
    }

    function test(event){
        event.preventDefault();
        localStorage.setItem('static','text-info')
        localStorage.setItem('live','text-white')
        navigate('/statictrack');
    }
    function test1(event){
        event.preventDefault();
        localStorage.setItem('live','text-info')
        localStorage.setItem('static','text-white')
        navigate('/');
    }

    return (
        <>


            <nav className={`${style.navbarBg} navbar navbar-expand-lg fixed-top`}>
                <div className="container">
                    <a className={`navbar-brand ${style.logo}`} onClick={test1} href=''>Code Hub</a>
                    <button className={`navbar-toggler ${style.togglerColor}`} type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav  mb-2 mb-lg-0">

                            <li className="nav-item">
                                <a className={`nav-link ${localStorage.getItem('live')}`} aria-current="page" onClick={live} href=''>
                                Live Tracking
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link  ${localStorage.getItem('static')}`} aria-current="page" onClick={test} href='' >
                                Static Tracking
                                </a>
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