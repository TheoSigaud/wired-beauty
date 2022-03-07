<template>
  <div>
    <router-view/>

    <div class="container mt-5">
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Rejoindre une partie</h5>
              <input class="input">
              <br>
              <button class="btn btn-primary">Rejoindre</button>
            </div>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Créer une partie</h5>
              <br>
              <button class="btn btn-primary">Créer</button>
            </div>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Histoires</h5>
              <br>
              <router-link v-bind:to="{ name: 'Stories' }"><button class="btn btn-primary">Voir</button></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Dashboard.js" type="text/javascript"></script>
