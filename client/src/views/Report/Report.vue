<template>
  <div id="wrapper">
    <router-view />
    <div id="content-wrapper" class="d-flex flex-column">
      <div class="container-fluid">
        <div class="">
          <h1 class="h3 m-3 text-gray-800 font-weight-bold">Your Reports</h1>
          <div class="row"></div>
          <div
            class="
              row
              d-sm-flex
              align-items-center
              justify-content-between
              m-4
              ml-5
            "
          >
            <table id="table" class="hover">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Report.js" type="text/javascript"></script>
