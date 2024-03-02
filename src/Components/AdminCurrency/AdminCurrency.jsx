import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { Link, useNavigate, useParams } from 'react-router-dom'
import $ from "jquery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCurrency, getCurrency } from '../../Redux/currencySlice';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled'

export default function AdminCurrency() {
  
  const [selectToDel, setSelectToDel] = useState(null)

  const {currencies} = useSelector(state => state.currency)
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



  
  

  let {id} = useParams()
  function fetchCurrencies(){
dispatch(getCurrency())
  }
  function deleteCur(e){
    e.preventDefault()
    dispatch(deleteCurrency(selectToDel))
    
    setOpen(false);
  }


  useEffect(() => {
    fetchCurrencies()
  }, [id])
  return <>
  
  {  currencies != null?<div className='container'>
    <div className='d-flex align-items-center justify-content-between'>
    <h2 className='fw-bold'>Currency</h2>
    <Link to={'/addCurrency'} className='btn btn-outline-warning border-2 text-black px-4 my-3'>Add</Link>
    </div>
    <div className='vh-100 tables'>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Symbol</th>
      <th scope="col">Currency</th>
      <th scope="col">Price</th>
      {localStorage.getItem('role') == 2?<th scope="col" className='text-center'>Options</th>:""}
    </tr>
  </thead>
  <tbody>
    {currencies != null? currencies.map((elem,idx)=><tr key={idx}>
      <th scope="row">{elem.id}</th>
      <td>{elem.currency}</td>
      <td>{elem.sym}</td>
      <td>{elem.code}</td>
      <td>{elem.cost}</td>
        {localStorage.getItem('role') == 2?<td>
          <div className='d-flex align-items-end justify-content-center'>
          <Link to={`/addCurrency/${elem.id}`} className='btn costume-btn text-black border-0 px-4'>Edit</Link>
          <button id={elem.id} onClick={handleClickOpen} type="button" className='btn btn-danger border-0 px-4 mx-3'>Delete</button>
          </div>
        </td>:""}
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
          <Button variant='outlined' color='error' type='submit' sx={{fontFamily:'mainFont'}}  autoFocus onClick={deleteCur}>
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
