import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function AddCurrency() {
  const [currencyOld, setCurrencyOld] = useState({
    name: "",
    symbol: "",
    code: "",
    price: ""
})
const [name, setname] = useState(null)
const [symbol, setSym] = useState(null)
const [code, setCode] = useState(null)
const [price, setprice] = useState(null)
  const header = `Bearer ${localStorage.getItem('auth_token')}`;
  const navigate = useNavigate();
  const {id} = useParams()

  async function getCurrencyDetails() {
    try {
      let {data} = await axios.get(`api/currencies/${id}`)
      setCurrencyOld({...currencyOld,name: data.data.currency,
      symbol: data.data.sym,
      code: data.data.code,
      price: data.data.cost})
    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        navigate('/503')
      }
    }
  }
  async function submitMyform(e) {
    e.preventDefault()
    if (id == undefined) {
    const formData = {...currencyOld,name: name,
    symbol: symbol,
    code: code,
    price: price};
 
      await axios.post('api/currencies',formData,{ headers: { Authorization: header } })
      navigate('/adminCurrency')
    } else {
      
      await axios.put(`api/currencies/${id}`,currencyOld,{ headers: { Authorization: header } })
      navigate('/adminCurrency')
    }
  }
  useEffect(() => {
    if (id != undefined) {
      getCurrencyDetails()
    }
  }, [])
  return  <>
  <div className='container'>
  {id == undefined ?<h2 className='fw-bold'>Add Currency</h2>:<h2 className='fw-bold'>Edit Currency</h2>}
  <div>
  <form className='py-3' encType='multipart/form-data' onSubmit={submitMyform}>
            <div>
            <div>
            <label htmlFor="name" className='fw-semibold'>Name</label>
            </div>
           {currencyOld != null && id != undefined? <input className='form-control' type="text" id='name' value={currencyOld.name} onChange={(e)=>{setCurrencyOld({...currencyOld,name:e.target.value})}}/>: <input className='form-control' type="text" id='name' onChange={(e)=>{setname(e.target.value)}}/>}
            </div>
            <div>
            <div>
            <label htmlFor="symbol" className='fw-semibold'>Symbol</label>
            </div>
            
            {currencyOld != null && id != undefined?<input className='form-control' type="text" id='symbol' value={currencyOld.symbol} onChange={(e)=>{setCurrencyOld({...currencyOld,symbol:e.target.value})}}/>:<input className='form-control' type="text" id='symbol' onChange={(e)=>{setSym(e.target.value)}}/>}
            </div>
            <div>
            <div>
            <label htmlFor="currency" className='fw-semibold'>Currency</label>
            </div>
            {currencyOld != null && id != undefined?<input className='form-control' type="text" id='currency' value={currencyOld.code} onChange={(e)=>{setCurrencyOld({...currencyOld,code:e.target.value})}}/>:<input className='form-control' type="text" id='currency' onChange={(e)=>{setCode(e.target.value)}}/>}
            </div>
            <div>
            <div>
            <label htmlFor="price" className='fw-semibold'>Price</label>
            </div>
            {currencyOld != null && id != undefined?<input className='form-control' type="number" id='price' step='any' value={currencyOld.price} onChange={(e)=>{setCurrencyOld({...currencyOld,price:e.target.value})}}/>:<input className='form-control' type="number" id='price' step='any' onChange={(e)=>{setprice(e.target.value)}}/>}
            </div>
            {id == undefined ?<button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>ADD</button>:<button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>Update</button>}
            <Link to={'/adminCurrency'} className='btn btn-danger border-0 px-4 mx-3'>Cancel</Link>
          </form>
  </div>
  </div>
  </>
}
