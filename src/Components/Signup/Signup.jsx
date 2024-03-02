import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom'


export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading,setLoading] = useState(false)
    const [errors, setErrors] = useState({
        email: null,
        password: null,
        confirmPassword: null,
    })


    const navigate = useNavigate();
    async function handleRegisteration(e) {
        e.preventDefault();
        try {
            setLoading(true)
            await axios.get('sanctum/csrf-cookie').then(async res => {
                if (confirmPassword == password) {
                    
                    await axios.post('api/register', { name, email, address, password }).then(async res => {
                        navigate('/signin')
                    })
                } else {
                    setErrors({ confirmPassword: `Password Doesnt Match` })
                }
            })


        } catch (error) {
            setErrors(error.response.data.errors);
            
        }finally{
setLoading(false)
        }
    }





    //mui password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };
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
                        <form className='inputform m-auto my-5' onSubmit={handleRegisteration}>
                            {/* Name input */}
                            <div className="mb-3 d-flex justify-content-between">
                                <div className='w-100'>
                                    <label htmlFor="firstName" className="form-label fw-semibold">Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control form-control-md" id="firstName" placeholder="Enter your name" required />

                                </div>
                            </div>
                            {/* Email input */}
                            {errors.email == null ? <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                                <input type="email" className="form-control form-control-md" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
                            </div> : <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                                <input type="email" className="form-control is-invalid form-control-md" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
                                <div id="validationServerUsernameFeedback" className="invalid-feedback">
                                    {errors.email[0]}
                                </div>
                            </div>}
                            {/* address input*/}
                            <div className="mb-3">
                                <label htmlFor="Address" className="form-label fw-semibold">Address</label>
                                <input type="text" className="form-control form-control-md" value={address} onChange={(e) => setAddress(e.target.value)} id="Address" placeholder="Enter your Address" required />
                            </div>

                            {/* password input */}

                            <div className="mb-3 d-flex justify-content-between">
                                {errors.password == null ? <div className='inputform2 position-relative'>
                                   <div>
                                   <label className="form-label fw-semibold" htmlFor="password">Password</label>
                                   </div>

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
                                        name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password"
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


                                </div> : <div className='inputform2 position-relative'>
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
                                        error={errors.password[0]}
                                        helperText={errors.password[0]}
                                        required
                                        placeholder='Enter password'
                                        size='small'
                                        name="password" value={password} onChange={(e) => {
                                            setPassword(e.target.value)
                                        }} id="password"
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
                                    
                                </div>}
                                {errors.confirmPassword == null ? <div className='inputform2 position-relative'>
                                    <label className="form-label fw-semibold" htmlFor="password">Confirm Password</label>
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
                                        name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownConfirmPassword}
                                                    edge="end"
                                                    size='small'
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }}
                                    />
                                </div> : <div className='inputform2 position-relative'>
                                    <label className="form-label fw-semibold" htmlFor="password">Confirm Password</label>
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
                                        error={errors.confirmPassword}
                                        helperText={errors.confirmPassword}
                                        required
                                        placeholder='Enter password'
                                        size='small'
                                        name="password" value={confirmPassword} onChange={(e) => {
                                            setConfirmPassword(e.target.value)
                                        }} id="password"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownConfirmPassword}
                                                    edge="end"
                                                    size='small'
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }}

                                    />
                                    
                                   
                                </div>}
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
  

  /></span>:"Signup"}</button>



</div>
                        </form>
                        <div className='text-center mb-5'>
                            Already have account?<Link to={'/signin'} className='text-decoration-none ms-2'>Login</Link>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
}
