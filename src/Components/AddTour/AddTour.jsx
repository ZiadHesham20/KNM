import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { BallTriangle, TailSpin } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategories } from '../../Redux/categorySlice'
import { Alert } from '@mui/material'

export default function AddTour() {
  const [tourOld, setTourOld] = useState({name:"",category_id:"",description:"",plan:"",address:"",price:"",dateTime:"",period:"",photos:[]})
  const [name, setName] = useState(null)
  const [tourId, setTourId] = useState(null)
  const [selectedCategory, setselectedCategory] = useState(null)
  const [addrss, setAddrss] = useState(null)
  const [price, setPrice] = useState(null)
  const [photos, setPhotos] = useState("")
  const [photosUpdated, setPhotosUpdated] = useState(false)
  const [description, setDescription] = useState(null)
  const [plan, setPlan] = useState(null)
  const [period, setPeriod] = useState(null)
  const [dateTime, setDateTime] = useState(null)
  const header = `Bearer ${localStorage.getItem('auth_token')}`;
  const [allErrors, setAllErrors] = useState(null)
  const [photoErrors, setPhotoErrors] = useState(null)
  const [loading,setLoading] = useState(false)

  const {categories} = useSelector(state => state.category)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const {id} = useParams()
  
 //wa2f 3and el add tour
  function handleChange(e) {
    
    setPhotos(e.target.files);
    
    
}
function handleUpdate(e) {
  setTourOld({...tourOld,photos:e.target.files})
  setPhotosUpdated(true)
}

function fetchCategory(){
  dispatch(getCategories())
}


  async function getTourDetails() {
      try {
        let {data} = await axios.get(`api/travels/${id}`) 
        setTourId(data.data.id)
        console.log(data);
        setTourOld({...tourOld,name:data.data.name,category_id:data.data.category.id,description:data.data.description,plan:data.data.plan,address:data.data.address,price:data.data.cost,dateTime:data.data.dateTime,period:data.data.period,photos:data.data.imageUrls})    
  } catch (error) {
    if (error.code == 'ERR_NETWORK') {
      navigate('/503')
    }
  }
  }
  async function submitMyform(e) {
    e.preventDefault()
    if (id == undefined) {
      const formData = new FormData();

      for (let i = 0; i < photos.length; i++){
        formData.append('photos[]',photos[i])
      }

      try {
        setLoading(true)
        await axios.post(`api/travels?name=${name}&category_id=${selectedCategory}&description=${description}&plan=${plan}&address=${addrss}&price=${price}${dateTime != null?`&dateTime=${dateTime}&`:'&'}period=${period}`,formData,{ headers: { Authorization: header } })
        navigate('/adminTours')
      } catch (error) {
        setAllErrors(error)
      }finally{
        setLoading(false)
      }
    } else {
      const formData = new FormData();
      if (photosUpdated == true) {
       //Law hasl update llswar 
      for (let i = 0; i < tourOld.photos.length; i++){
        
        formData.append('photos[]',tourOld.photos[i])
      }
      
      await axios.patch(`api/travels/${tourId}?name=${tourOld.name}&category_id=${tourOld.category_id}&description=${tourOld.description}&plan=${tourOld.plan}&address=${tourOld.address}&price=${tourOld.price}&dateTime=${tourOld.dateTime}&period=${tourOld.period}`,null,{ headers: { Authorization: header } })
      try {
        setLoading(true)
        await axios.post(`api/travels/${tourId}/addPhotos`,formData,{ headers: { Authorization: header } })
      } catch (error) {
      setPhotoErrors('This image cant be added')
      }finally{
        setLoading(false)
      }
      }else{
        //Law mahslsh update llswar
        if (tourOld.dateTime == null) {
          try {
            await axios.patch(`api/travels/${tourId}?name=${tourOld.name}&category_id=${tourOld.category_id}&description=${tourOld.description}&plan=${tourOld.plan}&address=${tourOld.address}&price=${tourOld.price}&period=${tourOld.period}`,null,{ headers: { Authorization: header } })
            setLoading(true)
          } catch (error) {
            
          }finally{
            setLoading(false)
          }
        }
        else{
          try {
            await axios.patch(`api/travels/${tourId}?name=${tourOld.name}&category_id=${tourOld.category_id}&description=${tourOld.description}&plan=${tourOld.plan}&address=${tourOld.address}&price=${tourOld.price}&dateTime=${tourOld.dateTime}&period=${tourOld.period}`,null,{ headers: { Authorization: header } })
            setLoading(true)
          } catch (error) {
            
          }finally{
            setLoading(false)
          }
        }
      }
      // 
      
    
      navigate('/adminTours')
    }
  }
  useEffect(() => {
    if (id != undefined) {
      getTourDetails()
      
    }
    fetchCategory()
  }, [])
  const currentDate = new Date();

  // Add one day to the current date to set the minimum selectable date
  currentDate.setDate(currentDate.getDate() + 1);

  // Format the date to be compatible with the datetime-local input
  const formattedDate = currentDate.toISOString().slice(0, 16);

  // Set the state with the formatted date as the minimum date
  const [minDate, setMinDate] = useState(formattedDate);

  // Handler function to update the state when the input value changes
  const handleDateChange = (event) => {
    
    setTourOld({...tourOld,dateTime:event.target.value})
    setDateTime(event.target.value)
    setMinDate(event.target.value);
  };
  return <>
  
  {tourOld != null && categories != null?<div className='container'>
  {id == undefined ?<h2 className='fw-bold'>Add Tour</h2>:<h2 className='fw-bold'>Edit Tour</h2>}
  <div>
  <form className='py-3' encType='multipart/form-data' onSubmit={submitMyform}>
            <div>
            <div>
            <label htmlFor="name" className='fw-semibold'>Name</label>
            </div>
            {tourOld != null && id != undefined?<input className='form-control' type="text" id='name' name='name' value={tourOld.name} onChange={(e)=>{setTourOld({...tourOld,name:e.target.value})}}/>:<input className='form-control' onChange={(e)=>{setName(e.target.value)}}  type="text" id='name' name='name' required/>}
            </div>
            <div>
            <div>
            <label htmlFor="category" className='fw-semibold'>Category</label>
            </div>
           
            {/* {tourOld != null && id != undefined?<input className='form-control' type="text" id='category' value={tourOld.category_id} onChange={(e)=>{setTourOld({...tourOld,category_id:e.target.value})}}/>:<input className='form-control' type="text" id='category'  onChange={(e)=>{setCategory(e.target.value)}} required/>} */}
            {tourOld != null && id != undefined?
            <select name='selectedCategory' defaultValue={tourOld.category_id} className="form-select text-center" onChange={(e)=>{setTourOld({...tourOld,category_id:e.target.value})}} aria-label="Default select example">
            <option className='text-center' disabled></option>
             {categories.map((elem,idx)=><option key={idx} className='text-center' value={elem.id}>{elem.slug}</option>)}
          </select>
          :
            <select name='selectedCategory' defaultValue={tourOld.category_id} className="form-select text-center" onChange={(e)=>{setselectedCategory(e.target.value)}} aria-label="Default select example">
  <option className='text-center' disabled></option>
   {categories.map((elem,idx)=><option key={idx} className='text-center' value={elem.id}>{elem.slug}</option>)}
</select>}

            </div>
            <div>
            <div>
            <label htmlFor="address" className='fw-semibold'>Address</label>
            </div>
            {tourOld != null && id != undefined?<input className='form-control' type="text" id='address' value={tourOld.address} onChange={(e)=>{setTourOld({...tourOld,address:e.target.value})}}/>:<input className='form-control' type="text" id='address' onChange={(e)=>{setAddrss(e.target.value)}} required/>}
            </div>
            <div>
            <div>
            <label htmlFor="price" className='fw-semibold'>Price</label>
            </div>
            {tourOld != null && id != undefined?<input className='form-control' type="numer" id='price' value={tourOld.price} onChange={(e)=>{setTourOld({...tourOld,price:e.target.value})}}/>:<input className='form-control' type="number" id='price' onChange={(e)=>{setPrice(e.target.value)}} required/>}
            </div>
            <div>
            <div>
            <label htmlFor="period" className='fw-semibold'>Duration</label>
            </div>
            {tourOld != null && id != undefined?<input className='form-control' type="number" id='period' value={tourOld.period} onChange={(e)=>{setTourOld({...tourOld,period:e.target.value})}}/>:<input className='form-control' type="number" id='period' onChange={(e)=>{setPeriod(e.target.value)}} required/>}
            </div>
            <div>
            <div>
            <label htmlFor="photos" className='fw-semibold'>Photos</label>
            </div>
            {tourOld != null && id != undefined?<input className='form-control' type="file" id='photos' multiple onChange={handleUpdate}/>:<input  className='form-control' type="file" id='photos' multiple onChange={handleChange} required/>}
            </div>
            {photoErrors != null?<div className='alert alert-danger mt-2'>
            <h6>{photoErrors}</h6>
          </div>:""}
            <div>
            <div>
            <label htmlFor="dateTime" className='fw-semibold'>Tour Date</label>
            </div>
            {tourOld != null && id != undefined?<input className='form-control'
        type="datetime-local"
        id="futureDate"
        name="futureDate"
        
        value={tourOld.dateTime}
        onChange={handleDateChange}
        min={minDate}
      />:<input className='form-control'
      type="datetime-local"
      id="futureDate"
      name="futureDate"
      onChange={handleDateChange}
      min={minDate}
    />}
            
            </div>
            <div>
            <div>
            <label htmlFor="description" className='fw-semibold'>Description</label>
            </div>
            {tourOld != null && id != undefined?<textarea name="description" id="description" className='w-100 form-control' rows="5" value={tourOld.description} onChange={(e)=>{setTourOld({...tourOld,description:e.target.value})}}></textarea>:<textarea name="description" id="description" className='w-100 form-control' rows="5" onChange={(e)=>{setDescription(e.target.value)}} ></textarea>}
            </div>
            <div>
            <div>
            <label htmlFor="plan" className='fw-semibold'>Plan</label>
            </div>
            {tourOld != null && id != undefined?<textarea name="plan" id="plan" className='w-100 form-control' rows="5" value={tourOld.plan} onChange={(e)=>{setTourOld({...tourOld,plan:e.target.value})}}></textarea>:<textarea name="plan" id="plan" className='w-100 form-control' rows="5" onChange={(e)=>{setPlan(e.target.value)}} ></textarea>}
            </div>
            {id == undefined ?<button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>{loading == true?<span ><TailSpin
  visible={true}
  height="25"
  width="25"
  color="black"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  

  /></span>:"ADD"}</button>:<button type="submit" className='btn costume-btn text-black border-0 px-4 my-3'>{loading == true?<span ><TailSpin
    visible={true}
    height="25"
    width="25"
    color="black"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    
  
    /></span>:"Update"}</button>}
          </form>
          
          {allErrors != null?
          <Alert className='mb-3' sx={{
            fontFamily: 'mainFont'
          }} severity='error'>
         <h6>This Tour Already exists</h6>
          </Alert>:""}
  </div>
  </div>:<div className='vh-100 d-flex justify-content-center'>
  <div className=' position-fixed loading' id='thechange'><BallTriangle
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
