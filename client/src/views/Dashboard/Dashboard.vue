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
              <p v-if="errorUpload" style="color: red">{{ errorUpload }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="color: white" v-if="showSelection">
      <label>Type du graphique</label>
      <select v-model="typeChart" @change="checkGenerate()">
        <option disabled value="">Choisissez</option>
        <option value="compare">Comparaison</option>
        <option value="score">Score</option>
      </select>

      <label>Produit</label>
      <select v-model="typeProduct" @change="checkGenerate()">
        <option disabled value="">Choisissez</option>
        <option value="1">Anti-oxidant (1)</option>
        <option value="2">Hydratant (2)</option>
        <option value="3">Barrière (3)</option>
      </select>

      <div v-if="showOption">
        <label>Option</label>
        <select v-model="typeOption" @change="checkGenerate()">
          <option disabled value="">Choisissez</option>
          <option value="skc">Skc</option>
          <option value="vitc">Vitc</option>
        </select>
      </div>
    </div>

    <button v-if="showGenerate" @click="generateChart()">Générer le graphique</button>

    <button v-if="showAddGraph" @click="addGraph()">Ajouter un graphique</button>

    <div id="containerCharts"></div>
  </div>
</template>

<script src="./Dashboard.js" type="text/javascript"></script>
