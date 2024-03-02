import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import $ from "jquery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrency } from '../../Redux/currencySlice';

export default function Navbar() {
  let selectedCurr = JSON.parse(localStorage.getItem('selectedCurrency'))
  const [currency, setCurrency] = useState(null)
  const [currencyBase, setCurrencyBase] = useState(selectedCurr == null?{base:'USD',cost:'1.00'}:{base: selectedCurr.selectedCurrencyBase,cost:selectedCurr.selectedCurrencyCost})
  const [userImage, setUserImage] = useState(null);
  const {currencies} = useSelector(state => state.currency)
  const dispatch = useDispatch()


  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
    // Add any other headers as needed
  };
  let current_path = window.location
  let location = useLocation()
  const navigate = useNavigate();

  function logout() {
  navigate('/home')
  localStorage.clear();
  
  
  
}
async function getUserPhoto(){
  if (localStorage.getItem('user_id') != null) {
    try {
      let {data} = await axios.get(`api/users/${localStorage.getItem('user_id')}`)
  setUserImage(data.data.profile_photo)
    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        navigate('/503')
      }
    }
  }
}

function fetchCurrencies(){
dispatch(getCurrency())
}
function active(e){
  $('.navele').removeClass('navlink-border')
    $(`#${e.target.id}`).addClass('navlink-border')
}
useEffect(() => {
  fetchCurrencies()
  getUserPhoto()
  
  $('#currencychange').on("change",function(e){
    
    localStorage.setItem('selectedCurrency',JSON.stringify({'selectedCurrencyBase':e.target.value,'selectedCurrencyCost':e.target.selectedOptions[0].getAttribute('data-cost')}))
    setCurrencyBase({base:e.target.value,cost:e.target.options[e.target.selectedIndex].getAttribute('data-cost')})
  })


  switch (current_path.pathname) {
    case '/':
      $('.navele').removeClass('navlink-border');
      $(`#home`).addClass('navlink-border');
      break;
    case '/home':
      $('.navele').removeClass('navlink-border');
      $(`#home`).addClass('navlink-border');
      break;
    // Add more cases if needed
    case '/tours':
      $('.navele').removeClass('navlink-border');
      $(`#tours`).addClass('navlink-border');
      break;
    case '/aboutus':
      $('.navele').removeClass('navlink-border');
      $(`#about-us`).addClass('navlink-border');
      break;
    case '/contact':
      $('.navele').removeClass('navlink-border');
      $(`#contact`).addClass('navlink-border');
      break;
    case '/contact':
      $('.navele').removeClass('navlink-border');
      $(`#dashboard`).addClass('navlink-border');
      break;
    default:
      // Default case
      $('.navele').removeClass('navlink-border');
      $(`#home`).addClass('navlink-border');
      break;
      
      
  }
  

}, [current_path,location,currencyBase])


  return <>
  <nav className="navbar navbar-expand-lg bg-white shadow-sm position-fixed start-0 top-0 end-0" aria-label="Offcanvas navbar small">
    <div className="container">
      <Link className="navbar-brand text-center logo navtext d-flex align-items-center fw-bold" to="/"><img src="/logo.svg" className='w-100 rounded-circle ' alt="KNM" />KNM TRAVEL</Link>
      <button className="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="offcanvas offcanvas-end w-50" tabIndex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbar2Label">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body ">
        
        {localStorage.getItem('auth_token') != null?<div style={{width:"100%"}} className=' d-flex align-items-center d-md-none'><Link className='text-center' to={'/profile'}><img src="/Default.jpg" className='w-25 rounded-circle' /></Link></div>:""}
          <ul className="navbar-nav text-center justify-content-center flex-grow-1 ">
          <li className="nav-item me-2">
            {current_path.pathname == '/' || current_path.pathname == '/home'?<Link className="nav-link navele  navtext navlink-border fw-bold " id='home' onClick={active} aria-current="page" to='/home'>Home</Link>:<Link className="nav-link text-black navele  fw-bold " id='home' onClick={active} aria-current="page" to='/home'>Home</Link>}
          </li>
          <li className="nav-item me-2">
{current_path.pathname == '/tours'?<Link className="nav-link navele navtext navlink-border fw-bold navtext" aria-current="page" id='tours' onClick={active} to="/tours">Tours</Link>
:<Link className="nav-link navele  fw-bold navtext" aria-current="page" id='tours' onClick={active} to="/tours">Tours</Link>
}
          </li>
          <li className="nav-item  me-2">
          {current_path.pathname == '/aboutus'?<Link className="nav-link navele navtext navlink-border fw-bold navtext"  id='about-us' aria-current="page" onClick={active} to="/aboutus">About us</Link>:<Link className="nav-link navele  fw-bold navtext"  id='about-us' aria-current="page" onClick={active} to="/aboutus">About us</Link>}
            
          </li>
          <li className="nav-item me-2">
            {current_path.pathname == '/contact'?<Link className="nav-link navele navtext navlink-border fw-bold navtext" aria-current="page" id='contact' onClick={active} to="/contact">Contact us</Link>:<Link className="nav-link navele  fw-bold navtext" aria-current="page" id='contact' onClick={active} to="/contact">Contact us</Link>}
          </li>
          {localStorage.getItem('role') != undefined && localStorage.getItem('role') != 0?<li className="nav-item me-2">
            <Link className="nav-link navele  fw-bold navtext" aria-current="page" id='dashboard' onClick={active} to="/admin">Dashboard</Link>
          </li>:""}
          </ul>
          {localStorage.getItem('auth_token') != null?<div  className='smallProfile me-2 d-flex align-items-center d-none d-md-flex'><Link to={'/profile'}>{userImage != null?<img src={`https://knm.knm-travels.com/storage/app/public/${userImage}`} className='w-100 rounded-circle' />:<img src="/Default.jpg" className='w-100 rounded-circle' />}</Link></div>:""}
          <div className="dropdown me-2">
  
  <select value={currencyBase.base} className='btn btn-outline-light px-4 currencylist btn-select text-black' id='currencychange' >
    {currencies != null?currencies.map((elem,idx)=><option key={idx} className='text-center text-black pointer' value={elem.code} data-cost={elem.cost}>{elem.code}</option>):""}
    
  </select>
</div>
{localStorage.getItem('auth_token') == null?<Link to={'/signin'}><button className='btn costume-btn text-black border-0 px-4 my-3 py-2 my-md-0'>Login</button></Link>
:<Link className='text-decoration-none' onClick={logout}><button className='d-flex align-items-center btn btn-outline-danger border-0 px-3 py-2 my-3 my-md-0'>Logout <FontAwesomeIcon className='ms-2' icon={faRightFromBracket}/></button></Link>}
         
        </div>
      </div>
    </div>
  </nav>
  </>
}
