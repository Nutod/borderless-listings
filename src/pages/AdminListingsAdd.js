import React from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function AdminListingsAdd() {
  const { auth } = useAuth()

  console.log(auth)

  if (!auth) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <h1>Add admin listings</h1>
    </div>
  )
}
