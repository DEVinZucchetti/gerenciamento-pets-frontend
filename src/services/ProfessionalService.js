import api from "./api"

class ProfessionalService {
    
    async createProfessional(body){
        const response = await api.post('profissionals', body)
        return response.data
    }

    async getAllProfessionals() {
        const response = await api.get(`profissionals`)
        return response.data
    }
}

export default new ProfessionalService();