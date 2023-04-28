
import axios from 'axios';
import { getAuthToken } from '../Hooks/useAuthToken';

export default axios.create({
    baseURL: process.env.REACT_APP_DB_URL,
    headers: { 
        // 'Authorization': `${getAuthToken()}` 
    }
});