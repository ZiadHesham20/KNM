import axios from 'axios';
import moment from 'moment';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { parsePath, useNavigate, useParams } from 'react-router-dom'

export default function EditTravels() {
 
  const [travelOld, setTravelOld] = useState({travel_id:"",price:"",address:"",bookDate:"",code:"",phoneNumber:"",whatsNumber:"",name:"",count:""})
  const [price,setPrice] = useState(null)
  const [travelId,setTravelId] = useState(null)
  const [name,setName] = useState(null)
  const [address,setAddress] = useState(null)
  const [whats,setWhats] = useState(null)
  const [phone,setPhone] = useState(null)
  const [count,setCount] = useState(null)
  
  const [code,setCode] = useState(null)
  const navigate = useNavigate();

  const {id} = useParams()

  const header = `Bearer ${localStorage.getItem('auth_token')}`;

  async function getTourDetails() { 
    try {
      let {data} = await axios.get(`api/booking/travels/${id}`,{ headers: { Authorization: header } }) 
    
      setTravelOld({...travelOld,travel_id:data.data.travel.id,price:data.data.cost,address:data.data.address,bookDate:data.data.bookDate,code:data.data.code,phoneNumber:data.data.phoneNumber,whatsNumber:data.data.whatsNumber,name:data.data.name,count:data.data.count})  
    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        navigate('/503')
      }
    }
  }
  async function submitMyform(e) {
    e.preventDefault()
    if (id == undefined) {
      const formData = {
        travel_id:travelId,
        userAddress:address,
        bookDate:travelOld.bookDate,
        code:code,
        phone:phone,
        whatsNumber:whats,
        name:name,
        count:count
      };

      await axios.post('api/booking/travels',formData,{ headers: { Authorization: header } })
      navigate('/adminTravels')
    } else {
      await axios.put(`api/booking/travels/${id}`,travelOld,{ headers: { Authorization: header } })
      navigate('/adminTravels')
    }

  }
  useEffect(() => {
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
    
    setTravelOld({...travelOld,bookDate:event.target.value})
    setMinDate(event.target.value);
  };
  return <>
  {travelOld != null?<div className='container'>
  {id == undefined ?<h2 className='fw-bold'>Add Booked Tour</h2>:<h2 className='fw-bold'>Edit Booked Tour</h2>}
  
  <div>
  <form className='py-3' encType='multipart/form-data' onSubmit={submitMyform}>
  <div>
            <div>
            <label htmlFor="travelId" className='fw-semibold'>TravelId</label>
            </div>
            {travelOld != null && id != undefined?<input className='form-control' value={travelOld.travel_id}  type="number" onChange={(e)=>{setTravelOld({...travelOld,travel_id:e.target.value})}} id='travelId' min={0}/>:<input className='form-control' type="number" onChange={(e)=>{setTravelId(e.target.value)}} id='travelId' min={0} required/>}
            </div>
            <div>
            <div>
            <label htmlFor="name" className='fw-semibold'>Name</label>
            </div>
            {travelOld != null && id != undefined?<input className='form-control' value={travelOld.name} type="text" id='name' onChange={(e)=>{setTravelOld({...travelOld,name:e.target.value})}}/>:<input className='form-control' type="text" id='name' onChange={(e)=>{setName(e.target.value)}} required/>}
            </div>
            <div>
            <div>
            <label htmlFor="address" className='fw-semibold'>Address</label>
            </div>
            {travelOld != null && id != undefined?<input className='form-control' value={travelOld.address} type="text" id='address' onChange={(e)=>{setTravelOld({...travelOld,address:e.target.value})}}/>:<input className='form-control' type="text" id='address' onChange={(e)=>{setAddress(e.target.value)}} required/>}
            </div>
            <div>
            <div>
            <label htmlFor="dateTime" className='fw-semibold'>DateTime</label>
            </div>
            {travelOld != null && id != undefined?<input className='form-control'
        type="datetime-local"
        id="futureDate"
        name="futureDate"
        
        value={moment(travelOld.bookDate).toString}
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
            <label htmlFor="phone" className='fw-semibold'>Phone</label>
            </div>
            {travelOld != null && id != undefined?<input className='form-control' type="number" value={parseInt(travelOld.phoneNumber)} id='phone' onChange={(e)=>setTravelOld({...travelOld,phoneNumber:e.target.value})} min={0}/>:<input className='form-control' type="number" id='phone' onChange={(e)=>setPhone(e.target.value)} min={0} required/>}
            </div>
            <div>
            <div>
            <label htmlFor="phone" className='fw-semibold'>Whatsapp</label>
            </div>
            {travelOld != null && id != undefined?<input className='form-control' type="number" value={parseInt(travelOld.whatsNumber)} id='whats' onChange={(e)=>setTravelOld({...travelOld,whatsNumber:e.target.value})} min={0}/>:<input className='form-control' type="number" id='whats' onChange={(e)=>setWhats(e.target.value)} min={0} required/>}
            </div>
            <div>
            <div>
            {/* ???? */}
            {travelOld != null && id != undefined?<label htmlFor="price" className='fw-semibold'>Price</label>:""}

            </div>
            {travelOld != null && id != undefined?<input className='form-control' value={travelOld.price} type="text" id='price' onChange={(e)=>setTravelOld({...travelOld,price:e.target.value})} min={0} />:""}
            </div>
            <div>
            <div>
            <label htmlFor="count" className='fw-semibold'>Count</label>
            </div>
            {travelOld != null && id != undefined?<input className='form-control' value={travelOld.count} type="number" id='count' onChange={(e)=>setTravelOld({...travelOld,count:e.target.value})} min={0} />:<input className='form-control' type="number" id='count' onChange={(e)=>setCount(e.target.value)} min={0} required/>}
            </div>
            <div>
            <div>
            <label htmlFor="currency" className='fw-semibold'>Currency</label>
            </div>
            
            {travelOld != null && id != undefined?<input className='form-control' value={travelOld.code} type="text" id='currency' onChange={(e)=>setTravelOld({...travelOld,code:e.target.value})}/>:<input className='form-control' type="text" id='currency' onChange={(e)=>setCode(e.target.value)} required/>}
            </div>
 {id != null?<button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>Update</button>:<button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>Add</button>}
          </form>
  </div>
  </div>:""}
  </>
}
