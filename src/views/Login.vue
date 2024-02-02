<template>
  <form @submit.prevent="handleSubmit">
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://yt3.googleusercontent.com/N2jcFNzjfqRVZ07qkh3xn1VM7ka9Xa3O8o968DAOqoX4i1nRC_yv2hhcLfSf3tY5BJ6XcBuegg=s900-c-k-c0x00ffffff-no-rj"
    ></v-img>
    
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="email"
      />

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        v-model="password"
      />

      <v-btn
        block
        class="mb-8"
        color="orange"
        size="large"
        variant="flat"
        type="submit"
      >
        Log In
      </v-btn>
    </v-card>
  </form>
</template>

<script>
import api from '../services/api'

import AuthenticationService from '../services/AuthenticationService'

  export default {
    data() {
        return {
            visible: false,
            email: '',
            password: ''
        }
    },
    methods: {
        handleSubmit(){
            AuthenticationService.login({
                email: this.email,
                password: this.password
            })
            .then((data) => {
                api.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}` 
                localStorage.setItem("@token_petshop", data.data.token)
                localStorage.setItem("@permissions_petshop", JSON.stringify(data.data.permissions))
                this.$router.push("/home")
            })
            .catch((error) => {
                console.log(error)
                alert("Credenciais incorretas")
            })   
        }
    }
  }
</script>