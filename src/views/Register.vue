<template>
  <div>
    <h1>Register</h1>
    <div style="color:red;">{{ form.error }}</div>
    <form action="#" @submit.prevent="register">
      <div>
        <label for="name">Name</label>
        <input v-model="form.name" type="name" name="name" id="name" />
      </div>
      <div>
        <label for="email">Email</label>
        <input v-model="form.email" type="email" name="email" id="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          v-model="form.password"
          type="password"
          name="password"
          id="password"
        />
      </div>
      <div>
        <label for="password">Password Confirmation</label>
        <input
          v-model="form.password_confirmation"
          type="password"
          name="password_confirmation"
          id="password_confirmation"
        />
      </div>
      <div>
        <button>Register</button>
      </div>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import gql from 'graphql-tag';
import { useRouter } from 'vue-router';
import { useMutation } from '@vue/apollo-composable';

const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  error: null
})

const router = useRouter()

const REGISTER_MUTATION = gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $password_confirmation: String!
  ) {
    register(input: { name: $name, email: $email, password: $password, password_confirmation: $password_confirmation, }) {
        token
    }
  }
`

const { mutate, onDone, onError } = useMutation(REGISTER_MUTATION)

const register = () => {
  //form.value.loading = true
  mutate({
    name: form.value.name,
    email: form.value.email,
    password: form.value.password,
    password_confirmation: form.value.password_confirmation,
  })

  onDone((data) => {
    console.log(data)
    //form.value.loading = false
    //router.push({ name: 'home' })
    localStorage.setItem('apollo-token', data.data.register.token)
    window.location.href = '/me'
  })

  onError((error) => {
    //logErrorMessages(error)
    console.log(error.graphQLErrors)
    //form.value.loading = false

    Object.keys(error.graphQLErrors[0].message)[0]
    form.value.error = error.graphQLErrors[0].message
  })
}

</script>
