import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import Admin_sideBar from './../Admin_sideBar/Admin_sideBar';
import Admin_dash from '../Admin_dash/Admin_dash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function Admin({dashboard}) {
  const [userData, setUserData] = useState(null);
  let id = localStorage.getItem('user_id');
  const navigate = useNavigate();
  async function getUserData(){
    
    try {
      let {data} = await axios.get(`api/users/${id}`)
    setUserData(data.data);
    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        navigate('/503')
      }
    }
  }
  useEffect(() => {
    getUserData()
  
    
  }, [])
  
  return <>
  {userData != null?
  <div className='container-fluid px-0' id='thechange'>
  <div className='row w-100 mx-0 position-relative'>
    <div className='col-2 '>
      <div className=' px-md-2 pb-5 pt-0 rounded-3 position-sticky top-0 bottom-0'>
        <Admin_sideBar />
      </div>
    </div>
    <div className='col-10 mb-2 px-0' style={{backgroundColor:"#F6F8FB"}}>
    <div className='w-100 '>
    <nav className="navbar navbar-expand-lg bg-white">
    <div className="container-fluid">
      <h4 className='fw-bold'><span className='highlightingcolor'>KNM</span> Travel</h4>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end w-100">
          <li className="nav-item d-flex align-items-center">
          <FontAwesomeIcon icon={faUserTie} className='fa-1x border-2 p-2 border-black border rounded-circle me-3'/>
            <h6 className='pt-2'>{userData.name}</h6>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
      {dashboard}
    </div>
    </div>
  </div>
    <Footer/>
    </div>:<div className='d-flex justify-content-center align-items-center vh-100'><BallTriangle 
  height={100}
  width={100}
  radius={5}
  color="#FECD27"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/></div>}
  </>
}
