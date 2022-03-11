<template>
  <div id="wrapper">
    <Navbar></Navbar>
    <router-view/>
    <div id="content-wrapper" class="d-flex flex-column">
      <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-center m-4">
          <label class="custom-file-upload m-3">
            <input type="file" accept=".xlsx" @change="uploadFile"/>
            <i class="fas fa-upload"></i> Import your file
          </label>

          <button class="btn btn-primary" @click="upload()">Upload</button>
        </div>
        <div class="d-sm-flex align-items-center justify-content-center">
          <p>Format accepted : .xlsx</p>
          <p v-if="errorUpload" style="color: red">{{ errorUpload }}</p>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-xl-2 col-md-4 mb-4">
            <label>Type du graphique</label>
            <select
              class="form-select"
              id="typeChart"
              v-model="typeChart"
              @change="checkGenerate()"
            >
              <option disabled value="">Choisissez</option>
              <option value="compare">Comparaison</option>
              <option value="score">Score</option>
            </select>
          </div>
          <div class="col-xl-2 col-md-4 mb-4">
            <label>Produit</label>
            <select
              class="form-select"
              id="typeProduct"
              v-model="typeProduct"
              @change="checkGenerate()"
            >
              <option disabled value="">Choisissez</option>
              <option value="1">Anti-oxydant (1)</option>
              <option value="2">Hydratant (2)</option>
              <option value="3">Barrière (3)</option>
            </select>
          </div>
          <div class="col-xl-2 col-md-4 mb-4">
            <label>Option</label>
            <select
              class="form-select"
              id="typeOption"
              v-model="typeOption"
              @change="checkGenerate()"
            >
              <option disabled value="">Choisissez</option>
              <option value="skc">Skc</option>
              <option value="vitc">Vitc</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <button v-if="showGenerate" @click="generateChart()">
          Générer le graphique
        </button>
      </div>

      <Pdf v-if="showAddGraph" v-bind:values="pdfValues"></Pdf>
      <button v-if="showAddGraph" @click="addGraph()">
        Ajouter un graphique
      </button>

      <div id="">
        <h3>Score 1 : Hydratant</h3>
        <h5>
          Comparer Moyenne {{ label1 }} & {{ label2 }} de T0 à T1 avec pour
          critères 1 = Hydratant Moyenne sur (N = 1000) - Date début
        </h5>
        <input
          type="text"
          id="name"
          name="name"
          required
          minlength="4"
          maxlength="8"
          size="10"
        />
      </div>

      <div id="containerCharts"></div>
    </div>
  </div>
</template>

<script src="./Dashboard.js" type="text/javascript"></script>
