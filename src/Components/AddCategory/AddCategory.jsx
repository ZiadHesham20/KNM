import { Alert } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BallTriangle, TailSpin } from 'react-loader-spinner'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function AddCategory() {
    const [categoryOld, setCategoryOld] = useState({id:"",title:"",category_photo:"",description:""})
    const [photo, setPhoto] = useState("")
    const [photoUpdated, setPhotoUpdated] = useState(false)
    const [title,setTitle] = useState(null)
  const [errors,setErrors] = useState(null)
  const [description,setDescription] = useState(null)
  const [visibility, setVisibility] = useState(false);
  const {id} = useParams()
  const header = `Bearer ${localStorage.getItem('auth_token')}`;
  const navigate = useNavigate();

  async function getCategories() {
    try {
      let {data} = await axios.get(`api/categories/${id}`) 
    setCategoryOld({...categoryOld,id:data.data.id,title:data.data.title,description:data.data.description})
    } catch (error) {
      // if (error.code == 'ERR_NETWORK') {
      //   navigate('/503')
      // }
      console.log(error);
    }

  }
  function handleChange(e) {
    
    setPhoto(e.target.files);
    
    
}
function handleUpdate(e) {
  
 
  setPhotoUpdated(true)
  setPhoto(e.target.files);
}
  
  async function submitMyform(e) {
    e.preventDefault()
    const formData = new FormData();
    for (let i = 0; i < photo.length; i++){
      formData.append('photo',photo[i])
    }
    setVisibility(true);
    if (id == undefined) {
      try {
        await axios.post(`api/categories?title=${title}&description=${description}`,formData,{ headers: { Authorization: header } })
      navigate('/adminCategories')
      } catch (error) {
        if (error.response.status == 500) {
          setErrors(error.response.status)
        }else{
          setErrors(error.response.data.message)
        }
      }
    } else {
      if (photoUpdated == true && photo.length != 0) {
        try {
          await axios.post(`api/category-photo-update?category_id=${categoryOld.id}`,formData,{ headers: { Authorization: header } }).then(async()=>{
            await axios.put(`api/categories/${categoryOld.id}`,categoryOld,{ headers: { Authorization: header } })
            
        navigate('/adminCategories')
          })
        } catch (error) {
          alert(error.response.data.message)
        }
        finally{
          setVisibility(false);
        }
        
      }else{
      await axios.put(`api/categories/${categoryOld.id}`,categoryOld,{ headers: { Authorization: header } })
      navigate('/adminCategories')
      }
    }
    
      

  }
  useEffect(() => {
    if (id != undefined) {
      getCategories()
    }
  }, [])
  return <>
  {categoryOld != null ? <div className='container'>
  {id == undefined ?<h2 className='fw-bold'>Add Category</h2>:<h2 className='fw-bold'>Edit Category</h2>}
  <div>
  <form className='py-3' encType='multipart/form-data' onSubmit={submitMyform}>
            <div>
            <div>
            <label htmlFor="from" className='fw-semibold'>Title</label>
            </div>
            {categoryOld != null && id != undefined?<input className='form-control' type="text" name='title' id='title' value={categoryOld.title} onChange={(e)=>{setCategoryOld({...categoryOld,title:e.target.value})}}/>:<input onChange={(e)=>{setTitle(e.target.value)}} className='form-control' type="text" name='title' id='title' required/>}
            </div>
            <div>
            <div>
            <label htmlFor="from" className='fw-semibold'>Photo</label>
            </div>
            {categoryOld != null && id != undefined?<input className='form-control' type="file" name='category_photo' id='category_photo' onChange={handleUpdate}/>:<input onChange={handleChange} className='form-control' type="file" name='category_photo' id='category_photo' required/>}
            </div>
            <div>
            <div>
            <label htmlFor="to" className='fw-semibold'>Description</label>
            </div>
            {categoryOld != null && id != undefined?<textarea name="description" id="description" className='w-100 form-control' rows="5" value={categoryOld.description} onChange={(e)=>{setCategoryOld({...categoryOld,description:e.target.value})}}></textarea>:<textarea name="description" id="description" className='w-100 form-control' rows="5" onChange={(e)=>{setDescription(e.target.value)}} ></textarea>}
            </div>
            {errors == 500 ?
             <Alert className='my-3' sx={{
              fontFamily: 'mainFont'
            }} severity='error'>
           It already exist
            </Alert>
            :""}
            {errors != null && errors != 500?
            <Alert className='my-3' sx={{
              fontFamily: 'mainFont'
            }} severity='error'>
           {errors}
            </Alert>:""}
            <div className='d-flex'>
            {id == undefined ?<button type="submit" className='btn costume-btn text-black border-0 px-4 my-3 d-flex'>ADD <span className='ms-2'><TailSpin
  visible={visibility}
  height="25"
  width="25"
  color="black"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  

  /></span></button>:<button type="submit" className='btn costume-btn text-black border-0 px-4 my-3 d-flex'>Update <span className='ms-2'><TailSpin
  visible={visibility}
  height="25"
  width="25"
  color="black"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  

  /></span></button>}
            <Link to={'/adminCategories'} className='btn btn-danger border-0 px-4 ms-3 my-3'>Cancel</Link>
            </div>
          </form>
  </div>
  </div>:<div className='vh-100 '>
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
