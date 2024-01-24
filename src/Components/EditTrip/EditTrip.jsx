import axios from 'axios';
import moment from 'moment';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom'

export default function EditTrip() {
  const [tripOld, setTripOld] = useState({userName:'',code:'',phone:'',dateTime:'',guest:'',whatsNumber:''})
  const [userName, setUserName] = useState(null)
  const [code, setCode] = useState(null)
  const [guest, setGuest] = useState(null)
  const [whatsNumber, setWhatsNumber] = useState(null)
  const [phone, setPhone] = useState(null)
  const [currency, setCurrency] = useState(null)
  const header = `Bearer ${localStorage.getItem('auth_token')}`;
  const navigate = useNavigate();
  const {id} = useParams()

  async function getCurrencies(){
    try {
      let {data} = await axios.get('api/currencies')
    setCurrency(data.data)
  
    } catch (error) {
      console.log(error.code);
    }
  }
  async function getTripDetails() {
        try {
          let {data} = await axios.get(`api/trips/${id}`,{ headers: { Authorization: header } }) 
          setTripOld({...tripOld,userName:data.data.name,code:data.data.code,dateTime:data.data.dateTime,guest:data.data.guest,whatsNumber:data.data.whatsNumber,phone:data.data.phoneNumber})
          console.log(data.data.dateTime);      
        } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        navigate('/503')
      }
    }
  }
  async function submitMyform(e) {
    e.preventDefault()
    //add
    if (id == undefined) {

      const formData = {
        userName:userName,
        code:code,
        dateTime:tripOld.dateTime,
        guest:guest,
        whatsNumber:whatsNumber,
        phone:phone
      };

      await axios.post('api/trips',formData,{ headers: {Authorization: header} })
    navigate('/adminTrip')
    }
    //update
     else {
      
console.log(tripOld);
      await axios.put(`api/trips/${id}`,tripOld,{ headers: { Authorization: header } })
      navigate('/adminTrip')
    }
  }

  const currentDate = new Date();

  // Add one day to the current date to set the minimum selectable date
  currentDate.setDate(currentDate.getDate() + 1);

  // Format the date to be compatible with the datetime-local input
  const formattedDate = currentDate.toISOString().slice(0, 16);

  // Set the state with the formatted date as the minimum date
  const [minDate, setMinDate] = useState(formattedDate);


  // Handler function to update the state when the input value changes
  const handleDateChange = (event) => {
    setTripOld({...tripOld,dateTime:event.target.value})
    setMinDate(event.target.value);
  };
  useEffect(() => {
    if (id != undefined) {
      getTripDetails()
      
    }
    getCurrencies()
  }, [])
  
  return  <>
  {tripOld != null && currency != null?<div className='container'>
  {id == undefined ?<h2 className='fw-bold'>Add Trip</h2>:<h2 className='fw-bold'>Edit Trip</h2>}
  <div>
  <form className='py-3' encType='multipart/form-data' onSubmit={submitMyform}>
  <div>
            <div>
            <label htmlFor="userName" className='fw-semibold'>UserName</label>
            </div>
            {tripOld != null && id != undefined ?<input className='form-control' type="text" id='userName' name='userName' value={tripOld.userName} onChange={(e)=>{setTripOld({...tripOld,userName:e.target.value})}}/>:<input className='form-control' type="text" onChange={(e)=>{setUserName(e.target.value)}} required/>}
            </div>
            <div>
            <div>
            <label htmlFor="dateTime" className='fw-semibold'>DateTime</label>
            </div>
                  {tripOld != null && id != undefined?<input className='form-control'
        type="datetime-local"
        id="futureDate"
        name="futureDate"
        value={tripOld.dateTime}
        onChange={handleDateChange}
        min={minDate}
        
      />:<input className='form-control'
      type="datetime-local"
      id="futureDate"
      name="futureDate"
      onChange={handleDateChange}
      min={minDate}
      required
    />}

            </div>
            <div>
            <div>
            <label htmlFor="phone" className='fw-semibold'>Whatapp</label>
            </div>
            
            {tripOld != null && id != undefined ?<input className='form-control' type="number" id='whats' name='whats' value={parseInt(tripOld.whatsNumber)} onChange={(e)=>{setTripOld({...tripOld,whatsNumber:e.target.value})}}/>:<input className='form-control' type="number" id='whats' name='whats' onChange={(event)=>{setWhatsNumber(event.target.value)}} required/>}

            </div>
            <div>
            <div>
            <label htmlFor="phone" className='fw-semibold'>Phone</label>
            </div>
            
            {tripOld != null && id != undefined ?<input className='form-control' type="number" id='phone' name='phone' value={parseInt(tripOld.phone)} onChange={(e)=>{setTripOld({...tripOld,phone:e.target.value})}}/>:<input className='form-control' type="number" id='phone' name='phone' onChange={(event)=>{setPhone(event.target.value)}} required/>}

            </div>
            <div>
            <div>
            <label htmlFor="currency" className='fw-semibold'>Currency</label>
            </div>
            
{tripOld != null && id != undefined ?
  <select
    className='btn btn-outline-light px-4 currencylist btn-select text-black'
    defaultValue={tripOld.code}
    id='currencychange'
    onChange={(e) => { setTripOld({...tripOld,code:e.target.value}) }}
    
  >
   
    {currency.map((elem, idx) => (
      <option key={idx} className='text-center text-black pointer' value={elem.code}>{elem.code}</option>
    ))}
  </select>
  :
  <select
    className='btn btn-outline-light px-4 currencylist btn-select text-black'
    id='currencychange'
    onChange={(e) => { setCode(e.target.value) }}
  >
    {currency.map((elem, idx) => (
      <option key={idx} className='text-center text-black pointer' value={elem.id} data-cost={elem.cost}>{elem.code}</option>
    ))}
  </select>
}
            </div>
            <div>
            <div>
            <label htmlFor="guest" className='fw-semibold'>Guest</label>
            </div>
            {tripOld != null && id != undefined ?<input className='form-control' type="number" id='guest' name='guest' value={tripOld.guest} onChange={(e)=>{setTripOld({...tripOld,guest:e.target.value})}}/>:<input className='form-control' type="number" id='guest' name='guest' onChange={(e)=>{setGuest(e.target.value)}} required/>}
            </div>
                        {id != null?<button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>Update</button>:<button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>Add</button>}

          </form>
  </div>
  </div>:<div className='vh-100 d-flex justify-content-center align-items-center'>
  <div  id='thechange'><BallTriangle
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
