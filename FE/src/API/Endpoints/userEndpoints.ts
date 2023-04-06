import { TutorSend, UserSend } from '../DTOs/userTypes'
import { getAuthToken } from '../../Hooks/useAuthToken';
import axios from 'axios'

export const updateTutor = async (user: TutorSend) => {
  let data = JSON.stringify(user);
  
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DB_URL + '/tutors/update',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    },
    data : data
  };
  
  return axios.request(config).then((response) => response.data)
}

export const updateUser = async (user: UserSend) => {
  let data = JSON.stringify(user);
  console.log(user)
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DB_URL + '/users/update-profile',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    },
    data : data
  };

  return axios.request(config).then((response) => response.data)
}