import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import $ from "jquery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';


export default function ForgetPassword() {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors,setErrors] = useState({
        email: null,
        password: null,
        confirmPassword: null,
    })
    const navigate = useNavigate();

    // function passwordVisibility() {
    //     var x = document.getElementById("password");
    //     if (x.type === "password") {
    //         x.type = "text";
    //     } else {
    //         x.type = "password";
    //     }
    // }
    // function confirmpasswordVisibility() {
    //     var x = document.getElementById("confirmPassword");
    //     if (x.type === "password") {
    //         x.type = "text";
    //     } else {
    //         x.type = "password";
    //     }
    // }
      async function submitMyForm(e) {
        e.preventDefault()
      
        try {
              await axios.get('http://localhost:8000/sanctum/csrf-cookie').then(async res=>{
                await axios.post('http://localhost:8000/api/forgot-password',{email:email})
              })
                
            
       
      
      
  
          
      } catch (error) {
          setErrors(error.response.data)
      }
      
      }
      useEffect(() => {
        $('nav').addClass('d-none')
        $('footer').addClass('d-none')
      
      }, [])
      
  return <div className='container mt-5' id='thechange'>
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
                 {errors.email == null?<div className="mb-3">
                                <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                                <input type="email" className="form-control form-control-md" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="name@example.com" required/>
                            </div>:<div className="mb-3">
                                <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                                <input type="email" className="form-control is-invalid form-control-md" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="name@example.com" required/>
                                <div id="validationServerUsernameFeedback" className="invalid-feedback">
             {errors.email[0]}
            </div>
                            </div>}            
                 {/* {errors.password == null?<div className='inputform2 position-relative'>
                                    <label className="form-label fw-semibold" htmlFor="password">Password</label>
                                    <input type="password" name="password" value={password}  onChange={(e)=>setPassword(e.target.value)} id="password" className="form-control form-control-md" placeholder="Enter password" required />
                                    <FontAwesomeIcon icon={faEye} onClick={passwordVisibility} className=" pointer position-absolute signupvisible cursor-pointer"/>
                                </div>:<div className='inputform2 position-relative'>
                                    <label className="form-label fw-semibold" htmlFor="password">Password</label>
                                    <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" className="form-control form-control-md is-invalid" placeholder="Enter password" required />
                                    <FontAwesomeIcon icon={faEye} onClick={passwordVisibility} className=" pointer position-absolute signupvisible2 cursor-pointer"/>
                                    <div id="validationServerUsernameFeedback" className="invalid-feedback">
             {errors.password[0]}
            </div>
                                </div>}
{errors.confirmPassword == null?<div className='inputform2 position-relative'>
                                    <label className="form-label fw-semibold" htmlFor="password">Confirm Password</label>
                                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} id="confirmPassword" className="form-control form-control-md" placeholder="Enter password" required />
                                    <FontAwesomeIcon icon={faEye} onClick={confirmpasswordVisibility} className=" pointer position-absolute signupvisible cursor-pointer"/>
                                </div>:<div className='inputform2 position-relative'>
                                    <label className="form-label fw-semibold" htmlFor="password">Confirm Password</label>
                                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} id="confirmPassword" className="form-control is-invalid form-control-md" placeholder="Enter password" required />
                                    <FontAwesomeIcon icon={faEye} onClick={confirmpasswordVisibility} className=" pointer position-absolute signupvisible2 cursor-pointer"/>
                                    <div id="validationServerUsernameFeedback" className="invalid-feedback">
                                    {errors.confirmPassword}
            </div>
                                </div>} */}


<div className='text-center'>
<button className='btn w-50' style={{backgroundColor:'#FECD27'}}>Reset Password</button>

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
}
