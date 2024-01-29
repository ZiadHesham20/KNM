import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import $ from "jquery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { BallTriangle } from 'react-loader-spinner';

export default function AdminReviews() {
    const header = `Bearer ${localStorage.getItem('auth_token')}`;

    const [reviews, setReviews] = useState(null)
  const [selectToDel, setSelectToDel] = useState(null)
 
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

  
  
  async function deleteReview(e) {
    e.preventDefault()
    await axios.delete(`api/reviews/${selectToDel}`,{ headers: { Authorization: header } })
    $('.modal').removeClass('show')
    $('.modal-backdrop').addClass('d-none')
    const newReviews =reviews.filter((elem)=>elem.id != selectToDel)
    setReviews(newReviews);
  }

    async function getReviews(){
       let {data} = await axios.get('api/reviews',{ headers: { Authorization: header } })
       console.log(data.data);
       setReviews(data.data);
    }
    useEffect(() => {
        getReviews()
    }, [])
    
  return <>
  {reviews != null?<div className='container'>
    <div className='p-2 d-flex align-items-center justify-content-between'>
    <h2 className='fw-bold'>Reviews</h2>
    </div>
    <div className='tables'>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">User_Name</th>
      <th scope="col">Tour_Name</th>
      <th scope="col">Comments</th>
      <th scope="col">Amenties</th>
      <th scope="col">Location</th>
      <th scope="col">Price</th>
      <th scope="col">Service</th>
      <th scope="col">Average</th>
      <th scope="col">Options</th>
    </tr>
  </thead>
  {console.log(reviews)}
  {reviews != null?reviews.map((elem,idx)=><tbody key={idx}>
    <tr>
      <th scope="row"  className='fw-semibold'>{elem.id}</th>
      <th scope="row"  className='fw-semibold'>{elem.user.name}</th>
      <th scope="row"  className='fw-semibold'>{elem.travel.name}</th>
      <th scope="row"  className='fw-semibold'>{elem.review}</th>
      <th scope="row"  className='fw-semibold'>{elem.amenities}</th>
      <th scope="row"  className='fw-semibold'>{elem.location}</th>
      <th scope="row"  className='fw-semibold'>{elem.price}</th>
      <th scope="row"  className='fw-semibold'>{elem.service}</th>
      <th scope="row"  className='fw-semibold'>{elem.average}</th>
        <td>
          <div className='d-flex align-items-center text-center'>
          {localStorage.getItem('role') == 2?<button id={elem.id} onClick={openModal} type="button"  className='btn btn-danger border-0 px-4 mx-3'>Delete</button>:""}
          </div>
        </td>
    </tr>
   
    
  </tbody>):""}
</table>

    </div>
    <div onClick={handelclose} className='position-fixed deletesure  d-none justify-content-center align-items-center'>
<form onSubmit={deleteReview} >
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
