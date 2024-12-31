<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, ref } from 'vue'

const router = useRouter()

const me = ref({
  is_admin: false,
})

const loggedIn = computed(() => {
  return localStorage.getItem('apollo-token')
})

const { result } = useQuery(gql`
     query MeRes {
              me {
                              id
                              is_admin
                            }
                      }
          `,
        )

//console.log(result.value.me.is_admin)
me.value.is_admin = (result.value === undefined) ? "" : result.value.me.is_admin

const LOGOUT_MUTATION = gql`
  mutation Logout{
    logout {
        message
    }
  }
`

const { mutate, onDone, onError } = useMutation(LOGOUT_MUTATION)

const logout = () => {
  //form.value.loading = true
  mutate({
    //email: form.value.email,
    //password: form.value.password,
  })

  onDone((data) => {
    console.log(data)
    localStorage.removeItem('apollo-token')
    //form.value.loading = false
    //router.push({ name: 'home' })
    window.location.href = '/'
  })

  onError((error) => {
    //logErrorMessages(error)
    console.log(error.graphQLErrors)
    //form.value.loading = false

    //Object.keys(error.graphQLErrors[0].message)[0]
    //form.value.error = error.graphQLErrors[0].message
  })
}

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="loggedIn" to="/me">Me</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink v-if="!loggedIn" to="/register">Register</RouterLink>
        <RouterLink v-if="loggedIn && me.is_admin" to="/admin">Admin</RouterLink>
        <RouterLink v-if="!loggedIn" to="/login">Login</RouterLink>
        <RouterLink v-if="loggedIn" to="/create">Create</RouterLink>
        <a v-if="loggedIn" href="#" @click.prevent="logout">Logout</a>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
