import axios from 'axios';
import moment from 'moment';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRides() {
  const [rideOld,setRideOld] = useState({destination_id:"",from:"",to:"",name:"",dateTime:"",guest:"",phoneNumber:"",whatsNumber:"",code:""})
  const [destinations,setDestinations] = useState(null)
  const [destination_Id,setDestination_Id] = useState(null)
  const [toD,setToD] = useState(null)
  const [currency, setCurrency] = useState(null)
  const [code,setCode] = useState(null)
  const [fromD,setFromD] = useState(null)
  const [name,setName] = useState(null)
  const [guest,setGuest] = useState(null)
  const [phoneNumber,setPhoneNumber] = useState(null)
  const [whatsNumber,setWhatsNumber] = useState(null)
  const {id} = useParams()
  const header = `Bearer ${localStorage.getItem('auth_token')}`;
  const navigate = useNavigate();

  async function getDestinations() {
    try {
      let { data } = await axios.get(`api/destinations`)
    console.log(data.data);
    setDestinations(data.data)
    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        navigate('/503')
      }
    }
  }

  async function getTourDetails() {    
    try {
      let {data} = await axios.get(`api/rides/${id}`) 
    
    setRideOld({...rideOld,destination_id:data.data.destination.id,from:data.data.destination.from,to:data.data.destination.to,name:data.data.name,dateTime:data.data.dateTime,guest:data.data.guest,phoneNumber:data.data.phone,whatsNumber:data.data.whatsNumber,code:data.data.code})

    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        navigate('/503')
      }
    }
  }
  async function getCurrencies(){
    try {
      let {data} = await axios.get('api/currencies')
    setCurrency(data.data)
  
    } catch (error) {
      console.log(error.code);
    }
  }
  async function submitMyform(e) {
    e.preventDefault()
    if (id == undefined) {

     await axios.post(`api/rides?destination_id=${destination_Id}&from=${fromD}&to=${toD}&name=${name}&dateTime=${rideOld.dateTime}&guest=${guest}&phoneNumber=${phoneNumber}&whatsNumber=${whatsNumber}&code=${code}`,{ headers: { Authorization: header } })
      navigate('/adminRides')
    } else {
     
      await axios.put(`api/rides/${id}`,rideOld,{ headers: { Authorization: header } })
      navigate('/adminRides')
    }
  }
  useEffect(() => {
    getDestinations()
    getCurrencies()
    if (id != undefined) {
      getTourDetails()
      
    }
  }, [])

  const currentDate = new Date();

  // Add one day to the current date to set the minimum selectable date
  currentDate.setDate(currentDate.getDate() + 1);

  // Format the date to be compatible with the datetime-local input
  const formattedDate = currentDate.toISOString().slice(0, 16);

  // Set the state with the formatted date as the minimum date
  const [minDate, setMinDate] = useState(formattedDate);

  // Handler function to update the state when the input value changes
  const handleDateChange = (event) => {
    setRideOld({...rideOld,dateTime:event.target.value})
    setMinDate(event.target.value);
  };
  return <>
  {rideOld != null && destinations != null && currency != null?<div className='container'>
  {id == undefined ?<h2 className='fw-bold'>Add Ride</h2>:<h2 className='fw-bold'>Edit Ride</h2>}
  <div>
  <form className='py-3' encType='multipart/form-data' onSubmit={submitMyform}>
  <div>
            <div>
            <label htmlFor="destinationId" className='fw-semibold'>Destination</label>
            </div>
            {id != undefined && destinations != null && rideOld != null?<select name="destinations" id='destinationId' value={rideOld.destination_id} className='form-select' onChange={(e)=>{setRideOld({...rideOld,destination_id:e.target.value})}}>
              {destinations.map((elem,idx)=><option key={idx} value={elem.id}>{`${elem.from} ---> ${elem.to}`}</option>)}
            </select>:<select name="destinations" id='destinationId' className='form-select' onChange={(e)=>{
              console.log(e.target.value);
              setDestination_Id(e.target.value)}}>
              <option></option>
              {destinations.map((elem,idx)=><option key={idx} value={elem.id}>{`${elem.from} ---> ${elem.to}`}</option>)}
            </select>}
            </div>
            <div>
            <div>
            <label htmlFor="name" className='fw-semibold'>Name</label>
            </div>
            {rideOld != null && id != undefined?<input className='form-control' value={rideOld.name} type="text" id='name' onChange={(e)=>{setRideOld({...rideOld,name:e.target.value})}}/>:<input className='form-control' type="text" id='name' onChange={(e)=>{setName(e.target.value)}} required/>}
            </div>
            <div>
            <div>
            <label htmlFor="from" className='fw-semibold'>From</label>
            </div>
            {id != undefined && destinations != null && rideOld != null?<select disabled onChange={(e)=>{setRideOld({...rideOld,from:e.target.value})}} name="from" id='from' value={rideOld.from} className='form-select'>
              {destinations.map((elem,idx)=><option key={idx} value={elem.from}>{elem.from}</option>)}
            </select>:<select onChange={(e)=>{setFromD(e.target.value)}} name="from" id='from' className='form-select'>
              <option></option>
              {destinations.map((elem,idx)=><option key={idx} value={elem.from}>{elem.from}</option>)}
            </select>}
            </div>
            <div>
            <div>
            <label htmlFor="to" className='fw-semibold'>To</label>
            </div>
        
            {id != undefined && destinations != null && rideOld != null?<select disabled onChange={(e)=>{setRideOld({...rideOld,to:e.target.value})}} name="to" id='to' value={rideOld.to} className='form-select'>
              {destinations.map((elem,idx)=><option key={idx} value={elem.to}>{elem.to}</option>)}
            </select>:<select onChange={(e)=>{setToD(e.target.value)}} name="to" id='to' className='form-select'>
              <option></option>
              {destinations.map((elem,idx)=><option key={idx} value={elem.to}>{elem.to}</option>)}
            </select>}
            </div>
            <div>
            <div>
            <label htmlFor="dateTime" className='fw-semibold'>Ride Date</label>
            </div>
            {rideOld != null && id != undefined?<input className='form-control'
        type="datetime-local"
        id="futureDate"
        name="futureDate"
        value={moment(rideOld.dateTime).toString}
        onChange={handleDateChange}
        min={minDate}
      />:<input className='form-control'
      type="datetime-local"
      id="futureDate"
      name="futureDate"
      onChange={handleDateChange}
      min={minDate}
    required/>}
            </div>
            <div>
            <div>
            <label htmlFor="guest" className='fw-semibold'>Guest</label>
            </div>
            {rideOld != null && id != undefined ?<input className='form-control' type="number" id='guest' name='guest' value={rideOld.guest} onChange={(e)=>{setRideOld({...rideOld,guest:e.target.value})}}/>:<input className='form-control' type="number" id='guest' name='guest' onChange={(e)=>{setGuest(e.target.value)}} required/>}
            </div>
            <div>
            <div>
            <label htmlFor="phone" className='fw-semibold'>Phone</label>
            </div>
            
            {rideOld != null && id != undefined ?<input className='form-control' type="number" id='phone' name='phone' value={parseInt(rideOld.phoneNumber)} onChange={(e)=>{setRideOld({...rideOld,phoneNumber:e.target.value})}}/>:<input className='form-control' type="number" id='phone' name='phone' onChange={(event)=>{setPhoneNumber(event.target.value)}} required/>}

            </div>
            <div>
            <div>
            <label htmlFor="whats" className='fw-semibold'>Whatsapp</label>
            </div>
            {rideOld != null && id != undefined ?<input className='form-control' type="number" id='whats' min={0} value={parseInt(rideOld.whatsNumber)} onChange={(e)=>{setRideOld({...rideOld,whatsNumber:e.target.value})}}/>:<input className='form-control' type="number" id='whats' name='whats' onChange={(event)=>{setWhatsNumber(event.target.value)}} required/>}

            </div>
            <div>
            <div>
            <label htmlFor="code" className='fw-semibold'>Currency</label>
            </div>
            {/* {rideOld != null && id != undefined?<input className='form-control' type="text" name='code' id='code' value={rideOld.code} onChange={(e)=>{setRideOld({...rideOld,code:e.target.value})}}/>:<input onChange={(e)=>{setCode(e.target.value)}} className='form-control' type="text" name='code' id='code' required/>} */}
            
            { id != undefined ?
            
  <select
    className='btn btn-outline-light px-4 currencylist bg-white btn-select text-black'
    value={rideOld.code}
    id='code'
    name='code'
    onChange={(e)=>{setRideOld({...rideOld,code:e.target.value})}}
    
  >
   
    {currency.map((elem, idx) => (
      <option key={idx} className='text-center text-black pointer' value={elem.code}>{elem.code}</option>
    ))}
  </select>
  :
  <select required
    className='btn btn-outline-light px-4 currencylist btn-select bg-white text-black'
    id='code'
    name='code'
    onChange={(e) => { console.log(e.target.value)
      setCode(e.target.value) }}
  >
         <option className='text-center text-black pointer'></option>
    {currency.map((elem, idx) => 
      <option key={idx} className='text-center text-black pointer' value={elem.code} data-cost={elem.cost}>{elem.code}</option>
    
    )}
  </select>
}
            </div>
          
            
            {id != null?<button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>Update</button>:<button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>Add</button>}
          </form>
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
