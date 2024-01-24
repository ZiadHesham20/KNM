import { faCarSide, faCoins, faComments, faGauge, faLayerGroup, faMapLocation, faMapLocationDot, faPersonWalkingLuggage, faReceipt, faRightFromBracket, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from "jquery";

export default function Admin_sideBar() {
  const navigate = useNavigate();
  let current_path = window.location
  function logout() {
  
    localStorage.clear();
    navigate('/home')
  }
  function active(e){
    $('.sideLink').removeClass('activeSide')
   
      $(`#${e.target.id}`).addClass('activeSide')
  }
  return<>
  <div className='container'>
  <div>
      <div className="d-flex flex-column justify-content-between flex-shrink-0 p-md-3" >
      <div>
      <Link to={'/home'}>
      <figure className='d-flex justify-content-center'>
      <img src="/logo.svg" alt="KMN Travel logo" className=' rounded-circle'/>
      </figure>
      </Link>

      <div>
        <ul className='list-unstyled text-center'>
        <Link to={"/admin"} className='text-decoration-none  text-black' >
        <li  className='mb-2 py-3 border border-1 border-start-0  border-top-0 border-end-0 bordercheck'>
        {current_path.pathname == '/admin'?<><FontAwesomeIcon className='text-warning' icon={faGauge}/><span className='d-none sideLink d-md-inline activeSide' id='dashboard' onClick={active}> Dashboard</span></>:<><FontAwesomeIcon icon={faGauge}/><span className='d-none sideLink d-md-inline' id='dashboard' onClick={active}> Dashboard</span></>}
            </li>
        </Link>
        
        <li  className='mb-2  py-3 border border-1 border-start-0 border-top-0 border-end-0 bordercheck'>
        <Link to={"/adminTours"}  className='text-decoration-none text-black'>
          {current_path.pathname == '/adminTours'?<><FontAwesomeIcon className='text-warning' icon={faPersonWalkingLuggage}/><span className='d-none d-md-inline activeSide sideLink' id='tours' onClick={active}> Tours</span> </>:<><FontAwesomeIcon icon={faPersonWalkingLuggage}/><span className='d-none d-md-inline sideLink' id='tours' onClick={active}> Tours</span> </>}
          </Link>
            </li>
            <Link to={"/adminTravels"} className='text-decoration-none text-black'>
        <li className='mb-2  py-3 border border-1 border-start-0 border-top-0 border-end-0 bordercheck'>
        {current_path.pathname == '/adminTravels'?<><FontAwesomeIcon className='text-warning' icon={faReceipt}/><span className='d-none d-md-inline activeSide sideLink' id='bookedtours' onClick={active}> Booked Tours</span> </>:<><FontAwesomeIcon icon={faReceipt}/><span className='d-none d-md-inline  sideLink' id='bookedtours' onClick={active}> Booked Tours</span> </>}
            </li>
        </Link>
        <Link to={"/adminDestinations"} className='text-decoration-none text-black'>
        <li className='mb-2  py-3 border border-1 border-start-0 border-top-0 border-end-0 bordercheck'>
       {current_path.pathname == '/adminDestinations'?<><FontAwesomeIcon className='text-warning' icon={faMapLocationDot}/><span className='d-none activeSide d-md-inline sideLink' id='destinations' onClick={active}> Destinations</span> 
 </>:<><FontAwesomeIcon icon={faMapLocationDot}/><span className='d-none d-md-inline sideLink' id='destinations' onClick={active}> Destinations</span></>}
 
            </li>
        </Link>
        <Link to={"/adminRides"} className='text-decoration-none text-black'>
        <li className='mb-2  py-3 border border-1 border-start-0 border-top-0 border-end-0 bordercheck'>
          
        {current_path.pathname == '/adminRides'?<><FontAwesomeIcon className='text-warning' icon={faCarSide}/><span className='d-none d-md-inline activeSide sideLink' id='rides' onClick={active}> Rides</span></>:<><FontAwesomeIcon icon={faCarSide}/><span className='d-none d-md-inline sideLink' id='rides' onClick={active}> Rides</span> </>}

            </li>
        </Link>
        <Link to={"/adminTrip"} className='text-decoration-none text-black'>
        <li className='mb-2  py-3 border border-1 border-start-0 border-top-0 border-end-0 bordercheck'>
       {current_path.pathname == '/adminTrip'?<><FontAwesomeIcon className='text-warning' icon={faReceipt}/><span className='d-none activeSide d-md-inline sideLink' id='trip' onClick={active}> Trip</span> </>:<><FontAwesomeIcon icon={faReceipt}/><span className='d-none d-md-inline sideLink' id='trip' onClick={active}> Trip</span> </>}
            </li>
        </Link>
            <Link to={"/adminCategories"} className='text-decoration-none text-black'>
        <li className='mb-2  py-3 border border-1 border-start-0 border-top-0 border-end-0 bordercheck'>
             {current_path.pathname == '/adminCategories'?<><FontAwesomeIcon className='text-warning' icon={faLayerGroup}/><span className='d-none d-md-inline activeSide sideLink'id='categories' onClick={active}> Categories</span></>:<><FontAwesomeIcon icon={faLayerGroup}/><span className='d-none d-md-inline sideLink'id='categories' onClick={active}> Categories</span></>}
            </li>
        </Link>

        
        
        
        <Link to={"/adminCurrency"} className='text-decoration-none text-black'>
        <li className='mb-2  py-3 border border-1 border-start-0 border-top-0 border-end-0 bordercheck'>
          
        {current_path.pathname == '/adminCurrency'?<><FontAwesomeIcon className='text-warning' icon={faCoins}/><span className='d-none d-md-inline activeSide sideLink' id='currency' onClick={active}> Currency</span></>:<><FontAwesomeIcon icon={faCoins}/><span className='d-none d-md-inline sideLink' id='currency' onClick={active}> Currency</span></>}

            </li>
        </Link>
        <Link to={"/adminUsers"} className='text-decoration-none text-black'>
        <li className='mb-2  py-3 border border-1 border-start-0 border-top-0 border-end-0 bordercheck'>
             
             {current_path.pathname == '/adminUsers'?<><FontAwesomeIcon className='text-warning' icon={faUsers}/><span className='d-none d-md-inline activeSide sideLink'id='users' onClick={active}> Users</span></>:<><FontAwesomeIcon icon={faUsers}/><span className='d-none d-md-inline sideLink'id='users' onClick={active}> Users</span></>}
            </li>
        </Link>
        <Link to={"/adminReviews"} className='text-decoration-none text-black'>
        <li className='mb-2  py-3 border border-1 border-start-0 border-top-0 border-end-0 bordercheck'>
             
             {current_path.pathname == '/adminReviews'?<><FontAwesomeIcon className='text-warning' icon={faComments} /><span className='d-none d-md-inline activeSide sideLink'id='reviews' onClick={active}> Reviews</span></>:<><FontAwesomeIcon icon={faComments} /><span className='d-none d-md-inline sideLink'id='reviews' onClick={active}> Reviews</span></>}
            </li>
        </Link>
        </ul>
    </div>
      </div>
    
    
    
    <div className='d-flex align-items-center'>
    <FontAwesomeIcon icon={faRightFromBracket} className='fa-rotate-180 text-warning'/>
     <button className='btn ms-1' onClick={logout}>
      <span className='d-none d-md-block'>Logout</span>
     </button>
    </div>
  </div>
    </div>
  </div>
  </>
}
