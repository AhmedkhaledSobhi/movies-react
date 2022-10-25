import React from 'react'
import {Link }from'react-router-dom';

export default function Navbar(props) {

  

  return (<>
          <nav className="navbar navbar-expand-lg fixed-top navbar-dark ">
            <div className="container">
              <Link className="navbar-brand" to="#">Navbar</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {props.userData?
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="Home">Home</Link>
                      </li>

                      <li className="nav-item">
                        <Link className="nav-link" to="Movies">Movies</Link>
                      </li>
                      
                      <li className="nav-item">
                        <Link className="nav-link" to="PePole">PePole</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="About">trending</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="TvShow">Tv Show</Link>
                      </li>
                    </> : ''
                  }
                </ul>
                  

                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="Home">
                        <div>
                          <i className="fa-brands fa-facebook-f m-2"></i>
                          <i className="fa-brands fa-twitter m-2"></i>
                          <i className="fa-brands fa-instagram m-2"></i>
                        </div>
                    </Link>
                  </li>
                      {props.userData?  
                        <li className="nav-item">
                          <button onClick={props.LogOut} className="nav-link btn btn-outline-info">LogOut</button>
                        </li>:<>
                          <li className="nav-item">
                            <Link  className="nav-link" to="Login">SigIn</Link>
                          </li>

                          <li className="nav-item">
                            <Link className="nav-link" to="Register">SignUp</Link>
                          </li>
                                </>                       
                      }

                </ul>
                
              </div>
            </div>
          </nav>

    </>)}






