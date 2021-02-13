import React from 'react'
import Loading from './Loading'

export default function FullPageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading text="Bootstrapping Application" />
    </div>
  )
}
