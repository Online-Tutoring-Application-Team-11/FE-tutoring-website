import { getAuthToken } from '../../Hooks/useAuthToken';
import axios from 'axios'
import { UserGet } from '../DTOs/userTypes';
import { AppointmentGet, AppointmentSend } from '../DTOs/appointTypes';

export const getAllTutors = async (): Promise<Array<UserGet>> => {
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

  export const getAllTutorsNoAuth = async (): Promise<Array<UserGet>> => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_DB_URL + `/tutors/get/all`,
      headers: { 
        'Content-Type': 'application/json'
      }
    };
  
    return axios.request(config).then((response) => response.data);
  }

export const getAllAppointments = async (email: string): Promise<Array<AppointmentGet>> => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DB_URL + `/appointments/list/${email}`,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `${getAuthToken()}`
    }
  };

  return axios.request(config).then((response) => response.data);
}

export const createAppointment = async (appointment: AppointmentSend) => {
  const data = JSON.stringify(appointment);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.REACT_APP_DB_URL + `/appointments/create`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${getAuthToken()}`
    },
    data: data
  };

  return axios.request(config).then((response) => response.data);
}