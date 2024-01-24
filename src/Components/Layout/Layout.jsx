import React from 'react'
import Navbar from './../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function Layout({home}) {
  return <>
  <div className='container-fluid px-0'>
    <Navbar/>
    <div>
    {home}
    </div>
    <Footer/>
  </div>
  </>
}
