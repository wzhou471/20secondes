import React, { useState } from 'react';
import './App.css';
import {Redirect} from 'react-router-dom';
import {Input,Button} from 'antd';

function ScreenHome() {

  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [userExists, setUserExists] = useState(false)

  const [listErrorsSignin, setErrorsSignin] = useState([])
  const [listErrorsSignup, setErrorsSignup] = useState([])

  var handleSubmitSignUp = async () => {
    const data = await fetch('/sign-up', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
    })
    const body = await data.json()

    if (body.result === true) {
      setUserExists(true)
    } else {
      setErrorsSignup(body.error)
    }
  }

  var handleSubmitSignin = async () => {
 
    const data = await fetch('/sign-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
    })

    const body = await data.json()

    if(body.result === true){
      setUserExists(true)
    }  else {
      setErrorsSignin(body.error)
    }
  }
  
  if (userExists) {
    return <Redirect to='/screensource' />
  }

  var tabErrorsSignin = listErrorsSignin.map((error,i) => {
    return(<p>{error}</p>)
  })

  var tabErrorsSignup = listErrorsSignup.map((error,i) => {
    return(<p>{error}</p>)
  })

  return (
    <div className="Login-page" >

      {/* SIGN-IN */}

      <div className="Sign">
        <Input onChange={(e) => setSignInEmail(e.target.value)} className="Login-input" placeholder="email" />
        <Input.Password onChange={(e) => setSignInPassword(e.target.value)} className="Login-input" placeholder="password" />
        {tabErrorsSignin}
        <Button onClick={() => handleSubmitSignin()}  style={{width:'80px'}} type="primary">Sign-in</Button>
      </div>

      {/* SIGN-UP */}

      <div className="Sign">
        <Input onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} className="Login-input" placeholder="Remi Gisele" />
        <Input onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail} className="Login-input" placeholder="gisele@gmail.com" />
        <Input.Password onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} className="Login-input" placeholder="password" />
        {tabErrorsSignup}
        <Button onClick={()=> handleSubmitSignUp()} style={{width:'80px'}} type="primary">Sign-up</Button>
      </div>

    </div>
  );
}

export default ScreenHome;
