import React, { useEffect, useRef, useState } from 'react'
import { Await, Link, useNavigate, useParams } from 'react-router-dom';
import $ from "jquery";
import { faArrowRight, faCircleCheck, faClock, faLocationDot, faStar, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styled from '@emotion/styled';
import { Rating } from '@mui/material';
import { Favorite, FavoriteBorder, Star, StarBorder } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../Redux/reviewSlice';
import { getTours } from '../../Redux/tourSlice';
import { imagesPath } from '../..';


export default function TourDetails() {
  let selectedCurr = JSON.parse(localStorage.getItem('selectedCurrency'))
  const [currencyBase, setCurrencyBase] = useState(selectedCurr == null?{base:'USD',cost:'1.00'}:{base: selectedCurr.selectedCurrencyBase,cost:selectedCurr.selectedCurrencyCost})
  
  const [tour, setTour] = useState(null)
  const [bookedTour, setBookedTour] = useState(null)
  const [imageselected, setimageselected] = useState(null)
  const [service, setServiceRate] = useState(null)
  const [amenities, setAmenitiesRate] = useState(null)
  const [location, setLocationRate] = useState(null)
  const [price, setPriceRate] = useState(null)
  const [review, setReview] = useState(null)
  const [activeTab, setActiveTab] = useState('overview');

  const {randomTours} = useSelector(state => state.tours)
  const {reviews} = useSelector(state => state.review)
  const dispatch = useDispatch()

  let ww = $(window).width()
  const header = `Bearer ${localStorage.getItem('auth_token')}`;

  let {id} = useParams()

  let navigate = useNavigate()

  const currentDate = new Date();

  // Add one day to the current date to set the minimum selectable date
  currentDate.setDate(currentDate.getDate() + 1);

  // Format the date to be compatible with the datetime-local input
  const formattedDate = currentDate.toISOString().slice(0, 16);

  // Set the state with the formatted date as the minimum date
  const [minDate, setMinDate] = useState(formattedDate);

  // Handler function to update the state when the input value changes
  const handleDateChange = (event) => {
    setMinDate(event.target.value);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  function getimage(e){
    
    setimageselected(e.target.id)
   
  }
  function fetchTours(){
dispatch(getTours())
  }
  async function getTour() {
    try {
      let {data} = await axios.get(`api/travels/${id}`)
   setTour(data.data)
   setimageselected(data.data.imageUrls[0].image)
    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        navigate('/503')
      }
    }

  }

function fetchReviews(){
  dispatch(getReviews())
}
  function starsCreated(stars) {
    const starArray = [];
    for (let i = 0; i < stars; i++) {
      
      
      starArray.push(<FontAwesomeIcon key={i} icon={faStar} className='text-warning'/>);
      
    }
    return starArray
  }
 
   async function submitMyTravelForm(e) {
    e.preventDefault()
    //if (localStorage.getItem('auth_token') != null) {
      await axios.post('api/booking/travel',{
        name:e.target.name.value,
        count:e.target.count.value,
        travel_id: e.target.id.value,
        bookDate: e.target.bookDate.value,
        userAddress: e.target.userAddress.value,
        phone: e.target.phone.value,
        whatsNumber: e.target.whatsappNumber.value,
        code: e.target.code.value
      }).then((res)=>{
        setBookedTour(res.data.data)
        $('.cardlayer').removeClass('d-none')
      }
        
      )
   
  }
  function closeReceipt(){
    $('.cardlayer').addClass('d-none')
  }
  async function submitMyReview(e) {
    e.preventDefault();
  
    
    
    try {
      await axios.post(`api/reviews?review=${review}&service_rating=${service}&amenities_rating=${amenities}&location_rating=${location}&price_rating=${price}&travel_id=${tour.id}`,null,{ headers: { Authorization: header } })
      alert('Your review has been done successfully')
    } catch (error) {
      
    }

  }
  useEffect((e) => {
    window.scrollTo(0,0)
    $('nav').removeClass('d-none')
        $('footer').removeClass('d-none')
        $('#currencychange').on("change",async function(e){
          setCurrencyBase({base:e.target.value,cost:e.target.options[e.target.selectedIndex].getAttribute('data-cost')})
         })
     getTour() 
     fetchTours()

     fetchReviews()
  }, [id])
  const date = new Date();
  //Time formate 
  const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
//Date short formate 
  const formatters = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });

  
 
  return <>
  {tour != null?<div className='container py-5 px-4 px-md-0 mt-5 position-relative' id='thechange'>
    <div className='row position-relative'>
      <div className='col-lg-8'>
        <div>
         <h2>{tour.name}</h2>
         <div className='row pe-5 my-3'>
          <div className='col-6 text-center costumeborder3 text-md-start  col-md-2 '>
            <div >
            <span className='detaillabel smallfont'>From</span>
            <h5 className='highlightingcolor '>{currencyBase.base == 'USD'?`$ ${tour.cost * currencyBase.cost}`:currencyBase.base == 'EUR'?`€ ${(tour.cost * currencyBase.cost).toFixed(2)}`:`L.E ${(tour.cost * currencyBase.cost).toFixed(2)}`}</h5>
            </div>
          </div>
          <div className='col-6 text-center text-md-start col-md-2 costumeborder3 d-flex justify-content-center'>
            <div>
            <span className='detaillabel smallfont'>Duration</span>
            <p className='fw-bold '>{tour.period} hours</p>
            </div>
          </div>
          {tour.dateTime != null?<div className='col-6 text-center text-md-start col-md-3 costumeborder3 d-flex justify-content-center'>
           <div>
           <span className='detaillabel smallfont'>Tour Date</span>
            <p className='fw-bold smallfont2'>{formatters.format(new Date(tour.dateTime))} {formatter.format(new Date(tour.dateTime))}</p>
           </div>
          </div>:""}
          <div className={`${tour.dateTime == null?'col-12':'col-6'} text-center text-md-start col-md-2`}>
          <div>
          <span className='detaillabel smallfont'>Reviews</span>
          <div className='smallfont'>
          <FontAwesomeIcon icon={faStar} className='text-warning'/>
                    <FontAwesomeIcon icon={faStar} className='text-warning'/>
                    <FontAwesomeIcon icon={faStar} className='text-warning'/>
                    <FontAwesomeIcon icon={faStar} className='text-warning'/>
                    <FontAwesomeIcon icon={faStar} className='text-warning'/>
                    </div>
          </div>
          </div>
         </div>
         <div className='row justify-content-center mb-5'>
          <div className='col-12 mb-3'>

            <div>
              
              <img src={imageselected != null?`${imagesPath + 'photos/' +imageselected}`:"/default-image-icon-missing-picture-page-vector-40546530.jpg"} alt='tourimages' className='tourDetailsSelectedImage '/>
            </div>
          </div>
           
          <Swiper
        slidesPerView={4}
        spaceBetween={30}
        className="mySwiper px-2"
      >
        {tour.imageUrls.map((elem,idx)=><SwiperSlide><div className='col-12 gy-3' key={idx}> <div  style={{'cursor':'pointer'}} >
            <img src={`${imagesPath + 'photos/' +elem.image}`} className='imagelist rounded-2 ' id={elem.image} onClick={getimage}/>
            
          </div></div></SwiperSlide>)}
        
      </Swiper>
         </div>
         <div>
      <ul className='list-unstyled d-flex justify-content-evenly ps-2 ps-md-0'>
        <li onClick={() => handleTabClick('overview')} className={activeTab === 'overview' ? 'active2 fw-semibold btn btn-primary border-white' : 'fw-semibold btn btn-outline-primary text-black rounded-1 notactive mx-2'}>Overview</li>
        <li onClick={() => handleTabClick('plan')} className={activeTab === 'plan' ? 'active2 fw-semibold btn btn-primary border-white px-4' : 'fw-semibold btn btn-outline-primary text-black rounded-1 notactive px-4 mx-2'}>Plan</li>
        <li onClick={() => handleTabClick('location')} className={activeTab === 'location' ? 'active2 fw-semibold btn btn-primary border-white' : 'fw-semibold btn btn-outline-primary text-black rounded-1 notactive mx-2'}>Location</li>
        <li onClick={() => handleTabClick('reviews')} className={activeTab === 'reviews' ? 'active2 fw-semibold btn btn-primary border-white' : 'fw-semibold btn btn-outline-primary text-black rounded-1 notactive mx-2'}>Reviews</li>
      </ul>

      <div>
        {activeTab === 'overview' &&  <div>
      
      <div>
      <h3>Description</h3>
      <p>
        {tour.description}
      </p>
      </div>
      
      </div>}
      </div>
      <div className={activeTab === 'plan' ? '' : 'd-none'}>
        {activeTab === 'plan' &&  <div>
     <h3 className='my-3'>Tour Plan</h3>
     <p>{tour.plan}</p></div>}
      </div>
      <div className={activeTab === 'location' ? '' : 'd-none'}>
        {activeTab === 'location' && <div className='my-3'><h3>Location</h3>
        <p><FontAwesomeIcon icon={faLocationDot}  className="highlightingcolor"/> {tour.address}</p></div>}
      </div>
      <div className={activeTab === 'reviews' ? '' : 'd-none'}>
        {activeTab === 'reviews' && <>
        <form onSubmit={submitMyReview}>
        <div>
      <div>
      <label className='fw-semibold' htmlFor="review">Review</label>
      </div>
      <textarea name="review" id='review' className='w-100 form-control' onChange={(e)=>setReview(e.target.value)} cols="30" rows="5"></textarea>
      <div className='d-flex align-items-center'>
      <p className='pt-3 me-3 fw-semibold'>Service Rating</p>
      <div className="rate">
    <input type="radio" id="service_star5" name="service_rate" value="5" onChange={e=>setServiceRate(e.target.value)}/>
    <label for="service_star5" title="text">5 stars</label>
    <input type="radio" id="service_star4" name="service_rate" value="4" onChange={e=>setServiceRate(e.target.value)}/>
    <label for="service_star4" title="text">4 stars</label>
    <input type="radio" id="service_star3" name="service_rate" value="3" onChange={e=>setServiceRate(e.target.value)}/>
    <label for="service_star3" title="text">3 stars</label>
    <input type="radio" id="service_star2" name="service_rate" value="2" onChange={e=>setServiceRate(e.target.value)}/>
    <label for="service_star2" title="text">2 stars</label>
    <input type="radio" id="service_star1" name="service_rate" value="1" onChange={e=>setServiceRate(e.target.value)}/>
    <label for="service_star1" title="text">1 star</label>
  </div>
      </div>
      <div className='d-flex align-items-center'>
      <p className='pt-3 fw-semibold' >Amenities Rating</p>
      <div className="rate">
    <input type="radio" id="amenities_star5" name="amenities_rate" value="5" onChange={e=>setAmenitiesRate(e.target.value)}/>
    <label for="amenities_star5" title="text">5 stars</label>
    <input type="radio" id="amenities_star4" name="amenities_rate" value="4" onChange={e=>setAmenitiesRate(e.target.value)}/>
    <label for="amenities_star4" title="text">4 stars</label>
    <input type="radio" id="amenities_star3" name="amenities_rate" value="3" onChange={e=>setAmenitiesRate(e.target.value)}/>
    <label for="amenities_star3" title="text">3 stars</label>
    <input type="radio" id="amenities_star2" name="amenities_rate" value="2" onChange={e=>setAmenitiesRate(e.target.value)}/>
    <label for="amenities_star2" title="text">2 stars</label>
    <input type="radio" id="amenities_star1" name="amenities_rate" value="1" onChange={e=>setAmenitiesRate(e.target.value)}/>
    <label for="amenities_star1" title="text">1 star</label>
  </div>
      </div>
      <div className='d-flex align-items-center'>
      <p className='pt-3 me-2 fw-semibold'>Location Rating</p>
      <div className="rate">
    <input type="radio" id="location_star5" name="location_rate" value="5" onChange={e=>setLocationRate(e.target.value)}/>
    <label for="location_star5" title="text">5 stars</label>
    <input type="radio" id="location_star4" name="location_rate" value="4" onChange={e=>setLocationRate(e.target.value)}/>
    <label for="location_star4" title="text">4 stars</label>
    <input type="radio" id="location_star3" name="location_rate" value="3" onChange={e=>setLocationRate(e.target.value)}/>
    <label for="location_star3" title="text">3 stars</label>
    <input type="radio" id="location_star2" name="location_rate" value="2" onChange={e=>setLocationRate(e.target.value)}/>
    <label for="location_star2" title="text">2 stars</label>
    <input type="radio" id="location_star1" name="location_rate" value="1" onChange={e=>setLocationRate(e.target.value)}/>
    <label for="location_star1" title="text">1 star</label>
  </div>
      </div>
      <div className='d-flex align-items-center'>
      <p className='pt-3 me-4 pe-1 fw-semibold'>Price Rating</p>
      <div className="rate">
    <input type="radio" id="price_star5" name="price_rate" value="5" onChange={e=>setPriceRate(e.target.value)}/>
    <label for="price_star5" title="text">5 stars</label>
    <input type="radio" id="price_star4" name="price_rate" value="4" onChange={e=>setPriceRate(e.target.value)}/>
    <label for="price_star4" title="text">4 stars</label>
    <input type="radio" id="price_star3" name="price_rate" value="3" onChange={e=>setPriceRate(e.target.value)}/>
    <label for="price_star3" title="text">3 stars</label>
    <input type="radio" id="price_star2" name="price_rate" value="2" onChange={e=>setPriceRate(e.target.value)}/>
    <label for="price_star2" title="text">2 stars</label>
    <input type="radio" id="price_star1" name="price_rate" value="1" onChange={e=>setPriceRate(e.target.value)}/>
    <label for="price_star1" title="text">1 star</label>
  </div>
      </div>
    </div>
    <button className='btn costume-btn text-white border-0 px-5 my-4 py-2 rounded-1'>Submit</button>
          </form>
          
          {reviews != null?reviews.filter((elem) => elem.travel.id == tour.id).map((elem,idx)=><div key={idx} className='row  my-5 me-0 me-md-3 border border-1 py-3 rounded-2'>
          <div className='col-12 col-md-4'>
            <div>
              <figure>
                {elem.user != null?elem.user.profile_photo != null?<img src={`storage/${elem.user.profile_photo}`} className='w-25 rounded-circle me-3 reviewImage' alt="Default Image" />:<img src="/Default.jpg" className='w-25 rounded-circle me-3' alt="Default Image" />:""}
                {elem.user != null ?elem.user.name:""}
              </figure>
            </div>
          </div>
          <div className='col-12'>
            <div>
              <p>{elem.review}</p>
            </div>
           <div className='d-flex align-items-center justify-content-around'>
           <div className='smallfont'>
              <h5>Price</h5>
          {starsCreated(elem.price)}
                    {elem.price}/5
                    </div>
                    <div className='smallfont'>
              <h5>Amenities</h5>
              {starsCreated(elem.amenities)}
                    {elem.amenities}/5
                    </div>
                    <div className='smallfont'>
              <h5>Location</h5>
              {starsCreated(elem.location)}
                    {elem.location}/5
                    </div>
                    <div className='smallfont'>
              <h5>Service</h5>
              {starsCreated(elem.service)}
                    {elem.service}/5
                    </div>
           </div>
          </div>
          </div>):""}

        </>
          }
      </div>
    
    </div>
   {randomTours != null?<>
    <hr className='w-75 m-auto my-3'/>
    <div className='row my-3 gy-3'>
      <h3 className='my-3'>You May Also Like</h3>
      {randomTours.map((elem,idx)=> <div  className="col-md-6 ">
      <Link key={idx} to={`/tourdetails/${elem.slug}`} className='text-black text-decoration-none linkhover'>
    <div style={{'background':'#F6F8FB'}} className='tourheight'>
    <figure className='overflow-hidden'>
     
{ elem.imageUrls[0] != null ?<img src={`${imagesPath + 'photos/' + elem.imageUrls[0].image}`} className='w-100 imgscale rounded-1' alt="Tour Image" />:<img src="/default-image-icon-missing-picture-page-vector-40546530.jpg" className='w-100 imgscale rounded-1' alt="Tour Image" />}
    </figure>
    <figcaption className='p-4' >
    <h4>{elem.name}</h4>
    <div className='my-3'>
    <span className='me-4'><FontAwesomeIcon icon={faClock} className='text-warning'/> 6 hours</span>
    
                    {/* 541.19 */}
                    <FontAwesomeIcon icon={faStar} className='text-warning'/>
                    <FontAwesomeIcon icon={faStar} className='text-warning'/>
                    <FontAwesomeIcon icon={faStar} className='text-warning'/>
                    <FontAwesomeIcon icon={faStar} className='text-warning'/>
                    <FontAwesomeIcon icon={faStar} className='text-warning'/>
                    5/5      
    </div>
    <div className='pt-3 aftercaption d-flex align-items-center justify-content-between'>
      <div className='pb-1'>
      From {currencyBase.base === 'USD' ? (
  <span className='highlightingcolor fw-semibold fs-5'>$ {elem.cost * currencyBase.cost}</span>
) : currencyBase.base === 'EUR' ? (
  <span className='highlightingcolor fw-semibold fs-5'>€ {(elem.cost * currencyBase.cost).toFixed(2)}</span>
) : currencyBase.base === 'EGP'? (
  <span className='highlightingcolor fw-semibold fs-5'>L.E {(elem.cost * currencyBase.cost).toFixed(2)}</span>
): null}


      </div>
     <div className='randomHover'>
     More Information <FontAwesomeIcon className="fa-solid fa-arrow-right highlightingcolor ms-2" icon={faArrowRight}/>
     </div>
    </div>
    </figcaption>
    </div>
    </Link>
  </div>
  
  )}

      
  
    </div>
   </>:""}
        </div>
      </div>
      
      <div className='col-lg-4 p-4 rounded-3 bookthis' style={{'border': '3px rgb(246, 248, 251) solid'}}>
        <div>
          <h5>Book This Tour</h5>
          <div className='my-3'>
            <form method='post' onSubmit={submitMyTravelForm}>
            <input type="number" name='id' value={tour.id} hidden/>
            <div>
                <div>
                <label htmlFor="name" className='fw-semibold'>Name</label>
                </div>
                <input type="text" name='name' className={`form-control ${ww <= 600?'form-control-sm':''} my-3`} placeholder='Enter name' required/>
              </div>
              <div className='d-flex justify-content-between'>
              <div>
                <div>
                <label htmlFor="phone" className='fw-semibold'>Phone</label>
                </div>
                <input type="number" name='phone' className={`form-control ${ww <= 600?'form-control-sm':''} my-3`} min={"0"} placeholder='Enter Number' required/>
              </div>
              <div>
                <div>
                <label htmlFor="whatsappNumber" className='fw-semibold'>Whatsapp number</label>
                </div>
                <input type="number" name='whatsappNumber' className={`form-control ${ww <= 600?'form-control-sm':''} my-3`} min={"0"} placeholder='Enter Number' required/>
              </div>
              </div>
              <div className='d-flex justify-content-between align-items-center'>
              <div>
                <div>
                <label htmlFor="count" className='fw-semibold'>Guest</label>
                </div>
                <input type="number" name='count' className={`form-control ${ww <= 600?'form-control-sm':''} my-3`} min={"1"} placeholder='Enter count'  required/>
              </div>
              <div>
            <div>
            <label htmlFor="currencycode" className='fw-semibold'>Currency</label>
            </div>
            {/* {ww <= 600? <h4 className='text-center w-75 hone fw-semibold'>Transfers from Hurghada to anywhere in Egypt</h4>:<h1 className='text-center w-75 hone fw-semibold '>Transfers from Hurghada to anywhere in Egypt</h1>} */}

            <input className={`form-control ${ww <= 600?'form-control-sm':''} my-3`} name='code' type="text" id='currencycode' value={currencyBase.base} min={'0'} required/>
            </div>
              </div>
              <div>
                <div>
                <label htmlFor="address" className='fw-semibold'>Address</label>
                </div>
                <input type="text" name='userAddress' className={`form-control ${ww <= 600?'form-control-sm':''} my-3`} placeholder='Enter Address' required/>
              </div>
              <div>
                <div>
                <label htmlFor="date" className='fw-semibold'>Booking Date</label>
                </div>
                <input className={`form-control ${ww <= 600?'form-control-sm':''} my-3`}
        type="datetime-local"
        id="futureDate"
        name="bookDate"
        defaultValue={minDate}
        onChange={handleDateChange}
        min={minDate}
        required
      />
              </div>
              
              <hr className='w-100 my-4'/>
              <button type='submit' className='btn costume-btn text-white border-0 px-5 py-2 rounded-1 w-100'>Book Now <FontAwesomeIcon className='ms-2' icon={faArrowRight}/></button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div className='position-fixed cardlayer d-none z-3  d-flex justify-content-center p-3 align-items-center '>
    <div className="card p-3" >
    <FontAwesomeIcon icon={faX} className='ms-auto pointer' onClick={closeReceipt}/>
  <div className="card-body text-center">
    <img src="/icons8-correct.svg" alt="correct" />
    <h5 className="card-title text-center">Your Tour have been booked successfully</h5>
  </div>
  
  
    {bookedTour != null? <div> 
        <p className='fw-semibold'>Tour Name: <span className='fw-normal'>{bookedTour.travel.name}</span></p> 
        <p className='fw-semibold'>User Name: <span className='fw-normal'>{bookedTour.name}</span></p> 
        <p className='fw-semibold'>Phone: <span className='fw-normal'>{bookedTour.phoneNumber}</span></p> 
        <p className='fw-semibold'>Whatsapp Number: <span className='fw-normal'>{bookedTour.whatsNumber}</span></p> 
        <p className='fw-semibold'>Guest: <span className='fw-normal'>{bookedTour.count}</span></p> 
        <p className='fw-semibold'>Booking Date: <span className='fw-normal'>{bookedTour.bookDate}</span></p> 
        <p className='fw-semibold'>Address: <span className='fw-normal'>{bookedTour.address}</span></p> 
        <hr className='w-100'/>
        <div className='d-flex justify-content-between align-items-center'>
        <p className='fw-semibold'>Total: <span className='fw-normal'>{currencyBase.base == 'USD'?`$ ${bookedTour.cost * currencyBase.cost}`:`€ ${(bookedTour.cost).toFixed(2)}`}</span></p>
        <p className='fw-semibold'>{bookedTour.code}</p> 
        </div>
    </div>:""}

   
 
</div>
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
