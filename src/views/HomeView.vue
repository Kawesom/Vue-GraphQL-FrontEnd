<script setup>
import { useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ApolloQuery } from '@vue/apollo-components';
import { useRoute } from 'vue-router';


const { result, loading: createPostLoading } = useQuery(gql`
      query getPosts($page: Int!) {
              posts(page: $page) {
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
                      paginatorInfo {
                            currentPage
                            count
                            firstItem
                            hasMorePages
                            lastItem
                            lastPage
                            perPage
                            total
                        }
        }
}
          `, {
            page: useRoute().query.page ? parseInt(useRoute().query.page) : 1
          })

          //const posts = useResult(result, null, data => data.posts)

          const { result: postResult } = useQuery(
      gql`
        query getPost($id: ID!) {
          post(id: $id) {
            title
            body
          }
        }
      `,
      {
        id: 1,
      }
    )

</script>

<template>
  <main>
    <div>
      <div v-if="createPostLoading">Loading..............</div>
      <ul style="list-style-type: none; padding-left: 0;" v-if="result && result.posts">
        <li v-for="post in result.posts.data" :key="post.id">
          <RouterLink :to="{ name: 'post', params: {id: post.id}} ">
            {{ post.title }}
          </RouterLink>
        </li>
      </ul>
      <div v-if="result.posts">
        <div>{{ result.posts.paginatorInfo.total }} total results</div>
        <div>
          Page {{ result.posts.paginatorInfo.currentPage }} of
          {{ result.posts.paginatorInfo.lastPage }}
        </div>
        <div>
          <router-link
            :to="`/?page=${result.posts.paginatorInfo.currentPage - 1}`"
            v-if="result.posts.paginatorInfo.currentPage != 1"
            >Prev</router-link
          >
          &nbsp;
          <router-link
            :to="`/?page=${result.posts.paginatorInfo.currentPage + 1}`"
            v-if="result.posts.paginatorInfo.hasMorePages"
            >Next</router-link
          >
        </div>
      </div>
    </div>
    <div>
      <h2>Apollo Query Component</h2>
      <ApolloQuery :query="gql => gql`
                query Posts($page: Int!) {
                    posts(page: $page) {
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
                        paginatorInfo {
                            currentPage
                            count
                            firstItem
                            hasMorePages
                            lastItem
                            lastPage
                            perPage
                            total
                        }

              }
          }
    `"
    :variables="{page: $route.query.page ? parseInt($route.query.page) : 1}">
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
