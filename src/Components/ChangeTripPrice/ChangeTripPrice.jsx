import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner';

export default function ChangeTripPrice() {
    const [tripOldPrice, settripOldPrice] = useState(null)
    const header = `Bearer ${localStorage.getItem('auth_token')}`;
    async function getOldPrice() {
        let {data} = await axios.get('api/trips/price/show')
        console.log(data);
        settripOldPrice(data.data)
    }
    function submitMyform(e){
        e.preventDefault()
        console.log(e.target.price.value);
        axios.post('api/trips/price/change',{price:e.target.price.value},{ headers: { Authorization: header } })

    }
    useEffect(() => {
        getOldPrice()
    }, [])
    
  return <>
  {tripOldPrice != null?<div className='container '>
<h2>Change Trip Price</h2>
  <div>
  <form className='py-3' encType='multipart/form-data' onSubmit={submitMyform}>
            
            <div>
            <div>
            <label htmlFor="price" className='fw-semibold'>Price</label>
            </div>
            <input className='form-control' name='price' type="number" id='price' defaultValue={tripOldPrice.cost} onChange={(e)=>{settripOldPrice(e.target.value)}}/>
            {/* {tripOldPrice != null ?<input className='form-control' type="number" id='price' value={tripOldPrice.price} onChange={(e)=>{settripOldPrice({...tripOldPrice,price:e.target.value})}}/>:<input className='form-control' type="number" id='price' onChange={(e)=>{setprice(e.target.value)}}/>} */}
            </div>
<button className='btn costume-btn text-black border-0 px-4 my-3'>Change</button>
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
