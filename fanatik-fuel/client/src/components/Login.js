import React from 'react'

class Login extends React.Component{
  render(){
    return (
      <form method="get" action="/login">
        <button type="submit">Login</button>
      </form>
    )
  }
}

export default Login
