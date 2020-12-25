import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';

export function loginUser(dataToSubmit) {
  const response = axios
    .post('/api/users/login', dataToSubmit)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return { type: LOGIN_USER, payload: response };
}

export function registerUser(dataToSubmit) {
  const response = axios
    .post('/api/users/register', dataToSubmit)
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return { type: REGISTER_USER, payload: response };
}

export function auth() {
  const response = axios
    .get('/api/users/auth')
    .then((response) => response.data)
    .catch((error) => console.log(error));

  return { type: AUTH_USER, payload: response };
}
