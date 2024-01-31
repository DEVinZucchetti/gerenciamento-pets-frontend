import axios from 'axios';

class RaceService {

    async getAllRaces() {
        const response = await axios
        .get('http://127.0.0.1:8000/api/races')
        return response.data
    }
}

export default new RaceService();