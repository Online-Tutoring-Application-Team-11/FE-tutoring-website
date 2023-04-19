import { TutorSend, UserSend, PasswordSend, StudentSend } from '../DTOs/userTypes'
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
      'Authorization': `${getAuthToken()}`
    },
    data : data
  };
  
  return axios.request(config).then((response) => response.data);
}

export const updateStudent = async (user: StudentSend) => {
  let data = JSON.stringify(user);

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DB_URL + '/students/update',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `${getAuthToken()}`
    },
    data : data
  };

  return axios.request(config).then((response) => response.data);
}

export const updateUser = async (user: UserSend) => {
  let data = JSON.stringify(user);
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DB_URL + '/users/update-profile',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `${getAuthToken()}`
    },
    data : data
  };

  return axios.request(config).then((response) => response.data);
}

export const getTutor = async (emailreq : string) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DB_URL + `/tutors/get/${emailreq}`,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `${getAuthToken()}`
    }
  };

  return axios.request(config).then((response) => response.data);
}

export const getStudent = async (emailreq : string) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DB_URL + `/students/get/${emailreq}`,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `${getAuthToken()}`
    }
  };

  return axios.request(config).then((response) => response.data);
}

export const changePassword = async (user: PasswordSend) => {
  let data = JSON.stringify(user);
  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DB_URL + '/users/change-password',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `${getAuthToken()}`
    },
    data : data
  };

  return axios.request(config).then((response) => response.data);
}