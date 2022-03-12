<template>
  <div class="row">
    <router-view class="col-3"/>
    <div class="col-8">
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
          <td>{{ report.name }}</td>
          <td>
            <button @click="getPdf(report.name)">Voir</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script src="./Report.js" type="text/javascript"></script>
