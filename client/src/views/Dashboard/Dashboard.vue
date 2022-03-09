<template>
  <div>
    <router-view/>

    <div class="container mt-5">
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <input type="file" accept=".xlsx" @change="uploadFile">
              <button @click="upload()">Upload</button>
              <p v-if="errorUpload" style="color: red">{{errorUpload}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="width: 1400px; height: 500px">
      <canvas id="moisturizingChartLine"></canvas>
    </div>
  </div>
</template>

<script src="./Dashboard.js" type="text/javascript"></script>
