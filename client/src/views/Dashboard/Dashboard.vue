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
          <div class="col-xl-2 col-md-2 mt-3" v-if="showGenerate">
            <button
              class="btn btn-primary shadow-sm"
              v-if="showGenerate"
              @click="generateChart()"
            >
              Générer le graphique
            </button>
          </div>
          <div class="col-xl-2 col-md-2 m-2" v-if="showAddGraph">
            <button
              class="btn btn-primary shadow-sm"
              v-if="showAddGraph"
              @click="addGraph()"
            >
              Ajouter un graphique
            </button>
          </div>
          <div class="col-xl-2 col-md-4 mb-4" v-if="showOption">
            <Pdf v-if="showAddGraph" v-bind:values="pdfValues"></Pdf>
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-md-10 m-0">
            <div id="ChartScoreHydratant" v-if="showScore">
              <h5>Score 1 : Hydratant</h5>
            </div>
            <div id="ChartCompareHydratant" v-if="showCompare">
              <h5>
                Comparer Moyenne {{ label1 }} & {{ label2 }} de T0 à T1 avec
                pour critères 1 = Hydratant Moyenne sur (N = 1000) - Date début
              </h5>
            </div>
          </div>
          <div class="col-md-4" v-if="showCompare || showScore">
            <h6>Commentaires</h6>
            <input
              class="form-control input-lg"
              type="text"
              id="CommentHydratant"
              name="name"
              minlength="5"
              maxlength="255"
              size="50"
            />
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-md-10 m-4">
            <div id="ChartScoreAntiOxydant" v-if="showScore">
              <h5>Score 2 : Anti-Oxydant</h5>
            </div>
            <div id="ChartCompareAntiOxydant" v-if="showCompare">
              <h5>
                Comparer Moyenne {{ label1 }} & {{ label2 }} de T0 à T1 avec
                pour critères 2 = Anti-Oxydant Moyenne sur (N = 1000) - Date
                début
              </h5>
            </div>
          </div>
          <div class="col-md-4" v-if="showCompare || showScore">
            <h6>Commentaires</h6>
            <input
              class="form-control input-lg"
              type="text"
              id="CommentAntiOxydant"
              name="name"
              minlength="5"
              maxlength="255"
              size="50"
            />
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-md-10 m-4">
            <div id="ChartScoreBarriere" v-if="showScore">
              <h5>Score 3 : Barrière</h5>
            </div>
            <div id="ChartCompareBarriere" v-if="showCompare">
              <h5>
                Comparer Moyenne {{ label1 }} & {{ label2 }} de T0 à T1 avec
                pour critères 3 = Barrière Moyenne sur (N = 1000) - Date début
              </h5>
            </div>
          </div>
          <div class="col-md-4" v-if="showCompare || showScore">
            <h6>Commentaires</h6>
            <input
              class="form-control input-lg"
              type="text"
              id="CommentBarriere"
              name="name"
              minlength="5"
              maxlength="255"
              size="50"
            />
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-md-10 m-4">
            <div id="ChartScorePeau" v-if="showScore">
              <h5>Score 4 : Peau non traité</h5>
            </div>
            <div id="ChartComparePeauNonTraite" v-if="showCompare">
              <h5>
                Comparer Moyenne {{ label1 }} & {{ label2 }} de T0 à T1 avec
                pour critères 1 = Hydratant Moyenne sur (N = 1000) - Date début
              </h5>
            </div>
          </div>
        </div>

        <div id="containerCharts"></div>

        <div
          class="row align-items-center justify-content-center"
          v-if="showCompare || showScore"
        >
          <div class="col-md-3 m-0">
            <h5>Avis globale</h5>
            <div id="row">
              <p>Note globale :</p>
            </div>
            <div id="row">
              <p>Intention d'achat :</p>
            </div>
            <div id="row">
              <p>Préférence :</p>
              <span>VS</span>
              <p>Crème habituelle :</p>
            </div>
          </div>
          <div class="col-md-3 m-3">
            <p>Efficacité</p>
            <input class="form-control" type="text" />
            <p>Usage</p>
            <input class="form-control" type="text" />
            <p>Device IoT</p>
            <input class="form-control" type="text" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Dashboard.js" type="text/javascript"></script>
