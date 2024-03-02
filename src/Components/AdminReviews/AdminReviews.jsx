import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviews, getReviews } from '../../Redux/reviewSlice';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled'

export default function AdminReviews() {

  const [selectToDel, setSelectToDel] = useState(null)
  const {reviews} = useSelector(state => state.review)
  const dispatch = useDispatch()
 
  const navigate = useNavigate();

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


  

  function deleteReview(e){
    e.preventDefault()
    dispatch(deleteReviews(selectToDel))
    setOpen(false);
  }

    function fetchReviews(){
      dispatch(getReviews())
    }
    useEffect(() => {
        fetchReviews()
    }, [])
    
  return <>
  {reviews != null?<div className='container'>
    <div className='p-2 d-flex align-items-center justify-content-between'>
    <h2 className='fw-bold'>Reviews</h2>
    </div>
    <div className='tables'>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">User_Name</th>
      <th scope="col">Tour_Name</th>
      <th scope="col">Comments</th>
      <th scope="col">Amenties</th>
      <th scope="col">Location</th>
      <th scope="col">Price</th>
      <th scope="col">Service</th>
      <th scope="col">Average</th>
      <th scope="col">Options</th>
    </tr>
  </thead>

  {reviews.map((elem,idx)=><tbody key={idx}>
    <tr>
      <th scope="row"  className='fw-semibold'>{elem.id}</th>
      <th scope="row"  className='fw-semibold'>{elem.user.name}</th>
      <th scope="row"  className='fw-semibold'>{elem.travel.name}</th>
      <th scope="row"  className='fw-semibold'>{elem.review}</th>
      <th scope="row"  className='fw-semibold'>{elem.amenities}</th>
      <th scope="row"  className='fw-semibold'>{elem.location}</th>
      <th scope="row"  className='fw-semibold'>{elem.price}</th>
      <th scope="row"  className='fw-semibold'>{elem.service}</th>
      <th scope="row"  className='fw-semibold'>{elem.average}</th>
        <td>
          <div className='d-flex align-items-center text-center'>
          {localStorage.getItem('role') == 2?<button id={elem.id} onClick={handleClickOpen} type="button"  className='btn btn-danger border-0 px-4 mx-3'>Delete</button>:""}
          </div>
        </td>
    </tr>
   
    
  </tbody>)}
</table>

    </div>
   
<BootstrapDialog 
      sx={{
        zIndex:'99999999999',
        
      }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle className='fw-semibold' sx={{ m: 0, p: 2,fontFamily:'mainFont' }} id="customized-dialog-title">
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
          <Button variant='outlined' sx={{fontFamily:'mainFont'}} autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='outlined' color='error' type='submit' sx={{fontFamily:'mainFont'}}  autoFocus onClick={deleteReview}>
            Yes
          </Button>
        </DialogActions>
      </BootstrapDialog>
</div>:<div className='vh-100 d-flex justify-content-center'>
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
