import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from "jquery";



export default function Signin() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors,setErrors] = useState(null)
    const navigate = useNavigate();

    function passwordVisibility() {
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }
      async function submitMyForm(e) {
        e.preventDefault()

        try {
              await axios.get('sanctum/csrf-cookie').then(async res=>{
                await axios.post('api/login',{email:email
            ,password:password}).then(res=>{
              console.log(res);
            if (res.data.role == 0) {
              localStorage.setItem('auth_token',res.data.token);
              localStorage.setItem('user_id',res.data.user_id)
              localStorage.setItem('role',res.data.role)
       navigate('/home')
            } else {
              localStorage.setItem('auth_token',res.data.token);
              localStorage.setItem('user_id',res.data.user_id)
              localStorage.setItem('role',res.data.role)
       navigate('/admin')
            }
       })
              })
      
      
  
          
      } catch (error) {
          setErrors(error.response.data)
      }
      
      }
      useEffect(() => {
        $('nav').addClass('d-none')
        $('footer').addClass('d-none')
      
      }, [])
      
  return <>
  <div className='container mt-5' id='thechange'>
    <div className='row '>
        <div className='col-12'>
            <div>
                <figure className='d-flex justify-content-center'>
                    <img src="/logo.svg" className='authlogo' alt="KNM" />
                </figure>
                <div>
                    <h4 className='fw-bold text-center'>Welcome to KNM TRAVEL</h4>
                </div>
                <div>
                   <form className='inputform m-auto my-5' method='post' onSubmit={submitMyForm}>
                   <div className="mb-3">
  <label htmlFor="email" className="form-label fw-semibold">Email address</label>
  <input type="email" name='email' className="form-control form-control-md" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="name@example.com" required/>
</div>
<div className="mb-3 position-relative">
<label className="form-label" htmlFor="password">Password</label>
            <input  type="password" name="password" id="password" className="form-control form-control-md" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" required/>
            <FontAwesomeIcon icon={faEye} onClick={passwordVisibility} className=" pointer position-absolute cursor-pointer"/>
          
</div>
{errors != null?<div className='alert-danger alert'>
  <h6>Incorrect Password or Email</h6>
</div>:""}
<div className="mb-3 d-flex justify-content-between">


</div>
<div className='text-center'>
<button className='btn w-50' style={{backgroundColor:'#FECD27'}}>Login</button>

</div>
                   </form>
                   <div className='text-center mb-5'>
                   Dont have account?<Link to={'/signup'} className='text-decoration-none ms-2'>Create Account</Link>
                   </div>
                </div>
            </div>
        </div>
    </div>
  </div>
  

  </>
}
