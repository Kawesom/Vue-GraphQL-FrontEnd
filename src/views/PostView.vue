<template>
  <div class="post">
    <h1>This is the post page for post no.{{ $route.params.id }}</h1>

    <div>
      <div v-if="loading">Loading..............</div>
      <div>{{ error }}</div>
      <div v-if="result && result.post">
        <h2>{{ result.post.title }}</h2>
        <div>{{ result.post.body }}</div>
      </div>
      <div v-else>
        <h2> No Post was found.</h2>
      </div>
    </div>
  </div>

  <RouterLink v-if="res.me.id  == result.post.user.id" :to="{ name: 'update', params: {id: $route.params.id}}">
    Update
  </RouterLink>

  <button  v-if="res.me.id  == result.post.user.id" @click="deletePost">Delete Post</button>
  <div >
    <h2>Apollo Query Component</h2>
      <ApolloQuery :query="gql => gql`
       query Post($id: ID!) {
              post(id: $id) {
                              id
                              title
                              body
                            }
                      }
    `"
    :variables="{id: $route.params.id }">
        <template v-slot="{ result: { loading, error, data } }">
          <!-- Loading -->
          <div v-if="loading" class="loading apollo">Loading...</div>

          <!-- Error -->
          <div v-else-if="error" class="error apollo">An error occurred</div>

          <!-- Result -->
          <div v-else-if="data" class="result apollo">
            <h2>{{ data.post.title }}</h2>
            <div>{{ data.post.body }}</div>
          </div>

          <!-- No result -->
          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .post {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script setup>
import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useRoute, useRouter } from 'vue-router';
import { ApolloQuery } from '@vue/apollo-components';
import { ref } from 'vue';

const error = ref(null)


const { result: res } = useQuery(gql`
     query MeResult {
              me {
                              id
                  }
                      }
          `,
        )


const { result, loading } = useQuery(gql`
     query Post($id: ID!) {
              post(id: $id) {
                              id
                              title
                              body
                              user {
                                id
                              }
                            }
                      }
          `,{
          id: useRoute().params.id,
          }
        )

loading.value = ref(false)


const router = useRouter()
const route = useRoute()

const DELETE_POST_MUTATION = gql`
  mutation deletePost(
    $id: ID!
  ) {
    deletePost(id: $id) {
      id
    }
  }
`

const { mutate, onDone, onError } = useMutation(DELETE_POST_MUTATION)

const deletePost = () => {
  loading.value = true
  mutate({
    id: route.params.id,
  })

  onDone((data) => {
    console.log(data)
    loading.value = false
    router.push({ name: 'home' })
  })

  onError((error) => {
    //logErrorMessages(error)
    console.log(error.graphQLErrors)
    loading.value = false

    //Object.keys(error.graphQLErrors[0].message)[0]
    error.value = error.graphQLErrors[0].message
  })
}

</script>

