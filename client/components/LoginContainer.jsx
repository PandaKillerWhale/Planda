import React from 'react';
import LoginPage from './LoginPage.jsx';

const LoginContainer = (props) => {
  return (
    <div>
      <LoginPage  setUser={props.setUser}/>
    </div>
  );
};

export default LoginContainer;
