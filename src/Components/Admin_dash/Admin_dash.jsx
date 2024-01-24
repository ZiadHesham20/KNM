import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

export default function Admin_dash() {
    const [travels, setTravels] = useState(null)
    const [users, setUsers] = useState(null)
    const [currencies, setCurrencies] = useState(null)
    const [destinations, setDestinations] = useState(null)
    const [rides, setRides] = useState(null)
    const [tours, setTours] = useState(null)
    const [trips, setTrips] = useState(null)
    const header = `Bearer ${localStorage.getItem('auth_token')}`;
    const navigate = useNavigate();
    async function getTrav() {
        try {
          let { data } = await axios.get(`api/booking/travel`,{ headers: { Authorization: header } })
        setTravels(data.meta.total);
        } catch (error) {
          if (error.code == 'ERR_NETWORK') {
            navigate('/503')
          }
        }
      }
      async function getCurrencies(){
        try {
          let {data} = await axios.get('api/currencies')
        setCurrencies(Array(data.data));
        } catch (error) {
          if (error.code == 'ERR_NETWORK') {
            navigate('/503')
          }
        }
      }
      async function getDestinations() {
        try {
          let { data } = await axios.get(`api/destinations`)
        setDestinations(data.meta.total);
        } catch (error) {
          if (error.code == 'ERR_NETWORK') {
            navigate('/503')
          }
        }
      }
      async function getRides() {
        try {
          let { data } = await axios.get(`api/rides`,{ headers: { Authorization: header } })
      setRides(data.meta.total);
        } catch (error) {
          if (error.code == 'ERR_NETWORK') {
            navigate('/503')
          }
        }
      }
      async function getTours(){
        try {
          let {data} = await axios.get(`api/travels`)
        setTours(data.meta.total);
        } catch (error) {
          if (error.code == 'ERR_NETWORK') {
            navigate('/503')
          }
        }
      }
      async function getTrips(){
        try {
          let {data} = await axios.get(`api/trips`,{ headers: { Authorization: header } })
        setTrips(data.meta.total);
        } catch (error) {
          if (error.code == 'ERR_NETWORK') {
            navigate('/503')
          }
        }
      }
      async function getUsers(){
        try {
          let {data} = await axios.get('api/users', { headers: { Authorization: header } })
        setUsers(data.meta.total);
        } catch (error) {
          if (error.code == 'ERR_NETWORK') {
            navigate('/503')
          }
        }
      }
      useEffect(() => {
        getTrav()
        getCurrencies()
        getDestinations()
        getRides()
        getTours()
        getTrips()
        getUsers()
      }, [])
      
  return <>
  {users != null && tours != null?<div className='container '>
  <div className='pt-2'>
      <h2 className='fw-bold'>Dashboard</h2>
    </div>
    <div className='row py-3 gy-3'>
        <div className='col-md-4'>
            <div className='d-flex justify-content-between maincolor p-5 rounded-3'>
            <h4>Tours</h4>
            <h4>{tours}</h4>
            </div>
        </div>
        <div className='col-md-4'>
            <div className='d-flex justify-content-between maincolor p-5 rounded-3'>
            <h4>Destinations</h4>
            <h4>{destinations}</h4>
            </div>
        </div>
        <div className='col-md-4'>
            <div className='d-flex justify-content-between maincolor p-5 rounded-3'>
            <h4>Trip</h4>
            <h4>{trips}</h4>
            </div>
        </div>
        <div className='col-md-4'>
            <div className='d-flex justify-content-between maincolor p-5 rounded-3'>
            <h4>Travels</h4>
            <h4>{travels}</h4>
            </div>
        </div>
        <div className='col-md-4'>
            <div className='d-flex justify-content-between maincolor p-5 rounded-3'>
            <h4>Rides</h4>
            <h4>{rides}</h4>
            </div>
        </div>
        <div className='col-md-4'>
            <div className='d-flex justify-content-between maincolor p-5 rounded-3'>
            <h4>Currency</h4>
            <h4>{currencies.length}</h4>
            </div>
        </div>
        <div className='col-md-4'>
            <div className='d-flex justify-content-between maincolor p-5 rounded-3'>
            <h4>Users</h4>
            <h4>{users}</h4>
            </div>
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
