import React from 'react'
import UserDetails from '../components/UserDetails'
import LatestProjects from '../components/LatestProjects'

const Profile = () => {
  return (
    <div className='bg-slate-200'>
      <UserDetails/>
      <LatestProjects/>
    </div>
  )
}

export default Profile
