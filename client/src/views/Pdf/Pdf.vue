<template>
  <div>
    <router-view/>

    <h1>Rapports</h1>
    <div class="table-wrap">
      <table id="table" class="row-border hover">
        <thead>
        <tr>
          <th>Email</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-bind:key="pdf.id" v-for="pdf in pdf">
          <td style="color: white">{{ pdf.name }}</td>
          <td>
<!--            <button @click="resetPassword(pdf.email)">Réinitialiser le mot de passe</button>-->
<!--            <button @click="deleteUser(pdf.uid)">Supprimer</button>-->
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script src="./Pdf.js" type="text/javascript"></script>
