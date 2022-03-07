<template>
  <div>
    <h1>Users</h1>
    <div v-if="users.length > 0" class="table-wrap">
      <table>
        <tr>
          <td width="550">Pseudo</td>
          <td width="100" align="center">email</td>
        </tr>
        <tr v-bind:key="user.id" v-for="user in users">
          <td>{{ user.pseudo }}</td>
          <td>{{ user.email }}</td>
        </tr>
      </table>
    </div>
    <div v-else>
      There are no posts.. Lets add one now!!! <br /><br />
      <router-link v-bind:to="{ name: 'NewPost' }" class="add_post_link">Add Post</router-link>
    </div>
  </div>
</template>

<script src="./Users.js" type="text/javascript"></script>
