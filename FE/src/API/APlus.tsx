
import axios from 'axios';

const myAuthToken = () => {
    let authToken: String|null = ''; 
    try {
        if (typeof window !== 'undefined') {
            authToken = localStorage.getItem('token');
            return authToken;
        }
    } catch (error) {
        console.log(`Error in getting auth token: ${error}`)
    }
} 

export default axios.create({
    baseURL: 'https://online-tutoring-backend.up.railway.app',
    headers: {
        ContentType: 'application/json',
        Authorization : `${myAuthToken()}`
    }
});