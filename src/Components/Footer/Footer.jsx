import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  
  return <>
  <footer className='container-fluid text-white '>
<div className='row p-2 p-md-5 gy-2'>
<div className='col-md-3'>
<div>
<Link className="navbar-brand text-center logo navtext d-flex align-items-center fw-bold" to="/"><img src="/logo.svg" className='w-25 rounded-circle' alt="KNM TRAVEL Logo" /></Link>
<h5>KNM TRAVEL</h5>
</div>
</div>
<div className='col-md-3'>
<div>
<h5>Site Map</h5>
<ul className='list-unstyled'>
  <li><Link to={'/home'} className='text-decoration-none footerText'>Home</Link></li>
  <li><Link to={'/tours'} className='text-decoration-none footerText'>Tours</Link></li>
  <li><Link to={'/aboutus'} className='text-decoration-none footerText'>About Us</Link></li>
  <li><Link to={'/contact'} className='text-decoration-none footerText'>Contact Us</Link></li>
</ul>
</div>
</div>
<div className='col-md-3'>
<div>
<h5>Help</h5>
<ul className='list-unstyled'>
  <li className='my-2'>Privacy Policy</li>
  <li className='my-2'>Terms and Conditions</li>
  <li className='my-2'>Refund and Cancellation Policy</li>
</ul>
</div>
</div>
<div className='col-md-3'>
<div>
<h5>Our contact</h5>
<ul className='list-unstyled'>
  <li className='my-2'><Link to='mailto:travelknm8@gmail.com' className='text-decoration-none footerText'>
travelknm8@gmail.com
</Link></li>
  <li className='my-2'><Link to='tel:+201004587733' className='text-decoration-none footerText'>
+201004587733
</Link></li>
</ul>
<ul className='list-unstyled d-flex'>
<li><Link to='https://www.facebook.com/profile.php?id=100064133701063&mibextid=ZbWKwL' className='text-decoration-none fa-2x footerText'>
<FontAwesomeIcon icon={faFacebook} />
</Link></li>
<li className='mx-3'><Link to='https://www.instagram.com/kmn_travels?igsh=OGQ5ZDc2ODk2ZA==' className='text-decoration-none fa-2x footerText'>
<FontAwesomeIcon icon={faInstagram}/>
</Link></li>
<li><Link to='https://api.whatsapp.com/send/?phone=201270490987&text&type=phone_number&app_absent=0' className='text-decoration-none fa-2x footerText'>
<FontAwesomeIcon icon={faWhatsapp} />
</Link></li>
</ul>
</div>
</div>
</div>
<div className='text-center py-3'>
Copyright © 2023.KNM TRAVEL.
</div>
  </footer>
  </>
}
