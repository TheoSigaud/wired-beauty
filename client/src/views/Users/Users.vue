<template>
  <div class="row">
    <router-view class="col-3"/>

    <div class="col-8">
    <div id="content-wrapper" class="d-flex flex-column">
      <div class="container-fluid">
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
          <td>{{ user.email }}</td>
          <td>
            <button class="btn btn-primary" @click="resetPassword(user.email)">Réinitialiser le mot de passe</button>
            <button class="btn btn-primary" @click="deleteUser(user.uid)">Supprimer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
    </div>
  </div>
  </div>
</template>

<script src="./Users.js" type="text/javascript"></script>
