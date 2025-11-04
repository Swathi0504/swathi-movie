
import Navigation from './Navigation'
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