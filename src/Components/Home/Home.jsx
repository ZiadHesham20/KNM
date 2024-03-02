import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import $ from "jquery";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendar, faCircleXmark, faClock, faHeadset, faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getTours } from './../../Redux/tourSlice';
import { getCategories } from '../../Redux/categorySlice';
import { getDestinations } from '../../Redux/destinationSlice';
// azbt hett el blur

export default function Home() {
  let selectedCurr = JSON.parse(localStorage.getItem('selectedCurrency'))
 
  const [currencyBase, setCurrencyBase] = useState(selectedCurr == null?{base:'USD',cost:'1.00'}:{base: selectedCurr.selectedCurrencyBase,cost:selectedCurr.selectedCurrencyCost})
  

  const {popularTours,loading,error} = useSelector(state => state.tours)
  const allCategory = useSelector(state => state.category)
  const {destinations} = useSelector(state => state.destination)
  const dispatch = useDispatch()


  const header = `Bearer ${localStorage.getItem('auth_token')}`;
  const closeOffcanvas = () => {
    // Use jQuery or any other method to close the offcanvas
    // Example using jQuery
    $('#offcanvasNavbar2').addClass('hide');
  };
  const navigate = useNavigate();


  //azabat el switch button

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
  
  
  function submitRideForm(e) {
    e.preventDefault()

    localStorage.setItem("selectedDestinations",JSON.stringify({from:e.target.from.value,to:e.target.to.value,dateTime:e.target.futureDate.value}))

    //setCurrentDestinations(destinations.filter(elem=>elem.from == JSON.parse(localStorage.getItem('selectedDestinations')).from && elem.to == JSON.parse(localStorage.getItem('selectedDestinations')).to))
    if (destinations.filter(elem=>elem.from == JSON.parse(localStorage.getItem('selectedDestinations')).from && elem.to == JSON.parse(localStorage.getItem('selectedDestinations')).to).length != 0) {
      navigate('/rideprices')
    }else{
      navigate('/transferform')
    }
  }
  // Slider settings
  
    var settings = {
        dots: false,
        infinite: false,
        speed: 200,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
      const settings3 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      let ww = $(window).width()
      
     function fetchDestinations(){
      dispatch(getDestinations())
     }
     function fetchTours(){
        dispatch(getTours())

      }
     function fetchCategories(){
        dispatch(getCategories())
      }

      useEffect(() => {
        if( ww <= 600){
          $('.herofig').removeClass('position-relative');
          }
        window.scrollTo(0,0)
        $('nav').removeClass('d-none')
        $('footer').removeClass('d-none')
       
     $('#currencychange').on("change",async function(e){
      setCurrencyBase({base:e.target.value,cost:e.target.options[e.target.selectedIndex].getAttribute('data-cost')})
     })
     
     fetchDestinations()
     fetchTours()
     fetchCategories()
     closeOffcanvas()
     
      }, [ww])
      
  return <>
  {   loading != true && allCategory.categories != null?<>
 
  {/* Hero section */}
  <section className='container-fluid pt-5 pt-md-0 w-100'>
    <div className='row position-relative'>
      <div className='col-12 px-0'>
        <div>
          <figure >
          <img src="./beach6.png" className='w-100 herofig position-relative' alt="hero" />
        
          {ww <= 600? <h4 className='text-center w-75 hone fw-semibold'>Transfers from Hurghada to anywhere in Egypt</h4>:<h1 className='text-center w-75 hone fw-semibold '>Transfers from Hurghada to anywhere in Egypt</h1>}
         
          </figure>
        </div>
      </div>
      <div className='col-12 formtogo formtogocapture'>
        <div>
        <div className='row'>
                    <div className='d-flex'>
                        <div className='d-flex align-items-center text-white me-3 mb-2'>
                        <FontAwesomeIcon icon={faCalendar} className='me-2' style={{'color':'#FFCC00'}}/>
                        <span className='smallfont fw-semibold'>Free cancellation</span>
                        </div>
                        <div className='d-flex align-items-center text-white mb-2'>
                        <FontAwesomeIcon icon={faHeadset} className='me-2' style={{'color':'#FFCC00'}}/>
                        <span className='smallfont fw-semibold'>24-hour support</span>
                        </div>
                    </div>
            <div className='col-12 rounded-3 bg-white btn-select shadow py-3'>
                <form className='row align-items-center justify-content-evenly ' onSubmit={submitRideForm}>
                    <div className='col-md-3'>
                    <div className='costumeborder2 px-3'>
                    <label htmlFor="pickup" className='fw-semibold'>Pickup</label>
                    <select className='form-control' name="from" required>
                      
                      {destinations != null?destinations.map((elem,idx)=><option key={idx} value={elem.from}>{elem.from}</option>):""}

                    </select>
                    </div>
                    </div>
                    <div className='col-md-1 d-md-block d-none'>
                    <figure className='d-flex justify-content-center align-items-center pt-lg-3 pb-lg-2'>
                        <img src="./switch.svg" className='switch mt-3 mt-md-0'  alt="switch" />
                    </figure>
                    </div>
                    <div className='col-md-3 my-3'>
<div className='costumeborder px-3'>
<label htmlFor="dropoff" className='fw-semibold'>Dropoff</label>
                               <select className='form-control' name="to" required>
                                
                                {destinations != null?destinations.map((elem,idx)=><option key={idx} value={elem.to}>{elem.to}</option>):""}
                    </select>
                    </div>
                    </div>
                    <div className='col-md-3'>
                    <div className='costumeborder2 px-3'>
                    <label htmlFor="date_time" className='fw-semibold'>Date & Time</label>
                    <div>
                    <input className='form-control'
        type="datetime-local"
        id="futureDate"
        name="futureDate"
        value={minDate}
        onChange={handleDateChange}
        min={minDate}
      />
                    </div>
                    </div>
                    </div>
                    <div className='col-md-2 mt-md-0 mt-3 d-flex justify-content-center'>
                    <button type='submit' className='btn costume-btn text-white border-0 p-3 w-100'>Show Prices</button>
                    </div>
                   
                    
                </form>
            </div>
            <div className='d-flex justify-content-end pt-3'>
                        <div className='d-flex align-items-center text-white me-3 mb-2'>
                        <FontAwesomeIcon icon={faCalendar} className='me-2' style={{'color':'#FFCC00'}}/>
                        <span className='smallfont text-black fw-semibold'>Free cancellation</span>
                        </div>
                        <div className='d-flex align-items-center text-white mb-2'>
                        <FontAwesomeIcon icon={faHeadset} className='me-2' style={{'color':'#FFCC00'}}/>
                        <span className='smallfont text-black fw-semibold'>24-hour support</span>
                        </div>
                    </div>
        </div>
        </div>
      </div>
    </div>
  </section>
  
  <section id='thechange' className='container my-5 py-5'>
  <h2 className='text-center text-uppercase'>Choose by category</h2>
<hr className='m-auto  my-4 rounded-1'/>
<div className="row gy-3 justify-content-evenly">
  {allCategory.categories.slice(0,9).map((elem,idx)=><div className='col-md-4' key={idx}>
  <Link to={`/categoryOf/${elem.slug}`}>
  <div className='categoryItem rounded-3'>
    <figure className='position-relative overflow-hidden rounded-3'>
      <img src={elem.photo == null?'/default-image-icon-missing-picture-page-vector-40546530.jpg':`https://knm.knm-travels.com/storage/app/public/${elem.photo}`} className='w-100 rounded-3' id='catImage' alt="categoryImage" />
      <div className='position-absolute top-0 bottom-0 end-0 start-0 catlayer rounded-3'>
        <div className='text-center d-flex w-100 h-100 justify-content-center align-items-end pb-3'>
          <div>
          <p className='highlightingcolor fs-4'>Tours In</p>
        <h6 className='fs-3 fw-semibold text-white text-uppercase'>{elem.title}</h6>
          </div>
        </div>
      </div>
    </figure>
  </div>
  </Link>
  </div> )} 
  <div className='d-flex justify-content-end align-items-center'>
  <Link to='/tours' className='btn costume-btn text-white border-0 px-4 py-2 rounded-1 catSeeMore'>See More <FontAwesomeIcon icon={faArrowRight} className='ms-2'/></Link>

  </div>
</div>
  </section>
  {/* Popular tours section*/}
  <section className='costumemargin container my-5 pb-5'>
<h6 className='text-uppercase text-center fw-light mb-4'>explore our tours</h6>
<h2 className='text-center text-uppercase'>Most <br />Popular Tours</h2>
<hr className='m-auto my-4 rounded-1'/>
<div className='row pe-3 ps-5 px-md-4 p-md-0 w-100'>
    <div className="col-12">
    <Slider {...settings} >
          {popularTours != null?popularTours.map((elem,idx)=><div key={idx} className='container '>
          
          <Link to={`/tourdetails/${elem.slug}`} className='text-decoration-none text-black'><div className='position-relative d-flex imghi '>
            <figure className='position-absolute  top-0 bottom-0'>            
            <img src={elem.imageUrls[0] != undefined ? `https://knm.knm-travels.com/storage/app/public/photos/${elem.imageUrls[0].image}`:"/default-image-icon-missing-picture-page-vector-40546530.jpg"} className='w-100 imghi rounded-1' alt="Tour Image" />
            </figure>
            
            <div className='container rounded-1 slideslayer z-1'>
            <div className="row pt-2 h-100 text-white">
                <div className='col-12 mb-5'>
                    <div className='d-flex justify-content-between p-3'>
                        <div className='maincolor p-1 rounded-2 fw-semibold' style={{'fontSize':'small'}}>
                        POPULAR
                        </div>
                        <div className='fw-light'>
                            From <span className='fw-semibold'>
                            {currencyBase.base == 'USD'?`$ ${elem.cost * currencyBase.cost}`:`€ ${(elem.cost * currencyBase.cost).toFixed(2)}`}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='ps-3 text-center'>
                        <h5>{elem.name}</h5>
                    </div>
                <div className='col-12 pb-3 d-flex gap-3 mt-auto justify-content-center flex-wrap mb-2'>
                
                    
                    <div className='d-flex'>
                    <div className='d-flex me-2 align-items-center'>
                    <i className="fa-regular fa-clock me-2"></i> {elem.period} Hours
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
          </div></Link>
          </div>):""}
        </Slider>
    </div>
</div>
  </section>
  
{/* choose your experience section */}
  
  {/* WHY CHOOSE US section */}
  <section className='my-5 container-fluid py-5' style={{'backgroundColor':'#F6F8FB'}}>
<div className='py-0 py-lg-5'>
<div className='row p-0 p-lg-5 w-100'>
<div className='col-lg-6'>
<div>
    <figure>
        <img src="./div.elementor-widget-wrap.png" className='w-100 d-none d-md-block' alt="Why choose us image" />
    </figure>
</div>
</div>
<div className='col-lg-6 ps-4'>
<div>
    <div>
    <p className='fw-semibold text-uppercase text-md-start text-center'>why choose us</p>
    <h2 className='display-6 fw-semibold text-md-start text-center'>Our Experiences
Meet High Quality
Standards</h2>


    </div>
    <div className='row mt-5'>
        <div className='col-md-4 '>
            <div>
            <hr className='m-auto my-4 rounded-1 w-50 '/>
            </div>
        </div>
        <div className='col-md-8'>
            <div className='text-center text-md-start'>
              <p>At KNM Travels, we believe in transforming your travel dreams into reality. With a passion for exploration and a commitment to exceptional service, we are your trusted partner for remarkable adventures.</p>
            </div>
            <div className='d-flex justify-content-center d-md-block'>
                <div>
                <ul className='costumelist '>
                    <li className='my-4 ps-3'>Professional Tour Guide</li>
                    <li className='my-4 ps-3'>Exceptional flexibility</li>
                    <li className='my-4 ps-3'>Quality you can trust</li>
                    <li className='my-4 ps-3'>Award-winning support</li>
                </ul>
<div className='text-center text-md-start'>
<Link to='/contact' className='btn costume-btn text-white border-0 px-4 py-2 rounded-1'>Contact Us <FontAwesomeIcon icon={faArrowRight} className='ms-2'/></Link>

</div>
                </div>
            </div>
        </div>
    </div>
</div>

</div>
</div>
</div>
  </section>
  {/* hurghada */}
  <section className='mt-5 pt-5 container'>
  <div className='mb-5'>
<h2 className='text-center text-uppercase'>Trip In Hurghada</h2>
<hr className='m-auto my-4 rounded-1'/>
  </div>
<div className="row gy-4 px-md-0 justify-content-evenly px-3">
<div className='col-lg-6'>
<div>
  <figure>
    <img src="/444108607.jpg" className='w-100 rounded-3' alt="hurghada" />
  </figure>
</div>
</div>
<div className='col-lg-6'>
<div>
  <h2>Hurghada</h2>
  <p>Embarking on a mesmerizing journey to Hurghada, my senses were captivated by the harmonious blend of cultural and recreational experiences. Our adventure commenced with a visit to the enchanting mosques and churches that stood as testaments to Egypt's rich history and diverse heritage. The spiritual aura of the mosques and the serenity within the churches provided a profound cultural immersion. Following this spiritual exploration, we delved into the vibrant Fish Ring, where the dazzling marine life unfolded before our eyes.The tour extended beyond four hours, ensuring ample time to absorb the beauty and significance of each site. Awaiting us was a well-organized bus, it will wait 30 mins . Our journey was enriched by the expertise of a knowledgeable tour guide who effortlessly navigated us through the cultural tapestry of Hurghada, adding insightful narratives to every landmark visited. To culminate this unforgettable day, we indulged in a spot of shopping, acquiring souvenirs that would forever encapsulate the magic of our expedition in Hurghada.</p>
  <Link to={'/tourform'}><button className='btn costume-btn text-white border-0 px-5 py-2 rounded-1'>Book Now <FontAwesomeIcon icon={faArrowRight} className='ms-2'/></button></Link>
</div>
</div>
</div>
  </section>
  {/* Reviews section */}
  <section className='my-5 py-4 container px-5'>
    <figure className='position-relative py-5 my-5'>
    <img src="./Testominy.png" className='w-100 ' alt="testimony" />
    <div className='testominy '>
    <h6 className='text-uppercase text-center fw-light mb-4'>REAL TRAVELERS REVIEWS</h6>


{ww <= 600? <h6 className='text-center text-uppercase'> What Our Travelers Say <br /> About the Trip</h6>:<h2 className='text-center text-uppercase'> What Our Travelers Say <br /> About the Trip</h2>}

<hr className='m-auto my-0 my-lg-5 rounded-1'/>
<div className='row justify-content-center'>
    <div className='col-md-6 '>
    <Slider {...settings3}>
          <div className=' p-5'>
            <p className='text-center fw-semibold reviewTest'>
            “Customer service was professional. Highly recommend. Absolutely
wonderful! Just the right amount of time spent snorkeling and one of
the most beautiful beaches I have ever seen.”
            </p>
          </div>
          <div className=' p-5 '>
            <p className='text-center fw-semibold reviewTest'>
            “KNM Travel exceeded my expectations! Their attention to detail and personalized service made my trip unforgettable. Highly recommend!”
            </p>
          </div>
          <div className=' p-5 '>
            <p className='text-center fw-semibold reviewTest'>
            “KNM Travel made my journey extraordinary! From impeccable planning to personalized service, every moment was unforgettable. Highly recommend for a seamless and delightful travel experience!”
            </p>
          </div>
          <div className=' p-5 '>
            <p className='text-center fw-semibold reviewTest'>
            “Choosing KNM Travel was a game-changer for my vacation! Their meticulous planning and personal touch made the entire experience seamless and memorable.”
            </p>
          </div>
        </Slider>
        
    </div>
</div>

    </div>
    </figure>
  </section></>:<div className='vh-100 d-flex justify-content-center'>
 
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
