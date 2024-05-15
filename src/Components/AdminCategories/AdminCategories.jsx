import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import $ from "jquery";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategories, getCategories } from '../../Redux/categorySlice';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled'
import { imagesPath } from '../..';

export default function AdminCategories() {
  const [selectToDel, setSelectToDel] = useState(null)
  const {categories} = useSelector(state => state.category)
  const dispatch = useDispatch()
 


  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));








   const [open, setOpen] = useState(false);

   const handleClickOpen = (e) => {
    setSelectToDel(e.target.id)
     setOpen(true);
   };
   const handleClose = () => {
     setOpen(false);
   };








  let {id} = useParams()




  function fetchCategory(){
    dispatch(getCategories())
  }
 

  function deleteCategory(e){
    e.preventDefault()
    dispatch(deleteCategories(selectToDel))
    setOpen(false);
  }
  useEffect(() => {
 
    fetchCategory()
   
  }, [id])
  return <>
  {categories != null ?<div className='container'>
    <div className='p-2 d-flex align-items-center justify-content-between'>
    <h2 className='fw-bold'>Categories</h2>
{localStorage.getItem('role') == 2?<Link to={'/addCategory'} className='btn btn-outline-warning border-2 text-black px-4 my-3'>Add</Link>:""}
    </div>
    <div className='tables'>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Slug</th>
      <th scope="col">Description</th>
      <th scope="col">Photo</th>
      <th scope="col">Options</th>
    </tr>
  </thead>
  {categories.map((elem,idx)=><tbody key={idx}>
    <tr>
      <th scope="row"  className='fw-semibold'>{elem.id}</th>
      <th scope="row"  className='fw-semibold'>{elem.title}</th>
      <th scope="row"  className='fw-semibold'>{elem.slug}</th>
      <th scope="row"  className='fw-semibold'>{elem.description}</th>
      <th scope="row"  className='fw-semibold'>
      <figure>
    <img src={elem.photo != null?`${imagesPath + elem.photo}`:'/default-image-icon-missing-picture-page-vector-40546530.jpg'} className='catImageAdmin rounded-3' alt="Tour Image" />
  </figure>
      </th>
        <td>
          <div className='d-flex align-items-center text-center'>
          <Link to={`/addCategory/${elem.slug}`} className='btn costume-btn text-black border-0 px-4'>Edit</Link>
          {localStorage.getItem('role') == 2?<button id={elem.id}  onClick={handleClickOpen} type="button" className='btn btn-danger border-0 px-4 mx-3'>Delete</button>:""}
          </div>
        </td>
    </tr>
   
    
  </tbody>)}
</table>

    </div>
   


      <BootstrapDialog 
      sx={{
        zIndex:'99999999999'
      }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 ,fontFamily:'mainFont'}} id="customized-dialog-title">
         Delete
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent  dividers>
          <Typography sx={{fontFamily:'mainFont'}} paddingRight={5} f paddingLeft={5} gutterBottom>
            <h5>Are you sure?</h5>
          </Typography>
        </DialogContent>
        <DialogActions sx={{display:'flex',justifyContent:"center"}}>
          <Button sx={{fontFamily:'mainFont'}} variant='outlined' autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{fontFamily:'mainFont'}} variant='outlined' color='error' type='submit'  autoFocus onClick={deleteCategory}>
            Yes
          </Button>
        </DialogActions>
      </BootstrapDialog>

</div>
:<div className='vh-100 d-flex justify-content-center'>
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
