<template>
  <div>
    <h1>My Info</h1>
    {{ error }}
    <div v-if="me">
      <div>{{ me.name }}</div>
      <div>{{ me.email }}</div>
    </div>
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref } from 'vue';

const me = ref({
  name: "",
  email: ""
})


const { result, loading, error } = useQuery(gql`
     query Me {
              me {
                              id
                              name
                              email
                            }
                      }
          `,
        )
me.value.name = (result.value === undefined) ? "" : result.value.me.name
me.value.email = (result.value === undefined) ? "" : result.value.me.email

</script>
