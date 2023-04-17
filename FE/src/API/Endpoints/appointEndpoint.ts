import { TutorSend, UserSend, PasswordSend } from '../DTOs/userTypes'
import { getAuthToken } from '../../Hooks/useAuthToken';
import axios from 'axios'

export const getAllTutors = async (subject: string) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_DB_URL + `/tutors/get/all`,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${getAuthToken()}`
      }
    };
  
    return axios.request(config).then((response) => response.data);
  }