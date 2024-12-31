<template>
  <div>
    <h1>Login</h1>
    <div style="color:red;">{{ form.error }}</div>
    <form action="#" @submit.prevent="login">
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
        <button>Login</button>
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
  email: "",
  password: "",
  error: null
})

const router = useRouter()

const LOGIN_MUTATION = gql`
  mutation Login(
    $email: String!
    $password: String!
  ) {
    login(input: { email: $email, password: $password }) {
        token
    }
  }
`

const { mutate, onDone, onError } = useMutation(LOGIN_MUTATION)

const login = () => {
  //form.value.loading = true
  mutate({
    email: form.value.email,
    password: form.value.password,
  })

  onDone((data) => {
    console.log(data)
    localStorage.setItem('apollo-token', data.data.login.token)
    //form.value.loading = false
    //router.push({ name: 'home' })
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
