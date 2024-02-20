<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title>Envio de Documentos</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitDocuments">
            <v-row>
              <v-col cols="12">
                <v-file-input
                  v-model="selectedFile1"
                  label="Selecione o cpf"
                  placeholder="Escolha um arquivo..."
                  prepend-icon="mdi-file"
                  accept=".pdf,.doc,.docx"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="selectedFile2"
                  label="Selecione o rg"
                  placeholder="Escolha um arquivo..."
                  prepend-icon="mdi-file"
                  accept=".pdf,.doc,.docx"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="selectedFile3"
                  label="Selecione o comprovante de residencia"
                  placeholder="Escolha um arquivo..."
                  prepend-icon="mdi-file"
                  accept=".pdf,.doc,.docx"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="selectedFile4"
                  label="Selecione o termo de adocao"
                  placeholder="Escolha um arquivo..."
                  prepend-icon="mdi-file"
                  accept=".pdf,.doc,.docx"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-btn type="submit" color="primary">Enviar Documentos</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      selectedFile1: null,
      selectedFile2: null,
      selectedFile3: null,
      selectedFile4: null
    }
  },
  methods: {
    async handleUploadFile(description, file, key) {
      try {
        const formData = new FormData()

        formData.append('description', description)
        formData.append('file', file)
        formData.append('id', this.$route.params.id)
        formData.append('key', key)

        await axios.post('http://localhost:8000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } catch (error) {
        console.error('Erro ao enviar documentos:', error)
      }
    },
    async submitDocuments() {
      this.handleUploadFile('Cpf do cliente', this.selectedFile1[0], 'cpf')
      this.handleUploadFile('RG do cliente', this.selectedFile2[0], 'rg')
      this.handleUploadFile('Comprovante de residencia', this.selectedFile3[0], 'document_address')
      this.handleUploadFile('Termo de adoação', this.selectedFile4[0], 'term_adoption')
    }
  }
}
</script>