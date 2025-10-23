import React from 'react'
import Search from './Search'
import Users from './Users'
import Logout from './Logout'


function Left() {
  return (
    <div className='w-[30%]  bg-amber-300 text-white'>
      <Search/>
       <div className='flex-1 overflow-y-auto' style={{minHeight:"calc(84vh - 10vh)"}}>
        <Users />
      </div>
      <Logout/>
      
    </div>
  )
}

export default Left
