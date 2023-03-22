import { UserSend } from '../DTOs/userTypes'
import axios from 'axios'

export const registerUser = async (user: UserSend) => {
  let data = JSON.stringify(user);
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DB_URL,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios.request(config).then((response) => response.data).catch((error) => {})
}

export const logIn = async (user: UserSend) => {
  let data = JSON.stringify(user);
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DB_URL,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios.request(config).then((response) => {}).catch((error) => {})
}