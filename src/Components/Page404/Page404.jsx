import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
  return <>
  <div className='container'>
    <div className='row align-items-center'>
        <div className='col-12'>
            <div >
                <figure className='d-flex justify-content-center'>
                    <img src="/404 Error Page not Found with people connecting a plug-bro.svg" className='w-50' alt="404" />
                </figure>
                <figcaption className='d-flex justify-content-center'>
                    <Link to={'/'} className='btn btn-warning text-center'><FontAwesomeIcon icon={faRotateRight} className='me-3'/>Go Back</Link>
                </figcaption>
            </div>
        </div>
    </div>
  </div>
  </>
}
