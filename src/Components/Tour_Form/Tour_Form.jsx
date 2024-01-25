import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from "jquery";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faPersonWalkingLuggage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';

export default function Tour_Form() {
  let selectedCurr = JSON.parse(localStorage.getItem('selectedCurrency'))
  console.log(selectedCurr);

  const [currencyBase, setCurrencyBase] = useState(selectedCurr == null?{base:'USD',cost:'1.00'}:{base: selectedCurr.selectedCurrencyBase,cost:selectedCurr.selectedCurrencyCost})
  const [tripCost, setTripCost] = useState(null)
  
  const currentDate = new Date();
  // const header = `Bearer ${localStorage.getItem('auth_token')}`;
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
  async function submitMyTrip(e) {
    e.preventDefault();
    await axios.post('api/trips',{
      userName:e.target.userName.value,
      phone:e.target.phone.value,
      whatsNumber:e.target.whatsappNumber.value,
      dateTime:e.target.dateTime.value,
      guest:e.target.guest.value,
      code:e.target.currencycode.value

    }).then((res)=>{
      $('.cardlayer').removeClass('d-none')
    }
      
    ).then(
      setTimeout(()=>{$('.cardlayer').addClass('d-none')},2000)
    ) 
  }
  async function tripPrice() {
    try {
      let {data} = await axios.get('api/trips/price/show')
    setTripCost(data.data)
    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        navigate('/503')
      }
    }
  }
  useEffect(() => {
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
     
     tripPrice()
  }, [])
  return <>
  {tripCost != null?<div className='container mt-5' id='thechange'>
    <div className='row my-5 pt-5 gy-3'>
      <div className='col-lg-8'>
        <div className='d-flex align-items-center'>
        <Link to={"/home"}><FontAwesomeIcon icon={faCircleLeft} size='2x' className='me-3 highlightingcolor'/></Link><h2>Trip Form</h2>

        </div>
        <div>
          <form onSubmit={submitMyTrip}>
            <div>
            <div>
            <label htmlFor="Username" className='fw-semibold'>User Name</label>
            </div>
            <input className='form-control' name='userName' type="text" id='Username' required/>
            </div>
            <div>
            <div>
            <label htmlFor="phone" className='fw-semibold'>Phone</label>
            </div>
            <input required className='form-control' name='phone' type="number" id='phone' min={0}/>
            </div>
            <div>
            <div>
            <label htmlFor="whatsappNumber" className='fw-semibold'>Whatsapp number</label>
            </div>
            <input required className='form-control' name='whatsappNumber' type="number" id='whatsappNumber' min={0}/>
            </div>
            <div>
            <div>
            <label htmlFor="futureDate" className='fw-semibold'>Date & Time</label>
            </div>
            <input className='form-control'
        type="datetime-local"
        id="futureDate"
        name="dateTime"
        value={minDate}
        onChange={handleDateChange}
        min={minDate}
      required/>
            </div>
            <div>
            <div>
            <label htmlFor="guest" className='fw-semibold'>Guest</label>
            </div>
            <input className='form-control' type="number" name='guest' id='guest' min={0} max={3} required/>
            </div>
            <div>
            <div>
            <label htmlFor="currencycode" className='fw-semibold'>Selected currency</label>
            </div>
            <input className='form-control normalCursor' name='currencycode' type="text" id='currencycode' value={currencyBase.base} min={'0'} readOnly />
            </div>
            <button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>Confirm Trip</button>
          </form>
        </div>
      </div>
      <div className='col-lg-4 d-flex justify-content-center align-items-center'>
        <div className=' p-3 w-100 rounded-3 btn-select shadow-sm'>
          <div className='mt-3 mb-5 px-2 py-5 border border-1 border-start-0 border-top-0 border-end-0 bordercheck'>
          <h4><FontAwesomeIcon icon={faPersonWalkingLuggage}  className="me-2 fa-2x"/>Trip In Hurghada</h4>
          </div>
          <div className='p-4 maincolor rounded-3 d-flex align-items-center justify-content-between'>
            <h5>Total </h5>
            <h5 className='fw-bold'>{currencyBase.base == 'USD'?`$ ${tripCost.cost * currencyBase.cost}`:`€ ${(tripCost.cost * currencyBase.cost).toFixed(2)}`}</h5>
          </div>
        </div>
      </div>
    </div>
    <div className='position-fixed cardlayer d-none d-flex justify-content-center p-3 align-items-center top-0 bottom-0 end-0 start-0'>
    <div className="card p-3" >
  <div className="card-body text-center">
    <img src="/icons8-correct.svg" alt="correct" />
    <h5 className="card-title text-center">Your Trip In Hurghada have been booked successfully</h5>
  </div>
 

   
 
</div>
    </div>
  </div>:<div className='vh-100  d-flex justify-content-center'>
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
