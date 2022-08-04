import { CircularProgress } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <div style={{
      position: 'fixed',
      left: '45vw',
      top: '50vh',
    }}>
      <CircularProgress />
    </div>
  )
}

export default Loading