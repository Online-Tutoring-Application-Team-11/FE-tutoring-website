export function setAuthToken(token: String) {
    try {
        if (typeof window !== 'undefined' && token !== null) {
            localStorage.setItem('token', `Bearer ${token}`);
        } else {
            localStorage.setItem('token', `Bearer `);
        }   
      } catch (error) {
        console.log(`Error in setting auth token: ${error}`);
      }
}

export function getAuthToken() {
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