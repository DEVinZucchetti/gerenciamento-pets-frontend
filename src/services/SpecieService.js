import api from "./api";

class SpecieService {

    async createSpecie() {
    }

    async getAllSpecies() {
        const response = await api
            .get('species', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("@token_petshop")}`
                }
            })
        return response.data
    }
}

export default new SpecieService();