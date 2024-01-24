import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function AddCategory() {
    const [categoryOld, setCategoryOld] = useState({id:"",title:"",description:""})

  const [title,setTitle] = useState(null)
  const [errors,setErrors] = useState(null)
  const [description,setDescription] = useState(null)
  const {id} = useParams()
  const header = `Bearer ${localStorage.getItem('auth_token')}`;
  const navigate = useNavigate();

  async function getCategories() {
    try {
      let {data} = await axios.get(`api/categories/${id}`) 
    setCategoryOld({...categoryOld,id:data.data.id,title:data.data.title,description:data.data.description})
    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        navigate('/503')
      }
    }

  }
  async function submitMyform(e) {
    e.preventDefault()
    if (id == undefined) {
      const formData = {
        title:title,
        description:description
      };
      try {
        await axios.post('api/categories',formData,{ headers: { Authorization: header } })
      navigate('/adminCategories')
      } catch (error) {
        console.log(error);
        setErrors(error.response.status)
      }
    } else {
      await axios.put(`api/categories/${categoryOld.id}`,categoryOld,{ headers: { Authorization: header } })
      navigate('/adminCategories')
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
  {/* {categoryOld != null && id != undefined?<input className='form-control' type="text" name='title' id='title' value={categoryOld.id} hidden/>:""} */}

            <div>
            <div>
            <label htmlFor="from" className='fw-semibold'>Title</label>
            </div>
            {categoryOld != null && id != undefined?<input className='form-control' type="text" name='title' id='title' value={categoryOld.title} onChange={(e)=>{setCategoryOld({...categoryOld,title:e.target.value})}}/>:<input onChange={(e)=>{setTitle(e.target.value)}} className='form-control' type="text" name='title' id='title' required/>}
            </div>
            <div>
            <div>
            <label htmlFor="to" className='fw-semibold'>Description</label>
            </div>
            {categoryOld != null && id != undefined?<textarea name="description" id="description" className='w-100 form-control' rows="5" value={categoryOld.description} onChange={(e)=>{setCategoryOld({...categoryOld,description:e.target.value})}}></textarea>:<textarea name="description" id="description" className='w-100 form-control' rows="5" onChange={(e)=>{setDescription(e.target.value)}} ></textarea>}
            </div>
            {errors == 500 ?<div className='alert alert-danger mt-3'>It already exist</div>:""}
            {id == undefined ?<button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>ADD</button>:<button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>Update</button>}
            <Link to={'/adminCategories'} className='btn btn-danger border-0 px-4 ms-3 my-3'>Cancel</Link>
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
