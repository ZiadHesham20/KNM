import React from 'react'
import Navbar from './../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Call, Close, FacebookRounded, Instagram, Print, Share, SupportAgent, WhatsApp } from '@mui/icons-material'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'

export default function Layout({home}) {
  return <>
  <div className='container-fluid px-0'>
    <Navbar/>
    <div>
    {home}
    </div>
    <SpeedDial
  ariaLabel='Navigation Speed Dial'
  sx={{position:'fixed',bottom:16,right:16}}
  icon={<SpeedDialIcon icon={<SupportAgent sx={{
    color: 'white'
  }}/>} closeIcon={<Close sx={{
    color: 'white'
  }}/>} openIcon={<Close sx={{
    color: 'white'
  }}/>}/>}
  FabProps={{
    sx: {
      bgcolor: '#FECD27',
     
      '&:hover': {
        bgcolor: '#FECD27',
      }
    }
  }}
  >
    
<SpeedDialAction
onClick={() => {
  window.location.href = 'https://api.whatsapp.com/send/?phone=201270490987&text&type=phone_number&app_absent=0';
}}
icon={<WhatsApp/>} tooltipTitle='Whatsapp' tooltipOpen
 FabProps={{
  sx: {
    color: '#FECD27',
  }
}}
/>

<SpeedDialAction
onClick={() => {
  window.location.href = 'https://www.facebook.com/profile.php?id=100064133701063&mibextid=ZbWKwL';
}}
icon={<FacebookRounded/>} tooltipTitle='Facebook' tooltipOpen
FabProps={{
  sx: {
    color: '#FECD27',
  }
  }}

/>
<SpeedDialAction
onClick={() => {
  window.location.href = 'https://www.instagram.com/kmn_travels?igsh=OGQ5ZDc2ODk2ZA==';
}}
icon={<Instagram/>} tooltipTitle='Instagram' tooltipOpen
FabProps={{
  sx: {
    color: '#FECD27',
  }
  }}
/>
<SpeedDialAction
onClick={() => {
  window.location.href = 'tel:+201004587733';
}}
icon={<Call/>} tooltipTitle='Phone' tooltipOpen
FabProps={{
  sx: {
    color: '#FECD27',
  }
  }}
/>
  </SpeedDial>
    <Footer/>
  </div>
  </>
}
