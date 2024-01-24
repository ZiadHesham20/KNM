import React, { useEffect } from 'react'
import $ from "jquery";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Contactus() {
  let ww = $(window).width()

  useEffect(() => {
    window.scrollTo(0,0)
    
  }, [])
  return <>
  <section className='container-fluid mt-5 mt-md-0 pt-md-0'>
    <div className='row position-relative'>
      <div className='col-12 px-0'>
        <div>
          <figure >
          <img src="./beach6.png" className='w-100 position-relative' alt="hero" />
          {ww <= 600? <h4 className='text-center w-75 hone2 fw-semibold text-uppercase'>Contact Us</h4>:<h2 className='text-center w-75 display-5 hone2 fw-semibold text-uppercase'>Contact Us</h2>}
          </figure>
        </div>
      </div>
    </div>
  </section>
  <section id='thechange' className='container my-3  overflow-hidden'>
  <div >
  <h2 className='display-5'>We love to hear from you</h2>
  <p>Feel free to reach out to us through our contact information provided below. </p>
  </div>
  <div className='row justify-content-center align-items-center flex-row-reverse p-4'>
    <div className='col-md-6 col-12  '>
      <div>
        <figure>
          <img src="./contact.svg" className='w-100' alt="contactus" />
        </figure>
      </div>
    </div>
    <div className='col-md-6 col-12  '>
      <div>
      <ul className="list-group list-group-flush ">
<li className="list-group-item d-flex"><div><FontAwesomeIcon icon={faPhone} className='fw-bold fa-2x highlightingcolor me-3 gradient-text'/></div><div className='fw-semibold'>
Phone <Link to='tel:+201004587733' className='text-decoration-none con'>
<p className='fs-6 fw-normal text-black'>+201004587733</p>
</Link></div></li>

<li className="list-group-item d-flex"><div><FontAwesomeIcon icon={faWhatsapp} className="fw-bold me-3 fa-2x highlightingcolor gradient-text "/></div><div className='fw-semibold'>
Whatsapp <Link to='https://api.whatsapp.com/send/?phone=201270490987&text&type=phone_number&app_absent=0' className='text-decoration-none con'><p className='fs-6 text-black fw-normal'>+201011941006</p></Link></div></li>

<li className="list-group-item d-flex"><div><FontAwesomeIcon icon={faEnvelope} className="fw-bold me-3 fa-2x highlightingcolor gradient-text "/></div><div className='fw-semibold'>
Email <Link to='mailto:travelknm8@gmail.com' className='text-decoration-none con'>
<p className='fs-6 text-black fw-normal'>travelknm8@gmail.com</p>
</Link></div></li>


<li className="list-group-item d-flex"><div><FontAwesomeIcon icon={faFacebook} className="fw-bold me-3 fa-2x highlightingcolor gradient-text "/></div><div className='fw-semibold'>
Facebook <Link to='https://www.facebook.com/profile.php?id=100064133701063&mibextid=ZbWKwL' className='text-decoration-none con'>
<p className='fs-6 text-black fw-normal'>KNM Travel</p>
</Link></div></li>


<li className="list-group-item d-flex"><div><FontAwesomeIcon icon={faInstagram} className="fw-bold me-3 fa-2x highlightingcolor gradient-text "/></div><div className='fw-semibold'>
Instagram <Link to='https://www.instagram.com/kmn_travels?igsh=OGQ5ZDc2ODk2ZA==' className='text-decoration-none con'><p className='fs-6 text-black fw-normal'>KMN_Travel</p></Link></div></li>

</ul>
      </div>
    </div>
  </div>
  
</section>
  </> 
}
