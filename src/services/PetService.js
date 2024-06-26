import api from "./api"
import { saveAs } from "file-saver"

class PetService {

    async createPet(body) {

        const formData = new FormData()
        // pegando a posição do 0 do array para envio da primeira imagem
        if(this.photo) formData.append('photo', this.photo[0])
        
        formData.append('name', this.name)
        formData.append('age', this.age)
        formData.append('size', this.size)
        formData.append('race_id', this.race_id)
        formData.append('specie_id', this.specie_id)
        formData.append('weight', this.weight)
        formData.append('description', this.description)
        
        const response = await api.post('pets', body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }

    async getAllPets(specie_id) {
        const response = await api.get(`pets?specie_id=${specie_id}`)
        return response.data
    }

    async deleteOnePet(petId) {
        const response = await api.delete(`pets/${petId}`)
        return response.data
    }

    async findOnePet(petId) {
        const response = await api.get(`pets/${petId}`)
        return response.data
    }

    async editPet(body, petId) {
        const response = await api.put(`pets/${petId}`, body)
        return response.data
    }

    async export(specie_id) {
        const response = await api.get(`pets/export?specie_id=${specie_id}`, { responseType: 'blob' })
        saveAs(response.data, 'lista_de_pets.pdf')
    }

    async exportProfilePet(petId, petName) {
        const response = await api.get(`pets/perfil?id=${petId}`, { responseType: 'blob' })
        saveAs(response.data, `${petName}.pdf`)
    }


}

export default new PetService();