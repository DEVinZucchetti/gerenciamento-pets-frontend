import api from "./api";

class RaceService {

    async getAllRaces() {
        const response = await api
        .get('races')
        return response.data
    }
}

export default new RaceService();