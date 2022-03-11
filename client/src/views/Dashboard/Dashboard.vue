<template>
  <div id="wrapper">
    <Navbar></Navbar>
    <router-view />
    <div id="content-wrapper" class="d-flex flex-column">
      <div class="container-fluid">
        <div
          class="d-sm-flex align-items-center justify-content-between m-4 ml-5"
        >
          <h1 class="h3 mb-0 text-gray-800">Report Builder</h1>
        </div>
        <div
          class="row d-sm-flex align-items-center justify-content-center m-0"
        >
          <div class="col-md-9 ml-5">
            <h4>Step 1 : Import your file</h4>
          </div>
          <div class="col-md-3">
            <label class="custom-file-upload m-1">
              <input type="file" accept=".xlsx" @change="uploadFile" />
              <i class="fas fa-upload"></i> Import your file
            </label>
            <button class="btn btn-primary shadow-sm" @click="upload()">
              Upload
            </button>
          </div>
        </div>
        <div
          class="d-sm-flex align-items-center justify-content-center m-0"
        >
          <p>Format of file : .xlsx</p>
        </div>
        <div
          class="d-sm-flex align-items-center justify-content-center m-0"
        >
          <span id="NameFileUploaded"></span>
        </div>
        <div
          class="d-sm-flex align-items-center justify-content-center m-0"
        >
          <p v-if="errorUpload" style="color: red">{{ errorUpload }}</p>
        </div>
        <div class="row align-items-center justify-content-center">
          <h4 class="col-md-9 m-5" v-if="showSelection">
            Step 2 : Select the data you want in the report
          </h4>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-xl-4 col-md-4 mb-2" v-if="showSelection">
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
          <div class="col-xl-4 col-md-4 mb-2" v-if="showSelection">
            <label>Produit</label>
            <select
              class="form-select"
              id="typeProduct"
              v-model="typeProduct"
              @change="checkGenerate()"
            >
              <option disabled value="">Choisissez</option>
              <option value="1">Hydratant (1)</option>
              <option value="2">Anti-Oxydant (2)</option>
              <option value="3">Barrière (3)</option>
            </select>
          </div>
          <div class="col-xl-4 col-md-4 mb-2" v-if="showOption">
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
      <div class="row align-items-center justify-content-center">
        <div class="col-md-2">
          <button v-if="showGenerate" @click="generateChart()">
            Générer le graphique
          </button>
        </div>
        <div class="col-md-2">
          <Pdf v-if="showAddGraph" v-bind:values="pdfValues"></Pdf>
          <button v-if="showAddGraph" @click="addGraph()">
            Ajouter un graphique
          </button>
        </div>
      </div>
      <div class="row align-items-center justify-content-center">
        <div class="col-md-10 m-4">
          <h5>Score 1 : Hydratant</h5>
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
      </div>
      <div class="row align-items-center justify-content-center">
        <div class="col-md-10 m-4">
          <h3>Score 2 : Anti-Oxydant</h3>
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
      </div>
      <div class="row align-items-center justify-content-center">
        <div class="col-md-10 m-4">
          <h3>Score 3 : Barrière</h3>
          <h5>
            Comparer Moyenne {{ label1 }} & {{ label2 }} de T0 à T1 avec pour
            critères 3 = Barrière Moyenne sur (N = 1000) - Date début
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
      </div>
      <div class="row align-items-center justify-content-center">
        <div class="col-md-10 m-4">
          <h3>Score 4 : Peau non traité</h3>
          <h5>
            Comparer Moyenne {{ label1 }} & {{ label2 }} de T0 à T1 avec pour
            critères 1 = Hydratant Moyenne sur (N = 1000) - Date début
          </h5>
          <div id="peaunontraite"></div>
        </div>
      </div>
      <div id="containerCharts"></div>
      <div class="row align-items-center justify-content-center">
        <div class="col-md-12 m-4">
          <h2>Avis globale</h2>
          <div id="">
            <h3>Note globale :</h3>
            <h3>Intention d'achat :</h3>
            <h3>Préférence :</h3>
            <span>VS</span>
            <h3>Crème habituelle :</h3>
          </div>
          <h2>Efficacité</h2>
          <input type="text" />
          <h2>Usage</h2>
          <input type="text" />
          <h2>Device IoT</h2>
          <input type="text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Dashboard.js" type="text/javascript"></script>
