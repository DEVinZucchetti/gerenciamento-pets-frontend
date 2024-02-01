import axios from 'axios';

class AuthenticationService {
    
    async login(body){
        const response = await axios.post('http://127.0.0.1:8000/api/login', body)
        return response.data
    }
}

export default new AuthenticationService();