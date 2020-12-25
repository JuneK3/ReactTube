import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const { Title } = Typography;

function LoginPage({ history }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [form] = Form.useForm();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onFinish = (values) => {
    dispatch(loginUser(values)).then((response) => {
      if (response.payload.loginSuccess) {
        history.push('/');
      } else {
        alert('Login Error');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}>
      <Title level={2}>Log In</Title>
      <Form
        form={form}
        style={{ width: '350px' }}
        onFinish={onFinish}
        scrollToFirstError>
        <Form.Item
          required
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email',
            },
            {
              type: 'email',
              message: 'Your input is not email format',
            },
          ]}>
          <Input
            id='email'
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='Enter your email'
            type='email'
            value={email}
            onChange={emailHandler}
            className='text-input'
          />
        </Form.Item>
        <Form.Item
          required
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password',
            },
          ]}
          hasFeedback>
          <Input
            id='password'
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='Enter your password'
            type='password'
            value={password}
            onChange={passwordHandler}
            className='text-input'
          />
        </Form.Item>
        <Form.Item>
          <Checkbox id='rememberMe'>Remember me</Checkbox>
          <a
            className='login-form-forgot'
            href='/reset_user'
            style={{ float: 'right' }}>
            forgot password
          </a>
          <div>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              style={{ minWidth: '100%' }}>
              Log in
            </Button>
          </div>
          Or <a href='/register'>register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
}

export default withRouter(LoginPage);
