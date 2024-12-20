<script setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ApolloQuery } from '@vue/apollo-components';


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
    <div>
      <h2>Apollo Query Component</h2>
      <ApolloQuery :query="gql => gql`
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
    `">
        <template v-slot="{ result: { loading, error, data } }">
          <!-- Loading -->
          <div v-if="loading" class="loading apollo">Loading...</div>

          <!-- Error -->
          <div v-else-if="error" class="error apollo">An error occurred</div>

          <!-- Result -->
            <ul style="list-style-type: none; padding-left: 0;" v-if="data.posts">
              <li v-for="post in data.posts.data" :key="post.id">
                <RouterLink :to="{ name: 'post', params: {id: post.id}} ">
                  {{ post.title }}
                </RouterLink>
              </li>
            </ul>


          <!-- No result -->
          <div v-else class="no-result apollo">No result :(</div>
        </template>
      </ApolloQuery>
    </div>
  </main>
</template>
