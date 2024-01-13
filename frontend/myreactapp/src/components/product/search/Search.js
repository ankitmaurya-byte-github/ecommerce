import React, { Fragment, useRef } from 'react'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './search.scss'
function Search() {
 const navigate = useNavigate()
 const myInputRef = useRef();
 const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
   if (e.target.value.trim()) {
    navigate(`/products/${e.target.value}`)
   } else {
    navigate(`/products`)
   }
  }
 }
 const handleClick = () => {

  if (myInputRef.current.value.trim()) {
   navigate(`/products/${myInputRef.current.value}`)
  } else {
   navigate(`/products`)
  }

 }
 return (
  <Fragment>
   <div className='searchBox'>
    <input ref={myInputRef} type="text" placeholder='search...' onKeyPress={handleKeyPress} />
    <button onClick={handleClick}>Search</button>
   </div>
  </Fragment>
 )
}

export default Search