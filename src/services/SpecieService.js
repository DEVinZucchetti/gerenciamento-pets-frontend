import api from "./api";

class SpecieService {

    async createSpecie() {
    }

    async getAllSpecies() {
        const response = await api
            .get('species')
        return response.data
    }
}

export default new SpecieService();