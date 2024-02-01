import api from "./api";

class AuthenticationService {
    
    async login(body){
        const response = await api.post('login', body)
        return response.data
    }
}

export default new AuthenticationService();