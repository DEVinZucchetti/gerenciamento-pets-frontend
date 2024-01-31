import axios from 'axios';

class PetService {
    
    async createPet(body){
        const response = await axios.post('http://127.0.0.1:8000/api/pets', body)
        return response.data
    }

    async getAllPets(specie_id) {
        const response = await axios
        .get(`http://127.0.0.1:8000/api/pets?specie_id=${specie_id}`)
        return response.data
    }
}

export default new PetService();