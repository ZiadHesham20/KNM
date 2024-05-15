import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BallTriangle, TailSpin } from 'react-loader-spinner';
import $ from "jquery";
import { useNavigate } from 'react-router-dom';
import { imagesPath } from '../..';
import { Alert } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

export default function Profile() {
    const [userData, setUserData] = useState({
        email: "",
        address:"",
        name:"",
        profile_photo:""
    });
    
    const [photoUpdateButton, setphotoUpdateButton] = useState(null);
    const [visibility, setVisibility] = useState(false);
    const header = `Bearer ${localStorage.getItem('auth_token')}`;
    const navigate = useNavigate();
  

    let id = localStorage.getItem('user_id');
  
  async function getUserData(){
    try {
        let {data} = await axios.get(`api/users/${id}`)
    
    setUserData({...userData,email:data.data.email,address:data.data.address,name:data.data.name,profile_photo:data.data.profile_photo});
    } catch (error) {
        if (error.code == 'ERR_NETWORK') {
            navigate('/503')
          }
    }  
}

  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`api/users/${id}`,userData,{ headers: { Authorization: header } })
  };
  
  const photoSucessElement = document.querySelector('#photoSucess');

  function showPhotoSuccessForMoment(duration) {
    // Remove the 'd-none' class to start the transition
    photoSucessElement.classList.remove('d-none');
    
    // Set the opacity to 1 to make it fully visible
    photoSucessElement.style.opacity = '1';

    // Set a timeout to add the 'd-none' class back after the specified duration
    setTimeout(() => {
        // Set the opacity to 0 to start the fade-out transition
        photoSucessElement.style.opacity = '0';

        // After the transition duration, add the 'd-none' class
        setTimeout(() => {
            photoSucessElement.classList.add('d-none');
        }, 500); // Match this duration with the CSS transition duration
    }, duration);
}

  const uploadPhoto = async (e) => {
    e.preventDefault();
    const formData = new FormData();

      for (let i = 0; i < photoUpdateButton.length; i++){
        formData.append('profile_photo',photoUpdateButton[i])
      }
      setVisibility(true);
      try {
        await axios.post(`api/users/update-profile`, formData, { headers: { Authorization: header } })
      .then((res) => {
          if (res.status == 200) {
              // alert('Your profile photo has been updated');
              document.querySelector('#photoSucess').classList.remove('d-none')
             setUserData({...userData,profile_photo: res.data.path});
             showPhotoSuccessForMoment(2000);
            
          } else {
             console.log(res);
          }
      })
      } catch (error) {
        alert(error.response.data.message)
      } finally{
        setVisibility(false);
      }
      
      
  
      
  };
  const handleFileChange = (event) => {

   setphotoUpdateButton(event.target.files)
   $('.updatebutton').removeClass('d-none')
  };
  useEffect(() => {

    getUserData();
    window.scrollTo(0,0)
    $('nav').removeClass('bg-transparent')
      $('nav').addClass('bg-white')
     $('nav').addClass("shadow-sm");
     $('.navtext').css("color","black");
     $('.currencylist').css("color","black");
  }, [])
  
  return <>
  
  {userData.name != ""?<div className="container emp-profile pt-5 mt-5 " id='thechange'>
            
                <div className="row align-items-center">
                
                    <div className="col-md-4">
                        
                       <form  method="post" onSubmit={uploadPhoto}> <div className="profile-img" encType='multipart/form-data'>
                        
                        {userData.profile_photo != null?<img src={`${imagesPath + userData.profile_photo}`} className='w-100 rounded-circle' alt="profile image"/>:<img src={`./Default.jpg`} className='w-100 rounded-circle' alt="profile image"/>}
                            <div className="file my-2 btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file" onChange={handleFileChange} />
                            </div>
                            
                            {photoUpdateButton == true?"":<div className='d-flex justify-content-center'>
                            <button type="submit" className='btn costume-btn d-none updatebutton text-black border-0 px-4 my-3 d-flex '>Update <span className='ms-2'><TailSpin
  visible={visibility}
  height="25"
  width="25"
  color="black"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  

  /></span></button>
                                </div>}
                                
                        </div>
                        </form>
                    </div>
                    <div className="col-md-6"><form onSubmit={handleSubmit} >
                        <div className="profile-head">
                                    <h4>
                                        User Name
                                    </h4>
                            <ul className="nav nav-tabs " id="myTab" role="tablist">
                                <li className="nav-item">
                                    <button   className='nav-link active disabled'  id="home-tab" >About</button>
                                </li>
                            </ul>
                            <div className="row">
                    <div className="col-12">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="fw-semibold">Name</label>
                                            </div>
                                            <div className="col-md-6">
                                               <input type="text" defaultValue={userData.name} name='name' onChange={(e)=>{setUserData({...userData,name:e.target.value})}} className='form-control'/>
                                            </div>
                                        </div>
                                        <div className="row my-2">
                                            <div className="col-md-6">
                                                <label className="fw-semibold">Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" defaultValue={userData.email} name='email' onChange={(e)=>{setUserData({...userData,email:e.target.value})}} className='form-control'/>
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-md-6">
                                                <label className="fw-semibold">Address</label>
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" defaultValue={userData.address} name='address' onChange={(e)=>{setUserData({...userData,address:e.target.value})}} className='form-control'/>
                                            </div>

                                            <div className='d-flex justify-content-end pt-3'>
                    <button type='submit' className='btn costume-btn text-black border-0 px-4 my-3 my-md-0 w-100'>Update Profile</button>
                    </div>
<div>
<Alert  id='photoSucess' className='mt-3 d-none' icon={<CheckCircleOutline fontSize="inherit" />} severity="success">Your profile image has been updated</Alert>

</div>
                                        </div>
                            </div>
                           
                        
                    </div>
                </div>
                        </div>
                        </form></div>
                    
                    
                </div></div>:<div className='d-flex justify-content-center align-items-center vh-100'><BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#FECD27"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/></div>}
                
                   
        
  </>
}
