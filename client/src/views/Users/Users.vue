<template>
  <div>
    <router-view/>

    <h1>Users</h1>
    <router-link v-bind:to="{ name: 'NewUser' }" class="btn time-button__green mb-5">Crétion d'un client
    </router-link>
    <div v-if="users.length > 0" class="table-wrap">
      <table>
        <tr>
=          <td>email</td>
        </tr>
        <tr v-bind:key="user.id" v-for="user in users">
          <td style="color: white">{{ user.email }}</td>
        </tr>
      </table>
    </div>
    <div v-else>
      <p>Il n'y a pas de clients</p>
    </div>
  </div>
</template>

<script src="./Users.js" type="text/javascript"></script>
