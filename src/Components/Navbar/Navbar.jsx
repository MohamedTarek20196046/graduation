import React from 'react'
import style from './Navbar.module.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import image from '../images/image.png'
export default function Navbar() {
    const navigate = useNavigate();
    function test3(event){
        event.preventDefault();
        localStorage.setItem('live','text-white')
        localStorage.setItem('static','text-white')
        localStorage.setItem('profilecolor','text-info')
        navigate('/profile');
    }
    return (
        <>
             <nav className={`${style.navbarBg} navbar navbar-expand-lg fixed-top ${style.fixedtop}`}>
                <div className="container">
                    <Link className={`navbar-brand ${style.logo}`} to="/Home"><img className={`${style.img1}`} src={image} /><span className={`${style.span1}`}>CodeHub</span></Link>
                    <button className={`navbar-toggler ${style.togglerColor}`} type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className={`nav-link text-white ${localStorage.getItem('actions')}`}  aria-current="page" href="#Home">Home</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-white d-none" aria-current="page" >Live Tracking</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active text-white d-none" aria-current="page" >static Tracking</Link>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link text-white ${localStorage.getItem('actions')}`} aria-current="page" href="#about">About</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link text-white ${localStorage.getItem('actions')}`} aria-current="page" href="#services">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link text-white ${localStorage.getItem('actions')}`} aria-current="page" href="#contact">Contact</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link  ${localStorage.getItem('profilecolor')}  ${localStorage.getItem('viewProfile')}`} aria-current="page" onClick={test3} href='' >
                                <i className="fa-solid fa-user-large"></i>
                                    {localStorage.getItem('username')}
                                </a>
                            </li>
                            
                        </ul>

                    </div>
                </div>
            </nav>

        
            
        </>
    )
}