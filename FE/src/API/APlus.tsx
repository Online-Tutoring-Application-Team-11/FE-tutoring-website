
import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_DB_URL,
    headers: { 
        // 'Authorization': `${getAuthToken()}` 
    }
});