import { TutorSend, UserSend } from '../DTOs/userTypes'
import axios from 'axios'

export const updateTutor = async (user: TutorSend) => {
  let data = JSON.stringify(user);
  
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DB_URL + '/tutors/update',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  return axios.request(config).then((response) => response.data).catch((error) => {})
}