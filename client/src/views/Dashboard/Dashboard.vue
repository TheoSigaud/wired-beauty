<template>
  <div>
    <router-view/>

    <div class="container mt-5">
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <input type="file" @change="uploadImage">
              <button @click="upload()">Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Dashboard.js" type="text/javascript"></script>
