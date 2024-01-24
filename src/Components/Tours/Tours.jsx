import React, { useEffect } from 'react'
import $ from "jquery";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { BallTriangle } from 'react-loader-spinner';

export default function Tours() {
  const [category, setCategory] = useState(null)
  const [tours, setTours] = useState(null)
  const navigate = useNavigate();
//  azabt el filter
  async function getCategory(){
    try {
      let {data} = await axios.get('api/categories')
    setCategory(data.data);
    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        navigate('/503')
      }
    }
  }
  async function getTours(){
    
    try {
      let {data} = await axios.get('api/travels')
    
    setTours(data.data);
    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        navigate('/503')
      }
    }
  }
 async function getCatType(e) {
  let selected = e.target.value 
    if (selected == 'All') {
      let {data} = await axios.get('api/travels')
    
    setTours(data.data);
    }else{
      let {data} = await axios.get(`api/travels/by-category/${e.target.value}`)
    setTours(data.data)
    }
  }


    let ww = $(window).width()
    
    
    useEffect(() => {
      window.scrollTo(0,0)
      getCategory()
getTours()
    }, [])
  return <>
  {tours != null?<>
    <section className='container-fluid mt-5 mt-md-0 pt-md-0'>
    <div className='row position-relative'>
      <div className='col-12 px-0'>
        <div>
          <figure >
          <img src="./beach6.png" className='w-100 position-relative' alt="hero" />
          {ww <= 600? <h4 className='text-center w-75 hone2 fw-semibold text-uppercase'>Tours</h4>:<h2 className='text-center w-75 display-5 hone2 fw-semibold text-uppercase'>Tours</h2>}

          
          </figure>
        </div>
      </div>
    </div>
  </section>
  <section className='container py-5' id='thechange'>
    <div className='my-3'>
    <select className="form-select text-center" onChange={getCatType} aria-label="Default select example">
  <option className='text-center'>All</option>
  {category != null? category.map((elem,idx)=><option key={idx} className='text-center'>{elem.slug}</option>):""}
</select>
    </div>
    <div className='row gy-3'>
       {tours != null ?tours.map((elem,idx)=> <div className='col-md-3' key={idx}>
            <div>
            <div className='container '>
          <div className='position-relative d-flex imghi '>
            <figure className='position-absolute  top-0 bottom-0'>
            <img src={elem.imageUrls[0] != null?`storage/photos/${elem.imageUrls[0].image}`:""} className='w-100 imghi rounded-1' alt="Tour Image" />
            </figure>
            
            <div className='container rounded-1 slideslayer z-1'>
            <div className="row pt-2 h-100 text-white">
                <div className='col-12 mb-5'>
                    <div className='d-flex justify-content-between p-3'>
                        <div className='maincolor p-1 rounded-2 fw-semibold' style={{'fontSize':'small'}}>
                        POPULAR
                        </div>
                        <div className='fw-light'>
                            From <span className='fw-semibold'>${elem.cost}</span>
                        </div>
                    </div>
                </div>
                <div className='col-12 pb-3 d-flex gap-3 mt-auto justify-content-center flex-wrap mb-2'>
                <div className='ps-3'>
                        <h5>{elem.name}</h5>
                    </div>
                    <div className='d-flex '>
                    <div className='d-flex align-items-center me-2'>
                    <i className="fa-regular fa-clock me-2"></i> {elem.period} hours
                    </div>
                    <div>
                    <FontAwesomeIcon icon={faStar} className='text-warning'/>
                    <FontAwesomeIcon icon={faStar} className='text-warning'/>
                    <FontAwesomeIcon icon={faStar} className='text-warning'/>
                    <FontAwesomeIcon icon={faStar} className='text-warning'/>
                    <FontAwesomeIcon icon={faStar} className='text-warning'/>
                    5/5
                    </div>
                    </div>
                    <Link className='btn btn-outline-primary border-white m w-75 text-white d-flex align-items-center justify-content-center' to={`/tourdetails/${elem.slug}`}>More Information<FontAwesomeIcon icon={faArrowRight} className='ms-2'/></Link>
                </div>
                
            </div>
          </div>
          </div>
          </div>
            </div>
         </div>):""}
    </div>
  </section>
  </>:<div className='vh-100 d-flex justify-content-center'>
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
