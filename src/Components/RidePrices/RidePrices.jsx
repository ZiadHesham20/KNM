import { faBriefcase, faCalendar, faCircleXmark, faClock, faHeadset, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import $ from "jquery";
import { BallTriangle } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getDestinations } from '../../Redux/destinationSlice';

export default function RidePrices() {
  let selectedCurr = JSON.parse(localStorage.getItem('selectedCurrency'))
  const [currencyBase, setCurrencyBase] = useState(selectedCurr == null?{base:'USD',cost:'1.00'}:{base: selectedCurr.selectedCurrencyBase,cost:selectedCurr.selectedCurrencyCost})

  const {destinations,selectedDestination,selectedDestinationCost} = useSelector(state => state.destination)
  const dispatch = useDispatch()

  
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
  

  function fetchDestination(){
    dispatch(getDestinations())
    console.log(destinations);

  }

    useEffect(() => {
        window.scrollTo(0,0)
        $('#currencychange').on("change",async function(e){
            setCurrencyBase({base:e.target.value,cost:e.target.options[e.target.selectedIndex].getAttribute('data-cost')})
           })
           fetchDestination()
      }, [])
  return <>
   {selectedDestination != null && selectedDestinationCost != null?<div className='container pt-5 mt-5'  id='thechange'>
    
   <div className='row p-4'>
                    <div className='d-flex'>
                        <div className='d-flex align-items-center text-white me-3 mb-2'>
                        <FontAwesomeIcon icon={faCalendar} className='me-2' style={{'color':'#FFCC00'}}/>
                        <span className='smallfont text-black fw-semibold'>Free cancellation</span>
                        </div>
                        <div className='d-flex align-items-center text-white mb-2'>
                        <FontAwesomeIcon icon={faHeadset} className='me-2' style={{'color':'#FFCC00'}}/>
                        <span className='smallfont text-black fw-semibold'>24-hour support</span>
                        </div>
                    </div>
            <div className='col-12 rounded-3 bg-white btn-select shadow py-3'>
                <div className='row align-items-center justify-content-evenly ' >
                    <div className='col-md-4'>
                    <div className='costumeborder2 px-3'>
                    <label htmlFor="pickup" className='fw-semibold'>Pickup</label>
                    <input type="text" className='form-control' defaultValue={JSON.parse(localStorage.getItem('selectedDestinations')).from} readOnly/>
                    </div>
                    </div>
                    <div className='col-md-1 d-md-block d-none'>
                    <figure className='d-flex justify-content-center align-items-center pt-lg-3 pb-lg-2'>
                        <img src="./switch.svg" className='switch mt-3 mt-md-0'  alt="switch" />
                    </figure>
                    </div>
                    <div className='col-md-4 my-3'>
<div className='costumeborder px-3'>
<label htmlFor="dropoff" className='fw-semibold'>Dropoff</label>
                               
                        <input type="text" className='form-control' defaultValue={JSON.parse(localStorage.getItem('selectedDestinations')).to} readOnly/>
                    </div>
                    </div>
                    <div className='col-md-3'>
                    <div className=' px-3'>
                    <label htmlFor="date_time" className='fw-semibold'>Date & Time</label>
                    <div>
                    <input className='form-control'
        type="datetime-local"
        id="futureDate"
        name="futureDate"
        defaultValue={JSON.parse(localStorage.getItem('selectedDestinations')).dateTime}
      readOnly/>
                    </div>
                    </div>
                    </div>
                    
                   
                    
                </div>
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
            <div className='col-lg-5'>
            <h3>Economy Sedan</h3>
                <div>
                    <figure>
                        <img src="/city-car-blank-surface-your-600nw-423993793-removebg-preview.png" className='w-100' alt="Car ride" />
                    </figure>
                    
                </div>
            </div>
            <div className='col-lg-3 py-3 d-flex justify-content-center justify-content-lg-end '>
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
                    <span className='fs-6 fw-semibold'>Waiting time 30min</span>
                    </div>
                </div>
            </div>
            <div className='col-4 d-flex justify-content-center'>
                   <div className=' text-center'>
                   
                    
                   <p className='fw-semibold fs-4'>{currencyBase.base == 'USD'?`$ ${Number(selectedDestinationCost) * currencyBase.cost}`:currencyBase.base == 'EUR'?`€ ${Number(selectedDestinationCost) * currencyBase.cost}`:`L.E ${Number(selectedDestinationCost) * currencyBase.cost}`}</p>
                     {JSON.parse(localStorage.getItem('selectedDestinations')).from != '' && JSON.parse(localStorage.getItem('selectedDestinations')).to != ''?<Link to={'/transferform'} className='btn btn-lg costume-btn text-white fw-semibold border-0 px-5 mb-3 my-md-0 rounded-1'>Select</Link>:""} 
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
