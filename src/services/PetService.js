import api from "./api"

class PetService {
    
    async createPet(body){
        const response = await api.post('pets', body)
        return response.data
    }

    async getAllPets(specie_id) {
        const response = await api.get(`pets?specie_id=${specie_id}`)
        return response.data
    }
}

export default new PetService();