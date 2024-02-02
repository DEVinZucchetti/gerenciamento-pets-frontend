<template>
  <v-container>
    <h1>Lista de veterinários</h1>
    <v-table>
      <thead class="header-table">
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">Especialidade</th>
          <th class="text-left">Registro</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style scoped>
.header-table {
  background: tomato;
  color: #fff;
  font-weight: bold;
}

tbody tr:nth-child(2n) {
  background: #f2f0f0;
}

</style>