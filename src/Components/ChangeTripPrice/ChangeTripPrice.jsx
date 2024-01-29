import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import $ from "jquery";

export default function ChangeTripPrice() {
    const [tripOldPrice, settripOldPrice] = useState(null)
    const header = `Bearer ${localStorage.getItem('auth_token')}`;
    async function getOldPrice() {
        try {
          let {data} = await axios.get('api/trips/price/show')
        console.log(data);
        settripOldPrice(data.data)
        } catch (error) {
          console.log(error);
        }
    }
    function submitMyform(e){
        e.preventDefault()
        console.log(e.target.price.value);
        axios.post('api/trips/price/change',{price:e.target.price.value},{ headers: { Authorization: header } })
        .then((res)=>{
          $('.cardlayer').removeClass('d-none')
        }
          
        ).then(
          setTimeout(()=>{$('.cardlayer').addClass('d-none')},2000)
        ) 
    }
    useEffect(() => {
        getOldPrice()
    }, [])
    
  return <>
  <div className='container '>
<h2>Change Trip Price</h2>
  <div>
  <form className='py-3' encType='multipart/form-data' onSubmit={submitMyform}>
            
            <div>
            <div>
            <label htmlFor="price" className='fw-semibold'>Price</label>
            </div>
            {tripOldPrice != null ?<input className='form-control' name='price' type="number" id='price' step="any" defaultValue={tripOldPrice.cost} onChange={(e)=>{settripOldPrice(e.target.value)}}/>:<input className='form-control' name='price' type="number" id='price' step="any" onChange={(e)=>{settripOldPrice(e.target.value)}}/>}
            {/* {tripOldPrice != null ?<input className='form-control' type="number" id='price' value={tripOldPrice.price} onChange={(e)=>{settripOldPrice({...tripOldPrice,price:e.target.value})}}/>:<input className='form-control' type="number" id='price' onChange={(e)=>{setprice(e.target.value)}}/>} */}
            </div>
<button className='btn costume-btn text-black border-0 px-4 my-3'>Change</button>
          </form>
  </div>
  <div className='position-fixed cardlayer d-none d-flex justify-content-center p-3 align-items-center top-0 bottom-0 end-0 start-0'>
    <div className="card p-3" >
  <div className="card-body text-center">
    <img src="/icons8-correct.svg" alt="correct" />
    <h5 className="card-title text-center">Trip price changed successfully</h5>
  </div>
</div>
    </div>
  </div>
  </>
}
