import { getAuthToken } from '../../Hooks/useAuthToken';
import axios from 'axios'
import { HoursGet, HoursSend } from '../DTOs/appointTypes';
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

  export const getTutorHours = async (email: string): Promise<Array<HoursGet>> => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_DB_URL + `/tutors/get/${email}/available-hours`,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${getAuthToken()}`
      }
    };
  
    return axios.request(config).then((response) => response.data);
  }

  export const setTutorHours = async (block: HoursSend): Promise<Array<HoursGet>> => {
    let data = JSON.stringify(block);
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_DB_URL + `/tutors/available-hours/modify`,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${getAuthToken()}`
      },
      data: data
    };
  
    return axios.request(config).then((response) => response.data);
  }

  export const deleteTutorHours = async (email: string, dayOfWeek: string, startTime: Date | string): Promise<Array<HoursGet>> => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_DB_URL + `/tutors/available-hours/${email}/delete`,
      params: {
        day: dayOfWeek,
        startTime: startTime
      },
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${getAuthToken()}`
      }
    };
  
    return axios.request(config).then((response) => response.data);
  }

  // trying to delete all hours using one query param for day
  export const deleteAllTutorHours = async (email: string): Promise<Array<HoursGet>> => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: process.env.REACT_APP_DB_URL + `/tutors/available-hours/${email}/delete`,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${getAuthToken()}`
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
