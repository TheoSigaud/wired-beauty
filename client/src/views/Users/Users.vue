<template>
  <div>
    <router-view/>

    <h1>Users</h1>
    <router-link v-bind:to="{ name: 'NewUser' }" class="btn time-button__green mb-5">Crétion d'un client
    </router-link>
    <div class="table-wrap">
      <table id="table" class="row-border hover">
        <thead>
        <tr>
          <th>Email</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-bind:key="user.id" v-for="user in users">
          <td style="color: white">{{ user.email }}</td>
          <td>
            <button @click="resetPassword(user.email)">Réinitialiser le mot de passe</button>
            <button @click="deleteUser(user.uid)">Supprimer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script src="./Users.js" type="text/javascript"></script>
