import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import $ from "jquery";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BallTriangle } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function AdminTravels() {
  const [travels, setTravels] = useState(null)
  const [pageNumber, setPageNumber] = useState(null)
  const [pageNext, setPageNext] = useState(null)
  const [pagePrev, setPagePrev] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)
  const [selectToDel, setSelectToDel] = useState(null)
  let ww = $(window).width()
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
     $('.pagination').removeClass('d-none')
   }
 }

  let {id} = useParams()

  async function getTrav() {
    
    try {
      let { data } = await axios.get(`api/booking/travel?page=${id}`,{ headers: { Authorization: header } })
    
    setPageNext(data.links.next)
    setPagePrev(data.links.prev)
    setPageNumber(data.meta.links)
    setCurrentPage(data.meta.current_page)
    setTravels(data.data);
    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        navigate('/503')
      }
    }
  }
  async function deleteTrav(e) {
    e.preventDefault()
    await axios.delete(`api/booking/travels/${selectToDel}`,{ headers: { Authorization: header } })
    $('.modal').removeClass('show')
    $('.modal-backdrop').addClass('d-none')
    const newTravels = travels.filter((elem)=>elem.id != selectToDel)
    setTravels(newTravels);

  }
  useEffect(() => {
    getTrav()

    
  }, [id])
  return <>
  {travels != null?<div className='container'>
    <div className='p-2 d-flex justify-content-between'>
    <h2 className='fw-bold'>Booked Tours</h2>
    {localStorage.getItem('role') == 2?<Link to={'/addTravels'} className='btn btn-outline-warning border-2 text-black px-4 my-3'>Add</Link>:""}
    </div>
    <div className='tables'>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">TravelID</th>
      <th scope="col">Phone</th>
      <th scope="col">Whatsapp</th>
      <th scope="col">Currency</th>
      <th scope="col">Address</th>
      <th scope="col">Price</th>
      <th scope="col">DateTime</th>
      <th scope="col">Options</th>
    </tr>
  </thead>
  <tbody>
   {travels.map(((elem,idx)=> <tr key={idx}>
      <th scope="row">{elem.id}</th>
      <td>{elem.travel.id}</td>
      <td>{elem.phoneNumber}</td>
      <td>{elem.whatsNumber}</td>
      <td>{elem.code}</td>
      <td>{elem.address}</td>
      <td>{elem.cost}</td>
      <td>{elem.bookDate}</td>
      <td>
          <div className='d-flex align-items-end justify-content-center'>
          <Link to={`/addTravels/${elem.id}`} className='btn costume-btn text-black border-0 px-4'>Edit</Link>
          <button id={elem.id} onClick={openModal} type="button" className='btn btn-danger border-0 px-4 mx-3'>Delete</button>
          </div>
        </td>
      
    </tr>))}
    
   
    
  </tbody>
</table>

    </div>
    <div onClick={handelclose} className='position-fixed deletesure  d-none justify-content-center align-items-center'>
<form onSubmit={deleteTrav} >
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
<nav aria-label="Page navigation example" className='d-flex mt-3 justify-content-center'>
  <ul className={ww < 600?"pagination pagination-sm":"pagination"}>
  {pageNumber.map((elem, idx) => (
  <li key={idx} className="page-item" aria-label={elem.label}>
    
      {elem.label === "&laquo; Previous" || elem.label === "&raquo; Next" ? (
        // Content to render for "Previous" or "Next"
        <span aria-hidden="true">
          {pagePrev != null?<Link className="page-link text-black" to={`${(parseInt(pagePrev.match(/\d+$/)[0]))}`} >
         {elem.label === "&laquo; Previous" ? '<<' : ">>"}
          </Link>:<Link className="page-link text-black disabled" >
         {elem.label === "&laquo; Previous" ? '<<' : ">>"}
          </Link>}
        </span>
      ):elem.label === "Next &raquo;" || elem.label === "&raquo; Next" ? (
        // Content to render for "Previous" or "Next"
        <span aria-hidden="true">
          {pageNext != null?<Link className="page-link text-black" to={`${(parseInt(pageNext.match(/\d+$/)[0]))}`} >
          {elem.label === "Next &raquo;" ? '>>' : "<<"}
          </Link>:<Link className="page-link text-black disabled" >
          {elem.label === "Next &raquo;" ? '>>' : "<<"}
          </Link>}
        </span>
      ) : (
        // Default content for other cases
        <Link className="page-link text-black" to={`${elem.label}`} >
        <span aria-hidden="true">{elem.label}</span>
        </Link>
      )}
    
  </li>
))}
    
  </ul>
</nav></div>
  :<div className='vh-100 d-flex justify-content-center'>
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
