import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function AddDestination() {


  const [tourOld, setTourOld] = useState({price:"",from:"",to:""})

  const [price,setPrice] = useState(null)
  const [toD,setToD] = useState(null)
  const [fromD,setFromD] = useState(null)
  const {id} = useParams()
  const header = `Bearer ${localStorage.getItem('auth_token')}`;
  const navigate = useNavigate();

  async function getTourDetails() {
    try {
      let {data} = await axios.get(`api/destinations/${id}`) 
    setTourOld({...tourOld,price:data.data.cost,to:data.data.to,from:data.data.from})
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
        price: price,
        to: toD,
        from: fromD,
      };
      await axios.post('api/destinations',formData,{ headers: { Authorization: header } })
      navigate('/adminDestinations')
    } else {
      await axios.put(`api/destinations/${id}`,tourOld,{ headers: { Authorization: header } })
      navigate('/adminDestinations')
    }
  }
  useEffect(() => {
    if (id != undefined) {
      getTourDetails()
    }
  }, [])
  

  

  return <>
 

  {tourOld != null ? <div className='container'>
  {id == undefined ?<h2 className='fw-bold'>Add Destination</h2>:<h2 className='fw-bold'>Edit Destination</h2>}
  <div>
  <form className='py-3' encType='multipart/form-data' onSubmit={submitMyform}>
            <div>
            <div>
            <label htmlFor="from" className='fw-semibold'>From</label>
            </div>
            {tourOld != null && id != undefined?<input className='form-control' type="text" name='from' id='from' value={tourOld.from} onChange={(e)=>{setTourOld({...tourOld,from:e.target.value})}}/>:<input onChange={(e)=>{setFromD(e.target.value)}} className='form-control' type="text" name='from' id='from' required/>}
            </div>
            <div>
            <div>
            <label htmlFor="to" className='fw-semibold'>To</label>
            </div>
            {tourOld != null && id != undefined?<input className='form-control' type="text" id='to' name='to' value={tourOld.to} onChange={(e)=>{setTourOld({...tourOld,to:e.target.value})}}/>:<input onChange={(e)=>{setToD(e.target.value)}} className='form-control' name='to' type="text" id='to' required/>}
            </div>
            <div>
            <div>
            <label htmlFor="price" className='fw-semibold'>Price</label>
            </div>
           
            {tourOld != null && id != undefined? <input className='form-control' name='cost' onChange={((e)=>{setTourOld({...tourOld,price:e.target.value})})} value={tourOld.price} type="numer" id='price' />: <input className='form-control' name='cost' onChange={((e)=>{setPrice(e.target.value)})} type="numer" id='price' required/>}
            </div>
            {id == undefined ?<button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>ADD</button>:<button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>Update</button>}
            <Link to={'/adminDestinations'} className='btn btn-danger border-0 px-4 ms-3 my-3'>Cancel</Link>
          </form>
  </div>
  </div>:<div className='vh-100 '>
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
