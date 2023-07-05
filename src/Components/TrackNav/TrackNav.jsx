import React from 'react'
import style from './TrackNav.module.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import image from '../images/image.png'
export default function TrackNav() {
    const navigate = useNavigate();
    if(localStorage.getItem('live')===null){
        localStorage.setItem('live','text-info')
    }
    if(localStorage.getItem('static')===null){
        localStorage.setItem('static','text-white')
    }
    if(localStorage.getItem('profilecolor')===null){
        localStorage.setItem('profilecolor','text-white')
    }
    function live(event){
        event.preventDefault();
        localStorage.setItem('live','text-info')
        localStorage.setItem('static','text-white')
        localStorage.setItem('profilecolor','text-white')
        navigate('/livetrack');
    }

    function test(event){
        event.preventDefault();
        localStorage.setItem('static','text-info')
        localStorage.setItem('live','text-white')
        localStorage.setItem('profilecolor','text-white')
        navigate('/statictrack');
    }
    function test1(event){
        event.preventDefault();
        localStorage.setItem('live','text-info')
        localStorage.setItem('static','text-white')
        localStorage.setItem('profilecolor','text-white')
        navigate('/');
    }
    function test3(event){
        event.preventDefault();
        localStorage.setItem('live','text-white')
        localStorage.setItem('static','text-white')
        localStorage.setItem('profilecolor','text-info')
        navigate('/profile');
    }

    return (
        <>
        <nav className={`${style.navbarBg} navbar navbar-expand-lg fixed-top`}>
  <div className="container">
    <Link className={`navbar-brand ${style.logo}`} to="/Home">
      <img className={`${style.img1}`} src={image} />
      <span className={`${style.span1}`}>Code Hub</span>
    </Link>
    <button
      className={`navbar-toggler ${style.togglerColor}`}
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a
            className={`nav-link ${localStorage.getItem('live')}`}
            aria-current="page"
            onClick={live}
            href=""
          >
            Live Tracking
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${localStorage.getItem('static')} ${localStorage.getItem(
              'viewProfile'
            )}`}
            aria-current="page"
            onClick={test}
            href=""
          >
            Static Tracking
          </a>
        </li>
        <div className="ml-auto">
          <li className="nav-item">
            <a
              className={`nav-link ${localStorage.getItem('profilecolor')} ${style.profile} ${localStorage.getItem(
                'viewProfile'
              )}`}
              aria-current="page"
              onClick={test3}
              href=""
            >
              <i className="fa-solid fa-user-large"></i>
              {localStorage.getItem('username')}
            </a>
          </li>
        </div>
      </ul>
    </div>
  </div>
</nav>



        </>
    )
}
