import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function AddUser() {
  const [userOld, setUserOld] = useState(null)
  const {id} = useParams()
  const header = `Bearer ${localStorage.getItem('auth_token')}`;
  
  const navigate = useNavigate();

  async function getUserDetails() {
    try {
      let {data} = await axios.get(`api/users/${id}`) 
    setUserOld(data.data)
    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        navigate('/503')
      }
    }
  }
  async function changeUserRole(e) {
    e.preventDefault()
    if (userOld == 2) {
  
      await axios.patch(`api/users/superAdminSet/${id}`,null,{ headers: { Authorization: header } }) 
      navigate('/adminUsers')
    }else if(userOld == 1){
      await axios.patch(`api/users/adminSet/${id}`,null,{ headers: { Authorization: header } })
      navigate('/adminUsers') 
    }else{
      await axios.patch(`api/users/defaultUser/${id}`,null,{ headers: { Authorization: header } })
      navigate('/adminUsers') 
    }

    
  }
  useEffect(() => {
    if (id != undefined) {
      getUserDetails()
    }
  }, [])
  
  return <>
  <div className='container'>
 <h2 className='fw-bold'>Edit User</h2>
  <div>
  <form className='py-3' encType='multipart/form-data' onSubmit={changeUserRole}>
            <div>
            <div>
            <label htmlFor="name" className='fw-semibold'>Role</label>
            </div>
            <select className='form-control' name="role" id="role" onChange={(e)=>{setUserOld(e.target.value)}}>
              <option value={0}>User</option>
              <option value={1}>Admin</option>
              <option value={2}>Super Admin</option>
            </select>
            </div>
            <button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>Update</button>
            <Link to={'/adminUsers'} className='btn btn-danger border-0 px-4 ms-3 my-3'>Cancel</Link>
          </form>
  </div>
  </div>
  </>
}
