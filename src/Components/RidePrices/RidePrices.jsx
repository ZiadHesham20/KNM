import { faBriefcase, faCalendar, faCircleXmark, faClock, faHeadset, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import $ from "jquery";
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';

export default function RidePrices() {
    const [currencyBase, setCurrencyBase] = useState({base:'USD',cost:'1.00'})
    const [currentDestinations, setCurrentDestinations] = useState(null)
    const [currentDestinationCost, setCurrentDestinationCost] = useState(null)
  const [destinations, setDestinations] = useState(null)
  
  const navigate = useNavigate();
    const currentDate = new Date();

  // Add one day to the current date to set the minimum selectable date
  currentDate.setDate(currentDate.getDate() + 1);

  // Format the date to be compatible with the datetime-local input
  const formattedDate = currentDate.toISOString().slice(0, 16);

  // Set the state with the formatted date as the minimum date
  const [minDate, setMinDate] = useState(formattedDate);

  // Handler function to update the state when the input value changes
  const handleDateChange = (event) => {
    setMinDate(event.target.value);
  };
  // async function getDestinations() {
  //   try {
  //     let {data} = await axios.get('api/destinations')
  //   setCurrentDestinations(data.data.filter(elem=>elem.from == JSON.parse(localStorage.getItem('selectedDestinations')).from && elem.to == JSON.parse(localStorage.getItem('selectedDestinations')).to))
  //   console.log(data);
  //   } catch (error) {
  //     if (error.code == 'ERR_NETWORK') {
  //       navigate('/503')
  //     }
  //   }
        
  //     }
  
  function submitRideForm(e) {
    e.preventDefault()

    localStorage.setItem("selectedDestinations",JSON.stringify({from:e.target.from.value,to:e.target.to.value}))
    navigate('/rideprices')
  }
  // async function getDestination() {
  //   try {
  //     getDestination()
  //     // let {data} = await axios.get(`api/destinations/${}`)
  //   // setDestinations(data.data)
  //   // //selected destination
  //   // setCurrentDestinations(data.data.filter(elem=>elem.from == JSON.parse(localStorage.getItem('selectedDestinations')).from && elem.to == JSON.parse(localStorage.getItem('selectedDestinations')).to))
  //   // console.log(data.data.filter(elem=>elem.from == JSON.parse(localStorage.getItem('selectedDestinations')).from && elem.to == JSON.parse(localStorage.getItem('selectedDestinations')).to));
  //   } catch (error) {
  //     if (error.code == 'ERR_NETWORK') {
  //       navigate('/503')
  //     }
  //   }
  // }
  async function getDestinations() {
    try {
      let {data} = await axios.get('api/destinations')
    setDestinations(data.data)
    //selected destination
    setCurrentDestinations(data.data.filter(elem=>elem.from == JSON.parse(localStorage.getItem('selectedDestinations')).from && elem.to == JSON.parse(localStorage.getItem('selectedDestinations')).to))
    setCurrentDestinationCost(data.data.filter(elem=>elem.from == JSON.parse(localStorage.getItem('selectedDestinations')).from && elem.to == JSON.parse(localStorage.getItem('selectedDestinations')).to)[0].cost)
    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        navigate('/503')
      }
    }
  }
    useEffect(() => {
        window.scrollTo(0,0)
        $('#currencychange').on("change",async function(e){
            setCurrencyBase({base:e.target.value,cost:e.target.options[e.target.selectedIndex].getAttribute('data-cost')})
           })
           getDestinations()
          //  getDestination()
      }, [])
  return <>
   {currentDestinations != null && currentDestinationCost != null?<div className='container pt-5 mt-5'  id='thechange'>
    
   <div className='row'>
                    <div className='d-flex'>
                        <div className='d-flex align-items-center text-white me-3 mb-2'>
                        <i className="fa-regular fa-calendar me-2 " style={{'color':'#FFCC00'}}></i>
                        <FontAwesomeIcon icon={faCalendar} className='me-2' style={{'color':'#FFCC00'}}/>
                        <span className='smallfont fw-semibold text-black'>Free cancellation</span>
                        </div>
                        <div className='d-flex align-items-center text-white mb-2'>
                        <FontAwesomeIcon icon={faHeadset} className='me-2' style={{'color':'#FFCC00'}}/>
                        <span className='smallfont fw-semibold text-black'>24-hour support</span>
                        </div>
                    </div>
            <div className='col-12 rounded-3 bg-white btn-select shadow py-3'>
                <form className='row align-items-center justify-content-evenly ' onSubmit={submitRideForm}>
                    <div className='col-md-3'>
                    <div className='costumeborder2 pe-3'>
                    <label htmlFor="pickup" className='fw-semibold'>Pickup</label>
                    <select className='form-control' name="from">
                      
                      {destinations != null?destinations.map((elem,idx)=><option key={idx} value={elem.from}>{elem.from}</option>):""}

                    </select>
                    </div>
                    </div>
                    <div className='col-md-1'>
                    <figure className='d-flex justify-content-center align-items-center pt-lg-3 pb-lg-2'>
                        <img src="./switch.svg" className='switch mt-3 mt-md-0'  alt="switch" />
                    </figure>
                    </div>
                    <div className='col-md-3'>
<div className='costumeborder px-3'>
<label htmlFor="dropoff" className='fw-semibold'>Dropoff</label>
                               <select className='form-control' name="to">
                                {destinations != null?destinations.map((elem,idx)=><option key={idx} value={elem.to}>{elem.to}</option>):""}
                    </select>
                    </div>
                    </div>
                    <div className='col-md-3'>
                    <div className='costumeborder2 px-3'>
                    <label htmlFor="date_time" className='fw-semibold'>Date & Time</label>
                    <div>
                    <input className='form-control border-0'
        type="datetime-local"
        id="futureDate"
        name="futureDate"
        value={minDate}
        onChange={handleDateChange}
        min={minDate}
      />
                    </div>
                    </div>
                    </div>
                    <div className='col-md-2 mt-md-0 mt-3 d-flex justify-content-center'>
                    <button type='submit' className='btn costume-btn text-white border-0 p-3 w-100'>Show Prices</button>
                    </div>
                   
                    
                </form>
            </div>
            <div className='d-flex justify-content-end pt-3'>
                        <div className='d-flex align-items-center text-white me-3 mb-2'>
                        <FontAwesomeIcon icon={faCalendar} className='me-2' style={{'color':'#FFCC00'}}/>
                        <span className='smallfont text-black fw-semibold'>Free cancellation</span>
                        </div>
                        <div className='d-flex align-items-center text-white mb-2'>
                        <FontAwesomeIcon icon={faHeadset} className='me-2' style={{'color':'#FFCC00'}}/>
                        <span className='smallfont text-black fw-semibold'>24-hour support</span>
                        </div>
                    </div>
        </div>
        <div className='row py-4 align-items-center justify-content-evenly border border-1 border-end-0 border-start-0 border-top-0'>
            <div className='col-lg-4'>
            <h3>Economy Sedan</h3>
                <div>
                    <figure>
                        <img src="/Frame 6.svg" className='w-100' alt="Car ride" />
                    </figure>
                    
                </div>
            </div>
            <div className='col-lg-4 py-3 d-flex justify-content-center justify-content-lg-end '>
                <div className='border border-1 border-bottom-0 border-top-0 px-4 '>
                    <div className='d-flex justify-content-center'>
                        <div className='d-flex align-items-center me-3'>
                        <FontAwesomeIcon icon={faUser} className='highlightingcolor me-2'/>
                        3
                        </div>
                        <div className='d-flex align-items-center me-3'>
                        <FontAwesomeIcon icon={faBriefcase} className='highlightingcolor me-2'/>
                        3
                        </div>
                    </div>
                    <div className='d-flex align-items-center my-3'>
                    <FontAwesomeIcon icon={faCircleXmark} className='highlightingcolor me-2'/>
                    <span className='fs-6 fw-semibold'>Free cancellation</span>
                    </div>
                    <div className='d-flex align-items-center'>
                    <FontAwesomeIcon icon={faClock} className='highlightingcolor me-2'/>
                    <span className='fs-6 fw-semibold'>Estimated waiting time ...</span>
                    </div>
                </div>
            </div>
            <div className='col-4 d-flex justify-content-center'>
                   <div className='me-5 text-center'>
                    {console.log(Number(currentDestinationCost))}
                    
                   <p className='fw-semibold fs-4'>{currencyBase.base == 'USD'?`$ ${Number(currentDestinationCost) * currencyBase.cost}`:`€ ${(Number(currentDestinationCost) * currencyBase.cost).toFixed(2)}`}</p>
                     {JSON.parse(localStorage.getItem('selectedDestinations')).from != '' && JSON.parse(localStorage.getItem('selectedDestinations')).to != ''?<Link to={'/transferform'} className='btn btn-lg costume-btn text-white fw-semibold border-0 px-5 my-3 my-md-0 rounded-1'>Select</Link>:""} 
                </div>
            </div>
        </div>
       
       
   </div>:<div className='vh-100 d-flex justify-content-center'>
  <div className=' position-fixed loading ' id='thechange'><BallTriangle 
  height={100}
  width={100}
  radius={5}
  color="#FECD27"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/></div>
    </div>}
  </>
}
