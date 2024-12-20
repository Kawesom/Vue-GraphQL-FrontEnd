<template>
  <div class="post">
    <h1>This is the post page for post no.{{ $route.params.id }}</h1>

    <div>
      <div v-if="loading">Loading..............</div>
      <div v-if="result && result.post">
        <h2>{{ result.post.title }}</h2>
        <div>{{ result.post.body }}</div>
      </div>
      <div v-else>
        <h2> No Post was found.</h2>
      </div>
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
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useRoute } from 'vue-router';


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

</script>

