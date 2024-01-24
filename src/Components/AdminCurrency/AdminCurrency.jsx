import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { Link, useNavigate, useParams } from 'react-router-dom'
import $ from "jquery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function AdminCurrency() {
  const [currencies, setCurrencies] = useState(null)
  const [selectToDel, setSelectToDel] = useState(null)
  const header = `Bearer ${localStorage.getItem('auth_token')}`;
  const navigate = useNavigate();

  //Modal control
  const delForm = useRef()
  const delForm2 = useRef()
  function openModal(e){
    setSelectToDel(e.target.id)
    $('.deletesure').removeClass('d-none').addClass('d-flex')
    $('.pagination').addClass('d-none')
    
  }
  function closeModal(e){
    setSelectToDel(e.target.id)
    $('.deletesure').removeClass('d-flex').addClass('d-none')
    $('.pagination').removeClass('d-none')
    
  }
  let modal = delForm.current;
  function handelclose(event) {
    if (event.target != modal && event.target != delForm2.current) {
      
      $('.deletesure').removeClass('d-flex').addClass('d-none')
    }
  }

  let {id} = useParams()
  async function getCurrencies(){
    
    try {
      let {data} = await axios.get('api/currencies')
    setCurrencies(data.data);
    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        navigate('/503')
      }
    }
  }
  async function deleteCur(e) {
    e.preventDefault()
    await axios.delete(`api/currencies/${selectToDel}`,{ headers: { Authorization: header } })
    $('.modal').removeClass('show')
    $('.modal-backdrop').addClass('d-none')
    const newCurrencies = currencies.filter((elem)=>elem.id != selectToDel)
    setCurrencies(newCurrencies);
  }
  useEffect(() => {
    getCurrencies()
  }, [id])
  return <>
  
  {  currencies != null?<div className='container'>
    <div className='d-flex align-items-center justify-content-between'>
    <h2 className='fw-bold'>Currency</h2>
    <Link to={'/addCurrency'} className='btn btn-outline-warning border-2 text-black px-4 my-3'>Add</Link>
    </div>
    <div className='vh-100 tables'>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Symbol</th>
      <th scope="col">Currency</th>
      <th scope="col">Price</th>
      {localStorage.getItem('role') == 2?<th scope="col" className='text-center'>Options</th>:""}
    </tr>
  </thead>
  <tbody>
    {currencies != null? currencies.map((elem,idx)=><tr key={idx}>
      <th scope="row">{elem.id}</th>
      <td>{elem.currency}</td>
      <td>{elem.sym}</td>
      <td>{elem.code}</td>
      <td>{elem.cost}</td>
        {localStorage.getItem('role') == 2?<td>
          <div className='d-flex align-items-end justify-content-center'>
          <Link to={`/addCurrency/${elem.id}`} className='btn costume-btn text-black border-0 px-4'>Edit</Link>
          <button id={elem.id} onClick={openModal} type="button" className='btn btn-danger border-0 px-4 mx-3'>Delete</button>
          </div>
        </td>:""}
    </tr>):""}
  </tbody>
</table>
    </div>
    <div onClick={handelclose} className='position-fixed deletesure  d-none justify-content-center align-items-center'>
<form onSubmit={deleteCur} >
<div className='bg-white rounded-2 deletIndex'  >
  <div className='d-flex justify-content-between pt-2 ps-2 border border-top-0 border-end-0 border-start-0' >
  <h2 ref={delForm}>Delete</h2>
  <FontAwesomeIcon icon={faX} onClick={closeModal} className='pe-3 pointer'/>
  </div>
  <div className='py-3 px-5' ref={delForm2}>
  <h4>Are you sure?</h4>
  <div className='d-flex justify-content-end pb-3 pe-3'>
        <button type="button" onClick={closeModal} className="btn btn-outline-warning me-3">Close</button>
        <button type="submit" className="btn btn-outline-danger">Yes</button>
      </div>
  </div>
  
</div>
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
