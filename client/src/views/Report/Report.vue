<template>
  <div>
    <router-view/>
    <h1>Vos rapports</h1>

    <table id="table" class="row-border hover">
      <thead>
      <tr>
        <th>Nom</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-bind:key="report.id" v-for="report in reports">
        <td style="color: white">{{ report.name }}</td>
        <td>
          <button @click="getPdf(report.name)">Voir</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script src="./Report.js" type="text/javascript"></script>
