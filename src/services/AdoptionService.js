import api from "./api";

class AdoptionService {

    async getAllAdoptions() {
        const response = await api
        .get('adoptions')
        return response.data
    }
}

export default new AdoptionService();