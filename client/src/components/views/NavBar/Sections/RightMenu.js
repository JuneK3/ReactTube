import React from 'react';
import axios from 'axios';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

function RightMenu(props) {
  const user = useSelector((state) => state.users);

  const logoutHandler = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.status === 200) {
        props.history.push('/login');
      } else {
        alert('Log Out Failed');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='signIn'>
          <a href='/login'>Sign In</a>
        </Menu.Item>
        <Menu.Item key='signUp'>
          <a href='/register'>Sign Up</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key='upload'>
          <a href='/video/upload'>Upload</a>
        </Menu.Item>
        <Menu.Item key='logout'>
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
