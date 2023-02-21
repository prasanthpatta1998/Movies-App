import React from 'react'

const UserDetails = React.createContext({
  username: '',
  password: '',
  addUserDetails: () => {},
})

export default UserDetails
