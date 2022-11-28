import React from 'react'
import {Topbar} from './Topbar'

export const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <Topbar />
      {children}
    </div>
  )
}