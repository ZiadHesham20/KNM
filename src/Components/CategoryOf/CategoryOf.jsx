import React, { useEffect } from 'react'
import $ from "jquery";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { BallTriangle } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getToursByCategory } from '../../Redux/tourSlice';

export default function CategoryOf() {
    let selectedCurr = JSON.parse(localStorage.getItem('selectedCurrency'))
  const [tours, setTours] = useState(null)
  const [currencyBase, setCurrencyBase] = useState(selectedCurr == null?{base:'USD',cost:'1.00'}:{base: selectedCurr.selectedCurrencyBase,cost:selectedCurr.selectedCurrencyCost})
  const {allTours,loading} = useSelector(state => state.tours)
  const dispatch = useDispatch()
  
  const navigate = useNavigate();
  const {category} = useParams()
  

  function fetchTours(){
    dispatch(getToursByCategory(category))
  }


    let ww = $(window).width()
    
    
    useEffect(() => {
      window.scrollTo(0,0)
      $('#currencychange').on("change",async function(e){
        setCurrencyBase({base:e.target.value,cost:e.target.options[e.target.selectedIndex].getAttribute('data-cost')})
       })
       fetchTours()
    }, [])
  return <>
  {loading != true && allTours != null?<>
    <section className='container-fluid mt-5 mt-md-0 pt-md-0'>
    <div className='row position-relative'>
      <div className='col-12 px-0'>
        <div>
          <figure >
          <img src="/beach6.png" className='w-100 position-relative' alt="hero" />
          {ww <= 600? <h4 className='text-center w-75 hone2 fw-semibold text-uppercase'>{category}</h4>:<h2 className='text-center w-75 display-5 hone2 fw-semibold text-uppercase'>{category}</h2>}

          
          </figure>
        </div>
      </div>
    </div>
  </section>
  <section className='container py-5' id='thechange'>
    <div className='my-3'>
    </div>
    <div className='row gy-3'>
       {allTours.map((elem,idx)=> <div className='col-md-3' key={idx}>
            <Link to={`/tourdetails/${elem.slug}`} className='text-decoration-none'>
            <div>
            <div className='container '>
          <div className='position-relative d-flex imghi '>
            <figure className='position-absolute  top-0 bottom-0'>
            <img src={elem.imageUrls[0] != null?`https://knm.knm-travels.com/storage/app/public/photos/${elem.imageUrls[0].image}`:"/default-image-icon-missing-picture-page-vector-40546530.jpg"} className='w-100 imghi rounded-1 text-black' alt="Tour Image" />
            </figure>
            
            <div className='container rounded-1 slideslayer z-1'>
            <div className="row pt-2 h-100 text-white">
                <div className='col-12 mb-5'>
                    <div className='d-flex justify-content-end p-3'>
                        <div className='fw-light'>
                            From <span className='fw-semibold'>{currencyBase.base == 'USD'?`$ ${elem.cost * currencyBase.cost}`:`€ ${(elem.cost * currencyBase.cost).toFixed(2)}`}</span>
                        </div>
                    </div>
                </div>
                <div className='ps-3 text-center'>
                        <h5>{elem.name}</h5>
                    </div>
                <div className='col-12 pb-3 d-flex gap-3 mt-auto justify-content-center flex-wrap mb-2'>
                
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
                    <button className='btn btn-outline-primary border-white m w-75 text-white d-flex align-items-center justify-content-center' >More Information<FontAwesomeIcon icon={faArrowRight} className='ms-2'/></button>
                </div>
                
            </div>
          </div>
          </div>
          </div>
            </div>
            </Link>
         </div>)}
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
