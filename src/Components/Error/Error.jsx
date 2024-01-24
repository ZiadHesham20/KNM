import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return <>
  <div className='container'>
    <div className='row align-items-center'>
        <div className='col-12'>
            <div >
                <figure className='d-flex justify-content-center'>
                    <img src="/503 Error Service Unavailable-bro.svg" className='erorr503' alt="503" />
                </figure>
                <figcaption className='d-flex justify-content-center'>
                    <Link to={'/'} className='btn btn-warning text-center'><FontAwesomeIcon icon={faRotateRight} className='me-3'/>Please Try Again Later</Link>
                </figcaption>
            </div>
        </div>
    </div>
  </div>
  </>
}
