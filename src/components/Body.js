import React from 'react'
import Navigation from './Navigation'
import MovieList from './MovieList'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div>
        <Navigation/> 
        <Outlet/>
    </div>
  )
}

export default Body