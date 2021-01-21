import React, { useState } from 'react';


const LoginPage = () => {
  /* handleSignup grabs the values in the input fields and stores them to eventually be used as a POST request*/
  const handleSignup = (event) => {
    const name = document.querySelector('#name').value;
    const password = document.querySelector('#password').value;
    event.preventDefault();
    fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    })
    .then((res) => {
      res.json()
      window.location.reload()
    })
    .then(
      (result) => {
        },
        (error) => {
          console.log(error);
        }
        );
  }
  /* handleLogin grabs the values in the input fields and stores them to eventually be used as a POST request*/
  const handleLogin = (event) => {
    const name = document.querySelector('#name').value;
    const password = document.querySelector('#password').value;
    event.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result !== undefined) {
           //UTILIZE setUser() to define user object;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const oAuthHandler = (evt) => {
    window.location.href = '/auth/google'
  }

  return (
    <div id='loginContainer' className="outerContainer">
      <div className="floatingModal">
        {/* <input  id="name" placeholder="username"></input>
        <input type='password' id="password" placeholder="password"></input>
        <button onClick={handleSignup}>Sign up</button> */}
        <button onClick={oAuthHandler} id='google' >Sign In with GOOGLE</button>
        {/* <button onClick={logoutHandler}>Log out</button> */}
      </div>
    </div>
  );
}

export default LoginPage;
