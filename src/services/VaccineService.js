import api from "./api"

class VaccineService {
    
    async createVaccine(body){
        const response = await api.post('vaccines', body)
        return response.data
    }

    async getAllVaccinesByPet(petId) {
        const response = await api.get(`vacinacao/${petId}/pets`)
        return response.data
    }

}

export default new VaccineService();