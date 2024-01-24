import React, { useEffect } from 'react'
import $ from "jquery";

export default function AboutUs() {
  let ww = $(window).width()

  useEffect(() => {
    window.scrollTo(0,0)
    
  }, [])
  return <>
  {/* hero of about*/}
  <section className='container-fluid  mt-5 mt-md-0 pt-md-0'>
    <div className='row position-relative'>
      <div className='col-12 px-0'>
        <div>
          <figure >
          <img src="./beach6.png" className='w-100 position-relative' alt="hero" />
          {ww <= 600? <h4 className='text-center w-75 hone2 fw-semibold text-uppercase'>About Us</h4>:<h2 className='text-center w-75 display-5 hone2 fw-semibold text-uppercase'>About Us</h2>}

          
          </figure>
        </div>
      </div>
    </div>
  </section>
  <section id='thechange' className='my-md-5 py-md-5'>
<div className='container py-5'>
<div className='row'>
<div className='col-lg-6'>
<div>
    <figure>
        <img src="./5569523_2889115 1.svg" className='w-100' alt="About Us Image" />
    </figure>
</div>
</div>
<div className='col-lg-6 px-5'>
<div>
    <div>
    <p className='fw-semibold text-uppercase text-md-start text-center'>Know about us</p>
    <h2 className='display-4 fw-semibold text-md-start text-uppercase text-center'>About <span className='highlightingcolor'>KNM TRAVEL</span></h2>


    </div>
    <div className='row mt-5'>
        {/* <div className='col-md-4 '>
            <div>
            <hr className='m-auto my-4 rounded-1 w-50 '/>
            </div>
        </div> */}
        <div className='col-12'>
            <div className='text-center text-md-start'>
                <p>Welcome to KNM Travels - Your Gateway to Unforgettable Journeys!</p>
                <p>At KNM Travels, we believe in transforming your travel dreams into reality. With a passion for exploration and a commitment to exceptional service, we are your trusted partner for remarkable adventures.</p>
                <p className='fw-semibold'>Why Choose KNM Travels?</p>
                <p><span className='fw-semibold'>Personalized Experiences:</span>We understand that every traveler is unique. That's why we tailor our itineraries to suit your preferences, ensuring a journey that reflects your individual taste and style.</p>
                <p><span className='fw-semibold'>Expert Guidance:</span>Our team of seasoned travel experts is here to guide you every step of the way. Whether you're seeking a relaxing beach getaway or an adrenaline-packed adventure, we have the knowledge to create the perfect itinerary.</p>
                <p><span className='fw-semibold'>Unparalleled Destinations:</span> From enchanting landscapes to cultural gems, our destinations are carefully curated to provide you with enriching experiences. Explore the world with KNM Travels and uncover hidden treasures.</p>
                <p><span className='fw-semibold'>Comfortable Accommodations:</span> Your comfort is our priority. We partner with top-notch accommodations to ensure you have a relaxing haven to return to after a day of exploration.</p>
                <p><span className='fw-semibold'>Seamless Planning:</span> Leave the logistics to us. We take care of all the details, allowing you to focus on creating memories that will last a lifetime. From transportation to activities, we've got you covered.</p>
                <p className='fw-semibold'>Our Services:</p>
                <ul className='text-start'>
                  <li><span className='fw-semibold'>Group Tours:</span> Join like-minded travelers on our group tours, fostering new friendships while exploring captivating destinations.</li>
                  <li><span className='fw-semibold'>Customized Packages:</span> Tailor your journey to match your desires. Let us know your preferences, and we'll craft a bespoke itinerary just for you.</li>
                  <li><span className='fw-semibold'>Corporate Travel:</span> Elevate your business trips with our corporate travel solutions. Efficiency meets comfort for a seamless business travel experience.</li>
                  <li><span className='fw-semibold'>Special Events:</span> Celebrate life's milestones with KNM Travels. Whether it's a honeymoon or an anniversary, we specialize in making your special moments extraordinary.</li>
                </ul>
                <p>Embark on a journey with KNM Travels, where every adventure is a story waiting to be told. Let us be your compass to the world's wonders.</p>
                <p>Discover. Explore. Experience. KNM Travels - Your Passport to Unforgettable Memories.</p>
            </div>
            
        </div>
    </div>
</div>

</div>
</div>
</div>
  </section>
  </>
}
