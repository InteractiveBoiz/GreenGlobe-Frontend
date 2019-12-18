import React,{ Component } from 'react';
import  LoginForm  from "./LoginForm";
import { withNavigation } from 'react-navigation';  

class LoginPage extends Component {
  state = {  }
  render() {
    return (
      <LoginForm></LoginForm>
    );
  }
}

export default withNavigation(LoginPage);