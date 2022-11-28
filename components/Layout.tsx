import React from 'react'
import {Topbar} from './Topbar'

export const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div id="app-holder" className='h-full grid'>
      <Topbar />
      {children}
    </div>
  )
}