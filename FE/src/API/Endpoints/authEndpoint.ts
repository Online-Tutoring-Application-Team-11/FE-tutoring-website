import { PasswordSend, UserSend } from '../DTOs/userTypes'
import axios from 'axios'

export const registerUser = async (user: UserSend) => {
  let data = JSON.stringify(user);
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DB_URL + '/auth/signup',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios.request(config).then((response) => response.data)
}

export const logIn = async (user: UserSend) => {
  let data = JSON.stringify(user);
  console.log(data)
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DB_URL + '/auth/login',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  return axios.request(config).then((response) => response.data)
}

export const changePassword = async (user: PasswordSend) => {
  let data = JSON.stringify(user);
  console.log(data)
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DB_URL + '/users/change-password',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  return axios.request(config).then((response) => response.data)
}