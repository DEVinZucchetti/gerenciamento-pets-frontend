<template>
  <h1>Minha tarefas</h1>
  <span v-if="messageError">{{messageError}}</span>
  <form @submit.prevent="handleAddItem">
    <input placeholder="Digite sua tarefa" v-model="description" data-test="input-description" />
    <button data-test="submit-button" type="submit">Cadastrar</button>
  </form>
  <hr />
  <ol data-test="list">
    <li v-for="item in list" :key="item">{{ item }}</li>
  </ol>
</template>

<script>
export default {
  data() {
    return {
      description: '',
      list: [],
      messageError: ''
    }
  },
  methods: {
    handleAddItem() {
      console.log('entrou handleAddItem')

      if (this.description.length < 5) {
        this.messageError = "A descrição é pequena demais."
      } else {
        this.list = [...this.list, this.description]
        this.description = ''
      }
    }
  }
}
</script>

<style scoped>
input {
  border: 1px solid #000;
  background: #ccc;
  margin: 20px;
}
</style>