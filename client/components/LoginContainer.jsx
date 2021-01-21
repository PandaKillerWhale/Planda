import React from 'react';
import LoginPage from './LoginPage.jsx';

const LoginContainer = (props) => {
  return (
    <div>
      <LoginPage key='LoginPage1' setUser={props.setUser}/>
    </div>
  );
};

export default LoginContainer;
