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
import axios from 'axios';

export default {
  data() {
    return {
      selectedFile1: null,
      selectedFile2: null,
      selectedFile3: null,
      selectedFile4: null,
    };
  },
  methods: {
    async submitDocuments() {
      const formData = new FormData();
            formData.append('description', 'documentos');

            console.log(JSON.stringify(this.selectedFile1[0]))
      formData.append('file', this.selectedFile1[0]);
   
      try {
        const response = await axios.post('http://localhost:8000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        console.log('Resposta do servidor:', response.data);
        
        // Limpar os campos de seleção após o envio
        this.selectedFile1 = null;
        this.selectedFile2 = null;
        this.selectedFile3 = null;
        this.selectedFile4 = null;
      } catch (error) {
        console.error('Erro ao enviar documentos:', error);
      }
    },
  },
};
</script>