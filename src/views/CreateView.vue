<template>
  <div class="create">
    <h1>Create Post</h1>
    <div style="color: red; margin-bottom: 12px;">{{ form.errors }}</div>
    <div>
      <form action="#" @submit.prevent="createPost">
        <div>
        <label for="title">Title</label>
        <input v-model="form.title" type="text" name="title" id="title">
        </div>

        <div>
        <label for="body">Body</label>
        <textarea v-model="form.body" name="body" id="body" cols="30" rows="10"></textarea>
        </div>

        <button type="submit">Create Post</button>
        <div v-if="form.loading">Loading........</div>
      </form>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .create {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script setup>
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
//import { logErrorMessages } from 'vue/apollo-util'

const form = ref({
  title: '',
  body: '',
  errors: null,
  loading: false
})

const router = useRouter()

const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $user_id: ID!
    $title: String!
    $body: String!
  ) {
    createPost(user_id: $user_id, title: $title, body: $body) {
      id
      title
      body
    }
  }
`

const { mutate, onDone, onError } = useMutation(CREATE_POST_MUTATION)

const createPost = () => {
  form.value.loading = true
  mutate({
    user_id: 10,
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
