import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import $ from "jquery";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [userData, setUserData] = useState({
        email: "",
        address:"",
        name:"",
        profile_photo:""
    });
    
    const [photoUpdateButton, setphotoUpdateButton] = useState(null);
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
  const uploadPhoto = (e) => {
    e.preventDefault();
    const formData = new FormData();

      for (let i = 0; i < photoUpdateButton.length; i++){
        formData.append('profile_photo',photoUpdateButton[i])
      }
    
    axios.post(`api/users/update-profile`,formData,{ headers: { Authorization: header } })
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
                        {userData.profile_photo != null?<img src={`https://knm-travels.com/storage/${userData.profile_photo}`} className='w-100 rounded-circle' alt="profile image"/>:<img src={`./Default.jpg`} className='w-100 rounded-circle' alt="profile image"/>}
                            
                            <div className="file my-2 btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file" onChange={handleFileChange} />
                            </div>
                            {photoUpdateButton == true?<button type="submit" className='btn costume-btn updatebutton text-black border-0 px-4 my-1'>Update</button>:<button type="submit" className='btn costume-btn d-none updatebutton text-black border-0 px-4 my-3'>Update</button>}
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
                                    <button   className='nav-link active'  id="home-tab" >About</button>
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
