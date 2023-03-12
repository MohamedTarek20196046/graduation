import React from 'react'
import style from './Navbar.module.css'
export default function Navbar() {
    return (
      <>
        <nav className={`${style.navbarBg} navbar navbar-expand-lg fixed-top`}>
        <div className="container">
            <a className={`navbar-brand ${style.logo}`} href="#home">Code Hub</a>
            <button className={`navbar-toggler ${style.togglerColor}`} type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
          
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active text-white" aria-current="page" href="#home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" aria-current="page" href="#about">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" aria-current="page" href="#services">Services</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" aria-current="page" href="#contact">Contact</a>
                    </li>

                </ul>

            </div>
        </div>
    </nav>

      </>
    )
}
