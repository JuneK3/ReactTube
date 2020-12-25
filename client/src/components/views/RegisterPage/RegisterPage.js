import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';
import { Form, Input, Button, Typography } from 'antd';
const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 3,
    },
  },
};

function RegisterPage({ history }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [form] = Form.useForm();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onFinish = (values) => {
    if (password !== confirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }
    dispatch(registerUser(values)).then((response) => {
      if (response.payload.registerSuccess) {
        history.push('/login');
      } else {
        const message = response.payload.message;
        alert(message);
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
      <Title level={2}>Sign Up</Title>
      <Form
        form={form}
        style={{
          width: '375px',
          display: 'flex',
          flexDirection: 'column',
        }}
        onFinish={onFinish}
        scrollToFirstError
        {...formItemLayout}>
        <Form.Item
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
            {
              type: 'string',
              max: 10,
              message: 'Your input exceed maximum length',
            },
          ]}>
          <Input
            id='name'
            placeholder='Enter your name'
            type='text'
            value={name}
            onChange={nameHandler}
            className='text-input'
          />
        </Form.Item>
        <Form.Item
          required
          label='Last Name'
          name='lastname'
          rules={[
            {
              required: true,
              message: 'Please input your last name',
            },
            {
              type: 'string',
              max: 10,
              message: 'Your input exceed maximum length',
            },
          ]}>
          <Input
            id='lastname'
            placeholder='Enter your Last Name'
            type='text'
            value={lastname}
            onChange={lastNameHandler}
            className='text-input'
          />
        </Form.Item>
        <Form.Item
          required
          label='Email'
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
            placeholder='Enter your Email'
            type='email'
            value={email}
            onChange={emailHandler}
            className='text-input'
          />
        </Form.Item>
        <Form.Item
          required
          label='Password'
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
            placeholder='Enter your password'
            type='password'
            value={password}
            onChange={passwordHandler}
            className='text-input'
          />
        </Form.Item>
        <Form.Item
          required
          label='Confirm'
          name='confirm'
          rules={[
            {
              required: true,
              message: 'Please input your confirm password',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  'Confirm password does not match with Password'
                );
              },
            }),
          ]}
          hasFeedback>
          <Input
            id='confirmPassword'
            placeholder='Enter your confirmPassword'
            type='password'
            value={confirmPassword}
            onChange={confirmPasswordHandler}
            className='text-input'
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout} style={{ alignSelf: 'center' }}>
          <Button
            type='primary'
            className='register-form-button'
            htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default withRouter(RegisterPage);
