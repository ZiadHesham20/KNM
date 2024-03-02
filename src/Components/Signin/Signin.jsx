import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from "jquery";
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../Redux/authSlice';
import { TailSpin } from 'react-loader-spinner';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, IconButton, InputAdornment, TextField } from '@mui/material';



export default function Signin() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {userData,loading,errors} = useSelector(state => state.userAuth)
    const dispatch = useDispatch()

    
      function submitSignIn(e){
        e.preventDefault()
        dispatch(signIn({email,password})).then(res=>{
              if (localStorage.getItem('role') == 0) {
          navigate('/home')
              } 
              else if (localStorage.getItem('role') == 1 || localStorage.getItem('role') == 2){
          navigate('/admin')
              }
          })
      }
      
      
      const handleClickShowPassword = () => setShowPassword((show) => !show);
  
      const handleMouseDownPassword = (event) => {
          event.preventDefault();
      };
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
                   <form className='inputform m-auto my-5' method='post' onSubmit={submitSignIn}>
                   <div className="mb-3">
  <label htmlFor="email" className="form-label fw-semibold">Email address</label>
  <input type="email" name='email' className="form-control form-control-md" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="name@example.com" required/>
</div>
<div className="mb-3 position-relative">
<label className="form-label fw-semibold" htmlFor="password">Password</label>
             <TextField
                                        sx={{
                                            "& input::placeholder": {
                                                fontSize: "1rem",
                                                fontFamily: 'mainFont',
                                                opacity: '0.8'
                                            },
                                            "& input":{
                                                fontFamily: 'mainFont'
                                            }
                                        }}
                                        fullWidth
                                        required
                                        placeholder='Enter password'
                                        size='small'
                                        name="password" id="password"
                                        value={password} onChange={(e)=>setPassword(e.target.value)}
                                        type={showPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size='small'
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }}
                                    />
</div>
{errors != null?<Alert sx={{
  fontFamily: 'mainFont'
}} severity='error'>
<h6>Incorrect Password or Email</h6>
</Alert>:""}

<div className="mb-3 d-flex justify-content-between">


</div>
<div className='d-flex justify-content-center'>

<button className='btn w-50 d-flex justify-content-center' style={{backgroundColor:'#FECD27'}}>{loading == true?<span ><TailSpin
  visible={true}
  height="25"
  width="25"
  color="black"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  

  /></span>:"Login"}</button>



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
