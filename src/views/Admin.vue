<template>
  <div>
    <h1>Admin</h1>

    <ul>
      <li v-for="user in result.users" :key="user.id">
        {{ user.name }} ({{ user.email }}) Admin: {{ user.is_admin }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';


const { result, error } = useQuery(
      gql`
        query Users {
    users {
        name
        email
        id
        is_admin
    }
}
      `
    )
    console.log(error.value)

</script>
