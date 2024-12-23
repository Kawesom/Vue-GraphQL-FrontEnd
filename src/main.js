import './assets/main.css'

import { createApp, h, provide } from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import VueApolloComponents from '@vue/apollo-components'
import { DefaultApolloClient } from '@vue/apollo-composable'


// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:8000/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
  
})

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(apolloProvider)
app.use(VueApolloComponents)

app.use(router)

app.mount('#app')
