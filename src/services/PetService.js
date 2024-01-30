import axios from 'axios';

class PetService {

    async getAllPets() {
        const response = await axios
        .get('http://127.0.0.1:8000/api/pets')
        return response.data
    }
}

export default new PetService();