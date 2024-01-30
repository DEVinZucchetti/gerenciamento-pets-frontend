import axios from 'axios';

class SpecieService {

    async createSpecie() {
    }

    async getAllSpecies() {
        const response = await axios
        .get('http://127.0.0.1:8000/api/species')
        return response.data
    }
}

export default new SpecieService();