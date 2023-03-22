import { UserSend } from '../DTOs/userTypes'
import axios from 'axios'

export const updateTutor = async (user: UserSend) => {
  let data = JSON.stringify(user);
  
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DB_URL,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios.request(config).then((response) => response.data).catch((error) => {})
}