<script setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';


const { result, loading } = useQuery(gql`
      query Posts {
          posts {
        data {
            id
            title
            body
            user {
                id
                name
                email
            }
        }
    }
}
          `)

</script>

<template>
  <main>
    <div>
      <div v-if="loading">Loading..............</div>
      <ul style="list-style-type: none; padding-left: 0;" v-if="result && result.posts">
        <li v-for="post in result.posts.data" :key="post.id">
          <RouterLink :to="{ name: 'post', params: {id: post.id}} ">
          {{ post.title }}
           </RouterLink>
        </li>
      </ul>
    </div>
  </main>
</template>
