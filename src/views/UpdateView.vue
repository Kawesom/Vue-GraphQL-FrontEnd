<template>
  <div class="post">
    <h1>This is the update page for post no.{{ $route.params.id }}</h1>

    <div>
      <div style="color: red; margin-bottom: 12px;">{{ form.errors }}</div>
    </div>
    <div>
      <form action="#" @submit.prevent="updatePost">
        <div>
        <label for="title">Title</label>
        <input v-model="form.title" type="text" name="title" id="title">
        </div>

        <div>
        <label for="body">Body</label>
        <textarea v-model="form.body" name="body" id="body" cols="30" rows="10"></textarea>
        </div>

        <button type="submit">Update Post</button>
        <div v-if="form.loading">Loading........</div>
      </form>
    </div>
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
import { ref } from 'vue';

const form = ref({
  title: "",//result.post.title,
  body: "",//result.post.body,
  loading: false,
  errors: null
})



const { result, loading } = useQuery(gql`
     query Post($id: ID!) {
              post(id: $id) {
                              id
                              title
                              body
                            }
                      }
          `,{
          id: useRoute().params.id,
          }
        )
form.value.title = result.value.post.title
form.value.body = result.value.post.body

const router = useRouter()
const route = useRoute()

const UPDATE_POST_MUTATION = gql`
  mutation updatePost(
    $id: ID!
    $title: String!
    $body: String!
  ) {
    updatePost(id: $id, title: $title, body: $body) {
      id
      title
      body
    }
  }
`

const { mutate, onDone, onError } = useMutation(UPDATE_POST_MUTATION)

const updatePost = () => {
  form.value.loading = true
  mutate({
    id: route.params.id,
    title: form.value.title,
    body: form.value.body,
  })

  onDone((data) => {
    console.log(data)
    form.value.loading = false
    router.push({ name: 'home' })
  })

  onError((error) => {
    //logErrorMessages(error)
    console.log(error.graphQLErrors)
    form.value.loading = false

    Object.keys(error.graphQLErrors[0].message)[0]
    form.value.errors = error.graphQLErrors[0].message
  })
}
</script>

