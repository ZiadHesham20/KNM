import { faArrowAltCircleLeft, faCar, faCircleLeft, faLocationDot, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import $ from "jquery";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Form() {

  const currentDate = new Date();

  let selectedCurr = JSON.parse(localStorage.getItem('selectedCurrency'))
  const [currencyBase, setCurrencyBase] = useState(selectedCurr == null?{base:'USD',cost:'1.00'}:{base: selectedCurr.selectedCurrencyBase,cost:selectedCurr.selectedCurrencyCost})
  const [bookedRide, setBookedRide] = useState(null)

  const [currentDestinations, setCurrentDestinations] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
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

  async function getDestinations() {
try {
  let {data} = await axios.get('api/destinations')
setCurrentDestinations(data.data.filter(elem=>elem.from == JSON.parse(localStorage.getItem('selectedDestinations')).from && elem.to == JSON.parse(localStorage.getItem('selectedDestinations')).to))
setLoading(false)
} catch (error) {
  if (error.code == 'ERR_NETWORK') {
    navigate('/503')
  }
}
    
  }
  async function handlRideForm(e) {
    e.preventDefault()
    await axios.post('api/rides',{
      destination_id: e.target.id.value,
      from: e.target.from.value,
      to: e.target.to.value,
      name:e.target.name.value,
    phoneNumber: e.target.phone.value,
    whatsNumber: e.target.phone.value,
      dateTime: e.target.dateTime.value,
      guest: e.target.guest.value,
      code: e.target.currencycode.value,
      price: e.target.price.value
    }).then((res)=>{
      setBookedRide(res.data.data)
      $('.cardlayer').removeClass('d-none')
    }
      
    )
    
  }
  function closeReceipt(){
    $('.cardlayer').addClass('d-none')
  }


  useEffect(() => {
    window.scrollTo(0,0)
    window.scrollTo(0,0)
    $('#currencychange').on("change",function(e){
      setCurrencyBase({
        base:e.target.value,
        cost:e.target.selectedOptions[0].getAttribute('data-cost')
      })
      
    
     })
    $('nav').removeClass('bg-transparent')
      $('nav').addClass('bg-white')
     $('nav').addClass("shadow-sm");
     $('.navtext').css("color","black");
     $('.currencylist').css("color","black");
     getDestinations()
  }, [])
  return <>
  {loading?<div className='vh-100 d-flex justify-content-center'>
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
    </div>:currentDestinations.length != 0 ?<div className='container mt-5' id='thechange'>
    <div className='row my-5 pt-5 gy-3 align-items-center'>
    <div className='col-lg-8'>
        <div className='d-flex align-items-center'>
        <Link to={"/home"}><FontAwesomeIcon icon={faArrowAltCircleLeft} className='fa-2x me-3 highlightingcolor'/></Link><h2>Ride Form</h2>

        </div>
        <div>
          <form className='pt-md-5' id='rideform' onSubmit={handlRideForm}>
          <div>
            <div>
            <label htmlFor="name" className='fw-semibold'>Name</label>
            </div>
            <input className='form-control' name='name' type="text" id='name'/>
            </div>
            <div>
            <div>
            <label htmlFor="phone" className='fw-semibold'>Phone</label>
            </div>
            <input className='form-control' name='phone' type="number" id='phone' min={0}/>
            </div>
            <div>
            <div>
            <label htmlFor="whatsappNumber" className='fw-semibold'>Whatsapp Number</label>
            </div>
            <input className='form-control' name='whatsappNumber' type="number" id='whatsappNumber' min={0}/>
            </div>
            <div className='my-3'>
            <div>
            <label htmlFor="date" className='fw-semibold'>Ride Date</label>
            </div>
            <input className='form-control'
        type="datetime-local"
        id="futureDate"
        name="dateTime"
        defaultValue={JSON.parse(localStorage.getItem('selectedDestinations')).dateTime}
        onChange={handleDateChange}
        min={minDate}
      />
            </div>
            <div>
            <div>
            <label htmlFor="guest" className='fw-semibold'>Guest</label>
            </div>
            <input className='form-control' type="number" name='guest' id='guest' min={1} max={3}/>
            </div>
            <div>
            <div>
            <label htmlFor="currencycode" className='fw-semibold'>Currency</label>
            </div>
            <input className='form-control normalCursor' name='currencycode' type="text" id='currencycode' value={currencyBase.base} min={'0'} readOnly/>
            </div>
            <button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>Confirm Ride</button>
          </form>
        </div>
      </div>
      <div className='col-lg-4'>
        <div className=' p-3 rounded-3 btn-select shadow-sm'>
          <div className='my-3 p-2 border border-1 border-start-0 border-top-0 border-end-0 bordercheck'>
          <h4><FontAwesomeIcon icon={faCar}/> Economy Sedan</h4>
          </div>
          <div className='p-2 bg-white mt-3 rounded-3'>
            <h5>From</h5>

            {currentDestinations != null? <input type="number" name='id' form='rideform' value={currentDestinations[0].id} hidden/>:""}
            <input type="text" name='from' value={JSON.parse(localStorage.getItem('selectedDestinations')).from} form='rideform' hidden/>
            <p><FontAwesomeIcon icon={faLocationDot} className="highlightingcolor"/> {JSON.parse(localStorage.getItem('selectedDestinations')).from}</p>
          </div>
          <div className='p-2 bg-white rounded-3'>
            <h5>To</h5>
            <input type="text"  name='to' value={JSON.parse(localStorage.getItem('selectedDestinations')).to} form='rideform' hidden/>
            <p><FontAwesomeIcon icon={faLocationDot} className="highlightingcolor"/> {JSON.parse(localStorage.getItem('selectedDestinations')).to}</p>
          </div>
          <div className='p-4 maincolor rounded-3 d-flex align-items-center justify-content-between'>
            <h5>Total </h5>
            <input type="number" name="price" form='rideform' value={currentDestinations != null ?currencyBase.base == 'USD'? currentDestinations[0].cost * currencyBase.cost:(currentDestinations[0].cost * currencyBase.cost).toFixed(2):""} hidden/>
            <h5 className='fw-bold'>{currentDestinations != null ?currencyBase.base == 'USD'?`$ ${currentDestinations[0].cost * currencyBase.cost}`:`€ ${(currentDestinations[0].cost * currencyBase.cost).toFixed(2)}`:""}</h5>
          </div>
        </div>
      </div>
    </div>
    <div className='position-fixed cardlayer d-none  d-flex justify-content-center p-3 align-items-center '>
    <div className="card p-3" >
    <FontAwesomeIcon icon={faX} className='ms-auto pointer' onClick={closeReceipt}/>
  <div className="card-body text-center">
    <img src="/icons8-correct.svg" alt="correct" />
    <h5 className="card-title text-center">Your Tour have been booked successfully</h5>
  </div>
  
  
    {bookedRide != null? <div> 
      {console.log(bookedRide)}
      <p className='fw-semibold'>User Name: <span className='fw-normal'>{bookedRide.name}</span></p> 
        <p className='fw-semibold'>From: <span className='fw-normal'>{bookedRide.from}</span></p> 
        <p className='fw-semibold'>To: <span className='fw-normal'>{bookedRide.to}</span></p> 
        <p className='fw-semibold'>Phone: <span className='fw-normal'>{bookedRide.phone}</span></p> 
        <p className='fw-semibold'>Whatsapp Number: <span className='fw-normal'>{bookedRide.whatsNumber}</span></p> 
        <p className='fw-semibold'>Guest: <span className='fw-normal'>{bookedRide.guest}</span></p> 
        <p className='fw-semibold'>Ride Date: <span className='fw-normal'>{bookedRide.dateTime}</span></p> 
        <hr className='w-100'/>
        <div className='d-flex justify-content-between align-items-center'>
        <p className='fw-semibold'>Total: <span className='fw-normal'>{currencyBase.base == 'USD'?`$ ${bookedRide.cost * currencyBase.cost}`:`€ ${(bookedRide.cost * currencyBase.cost).toFixed(2)}`}</span></p>
        <p className='fw-semibold'>{bookedRide.code}</p> 
        </div>
    </div>:""}

   
 
</div>
    </div>
  </div>:<div className='container mt-5' id='thechange'>
    <div className='row my-5 pt-5 gy-3 '>
      <div className='col-12 vh-100 d-flex justify-content-center align-items-center'>
        <div>
          <figure>
            <img src="/No data-pana.svg" className='w-100' alt="Not available" />
          </figure>
        <h3>This ride is not available</h3>
        <div className='d-flex align-items-center justify-content-center btn btn-warning'>
        <Link to='https://api.whatsapp.com/send/?phone=201270490987&text&type=phone_number&app_absent=0' className='text-decoration-none text-black d-flex align-items-center'><FontAwesomeIcon className='fa-2x me-2' icon={faWhatsapp} /><span>Book Special Ride</span></Link>
        </div>
        </div>
      </div>
    </div>
  </div>}

  </>
}
