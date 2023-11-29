import DropzoneComponent from '@/components/Dropzone'
import { auth } from '@clerk/nextjs'
import React from 'react'

function Dashboard() {
  const { userId } = auth()
  return (
    <>
      <DropzoneComponent />

      <div>Dashboard</div>
    </>

  )
}

export default Dashboard