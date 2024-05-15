import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import $ from "jquery";
import { BallTriangle } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faX } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTour, getToursInPaginator } from '../../Redux/tourSlice';
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

export default function AdminTours() {
  const [selectToDel, setSelectToDel] = useState(null)

  const {allTours,paginatorInfo,pervAndNext,loading,error} = useSelector(state => state.tours)
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


  let ww = $(window).width()
  const header = `Bearer ${localStorage.getItem('auth_token')}`;
  const navigate = useNavigate();


  let {id} = useParams()
  
  function fetchTours(){
    dispatch(getToursInPaginator(id))
  }


  function deleteTours(e){
    e.preventDefault()
    dispatch(deleteTour(selectToDel))
    setOpen(false);
  }
  useEffect(() => {
    fetchTours()
  }, [id])
  return <>
  {allTours != null?
  <div className='container'>
  <div className='d-flex align-items-center justify-content-between'>
  <h2 className='fw-bold'>Tours</h2>
  <Link to={'/addTour'} className='btn btn-outline-warning border-2 text-black px-4 my-3'>Add</Link>
  </div>
  <div className='tables'>
  <table className="table" >
<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">Name</th>
    <th scope="col">Category</th>
    <th scope="col">Description</th>
    <th scope="col">Plan</th>
    <th scope="col">Address</th>
    <th scope="col">Price</th>
    <th scope="col">Duration</th>
    <th scope="col">Booked</th>
    <th scope="col"><Link to={'/photos'} className='text-decoration-none text-black d-flex align-items-center'>Photos <FontAwesomeIcon className="fa-solid fa-arrow-right highlightingcolor ms-1" icon={faArrowRight}/></Link></th>
    <th scope="col">Options</th>
  </tr>
</thead>
<tbody>
  {allTours != undefined?allTours.map((elem,idx)=><tr key={idx}>
    <th scope="row">{elem.id}</th>
    <td>{elem.name}</td>
    <td>{elem.category.title}</td>
    <td>{elem.description}</td>
    <td>{elem.plan}</td>
    <td>{elem.address}</td>
    <td>{elem.cost}</td>
    <td>{elem.period}</td>
    <td>{elem.booked}</td>
    <td><div className='row'>
      {elem.imageUrls.map((img,idx)=><div className='col-12' key={idx}>
      <figure>
       {console.log(img)}
      {/* https://knm.knm-travels.com/storage/app/public/photos/ */}
        <img src={`${imagesPath + 'photos/' + img.image}`} className='w-100 rounded-3' alt="Tour Image" />
      </figure>
      </div>)}
      </div></td>
      <td>
        <div className='d-flex align-items-end justify-content-center'>
        <Link to={`/addTour/${elem.slug}`} className='btn costume-btn text-black border-0 px-4'>Edit</Link>
        {localStorage.getItem('role') == 2?<button id={elem.id} onClick={handleClickOpen} type="button" className='btn btn-danger border-0 px-4 mx-3'>Delete</button>:""}
        </div>
      </td>
  </tr>):""}
 
  
</tbody>
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
          <Button variant='outlined' color='error' type='submit' sx={{fontFamily:'mainFont'}}  autoFocus onClick={deleteTours}>
            Yes
          </Button>
        </DialogActions>
      </BootstrapDialog>
<nav aria-label="Page navigation example" className='d-flex mt-3 justify-content-center'>
<ul className={ww < 600?"pagination pagination-sm":"pagination"}>

{paginatorInfo != undefined?paginatorInfo.links.map((elem, idx) => (
<li key={idx} className="page-item" aria-label={elem.label}>
  
    {elem.label === "&laquo; Previous" || elem.label === "&raquo; Next" ? (
      // Content to render for "Previous" or "Next"
      <span aria-hidden="true">
        {pervAndNext.prev != null?<Link className="page-link text-black" to={`${(parseInt(pervAndNext.prev.match(/\d+$/)[0]))}`} >
       {elem.label === "&laquo; Previous" ? '<<' : ">>"}
        </Link>:<Link className="page-link text-black disabled" >
       {elem.label === "&laquo; Previous" ? '<<' : ">>"}
        </Link>}
      </span>
    ):elem.label === "Next &raquo;" || elem.label === "&raquo; Next" ? (
      // Content to render for "Previous" or "Next"
      <span aria-hidden="true">
        {pervAndNext.next != null?<Link className="page-link text-black" to={`${(parseInt(pervAndNext.next.match(/\d+$/)[0]))}`} >
        {elem.label === "Next &raquo;" ? '>>' : "<<"}
        </Link>:<Link className="page-link text-black disabled" >
        {elem.label === "Next &raquo;" ? '>>' : "<<"}
        </Link>}
      </span>
    ) : (
      // Default content for other cases
      <Link className="page-link text-black" to={`${elem.label}`} >
      <span aria-hidden="true">{elem.label}</span>
      </Link>
    )}
  
</li>
)):""}
  
</ul>
</nav>
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
