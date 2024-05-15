import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import $ from "jquery";
import { BallTriangle } from 'react-loader-spinner';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { imagesPath } from '../..';
//Fadel en elsora tetmseh
export default function Photos() {
  const [tours, setTours] = useState([])
  const [pageNumber, setPageNumber] = useState(null)
  const [pageNext, setPageNext] = useState(null)
  const [pagePrev, setPagePrev] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)
  const header = `Bearer ${localStorage.getItem('auth_token')}`;
  const navigate = useNavigate();

  let {id} = useParams()
  async function getTours(){
    let {data} = await axios.get(`api/travels?page=${id}`)
    setPageNext(data.links.next)
    setPagePrev(data.links.prev)
    setPageNumber(data.meta.links)
    setCurrentPage(data.meta.current_page)
    setTours(data.data);
  }
  async function deleteImage(e) {
    e.preventDefault()
    axios.delete(`api/travels/photos/${e.target.id}`,{ headers: { Authorization: header } })
    setTours((currentTours) => {
      const updatedTours = currentTours.map(tour => ({
        ...tour,
        imageUrls: tour.imageUrls.filter(img => img.id != e.target.id)
      }));
      return updatedTours;
    });

    
  }
  useEffect(() => {
    getTours()
  }, [id])
  return <>
  {pageNumber != null?<div className='container'>
  <div className='d-flex align-items-center justify-content-between'>
  <h2 className='fw-bold'>Photos</h2>
  </div>
  <div className='tables'>
  <table className="table" >
<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">Name</th>
    <th scope="col" className='text-center'>Photos</th>
  </tr>
</thead>
<tbody>
{tours != null?tours.map((elem,idx)=><tr key={idx}>
    <th scope="row">{elem.id}</th>
    <td>{elem.name}</td>
    <td><div className='row'>
      {elem.imageUrls.map((img,idx)=><div className='col-md-3' key={idx}>
      <figure className='position-relative'>
        <img src={`${imagesPath + 'photos/' + img.image}`} className='imagelist2  rounded-2' alt="Tour Image" />
        <div className='deleteImage pointer' >
        <img src="/delete_svgrepo.com.svg" className='w-100' id={img.id} alt="Delete Icon" onClick={deleteImage}/>
        </div>
        
      </figure>
      </div>)}
      </div></td>
  </tr>):""}
 
  
</tbody>
</table>

  </div>
  
 
 <nav aria-label="Page navigation example" className='d-flex mt-3 justify-content-center'>
<ul className="pagination">
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
</nav>
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
