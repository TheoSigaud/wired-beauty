<template>
  <div id="wrapper">
    <Navbar></Navbar>
    <router-view />
    <div id="content-wrapper" class="d-flex flex-column">
      <div class="container-fluid">
        <div
          class="d-sm-flex align-items-center justify-content-between m-4 ml-5"
        >
          <h1 class="h3 mb-0 mt-2 text-gray-800 font-weight-bold">Report Builder</h1>
        </div>
        <div
          class="row d-sm-flex align-items-center justify-content-center m-0"
        >
          <div class="col-lg-3 col-md-5">
            <label class="custom-file-upload m-1 shadow-sm">
              <input type="file" accept=".xlsx" @change="uploadFile" />
              <i class="fas fa-upload"></i> Import your file
            </label>
            <button class="btn btn-primary shadow-sm" @click="upload()">
              Upload
            </button>
          </div>
        </div>
        <div class="d-sm-flex align-items-center justify-content-center m-0">
          <p>Format of file : .xlsx</p>
        </div>
        <div class="d-sm-flex align-items-center justify-content-center m-0">
          <span id="NameFileUploaded">No file imported</span>
        </div>
        <div class="d-sm-flex align-items-center justify-content-center m-0">
          <p v-if="errorUpload" style="color: red">{{ errorUpload }}</p>
        </div>
        <div class="row align-items-center justify-content-center">
          <h5 class="col-md-3 m-1 mt-3" v-if="showSelection">
            Customize your report here :
          </h5>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-xl-4 col-md-4 mb-2" v-if="showSelection">
            <label>Chart type</label>
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
          <div class="col-xl-4 col-md-4 mb-2" v-if="showOption || showSelection">
            <label>Utilisateur</label>
            <select
              class="form-select"
              id="typeUser"
              v-model="typeUser"
              @change="checkGenerate()"
            >
              <option disabled value="">Choisissez</option>
              <option value="all">Tous</option>
              <option v-for="listUser in listUsers" :value="listUser" :key="listUser">
                {{ listUser }}
              </option>
            </select>
          </div>
          <div class="col-xl-2 col-md-4 mb-4" v-if="showOption">
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
          <div class="col-xl-auto col-md-3 mt-3" v-if="showGenerate">
            <button
              class="btn btn-primary shadow-sm"
              v-if="showGenerate"
              @click="generateChart()"
            >
              Build charts
            </button>
          </div>
          <div class="col-xl-auto col-md-2 m-2" v-if="showAddGraph">
            <button
              class="btn btn-primary shadow-sm"
              v-if="showAddGraph"
              @click="addGraph()"
            >
              <i class="fa-solid fa-plus"></i> Add chart
            </button>
          </div>
          <div class="col-xl-auto col-md-2 m-2" v-if="showAddGraph">
            <Pdf v-if="showAddGraph" v-bind:values="pdfValues" v-bind:charts="charts"></Pdf>
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-md-10 m-0">
            <h5
              class="row align-items-center justify-content-center"
              v-if="showScore"
            >
              Score 1 : Hydratant
            </h5>
            <div
              class="align-items-center justify-content-center"
              id="ChartScoreHydratant"
              v-if="showScore"
            ></div>
            <h5
              class="row align-items-center justify-content-center m-2"
              v-if="showCompare"
            >
              Comparer Moyenne {{ label1 }} & {{ label2 }} de T0 à T1 avec pour
              critères 1 = Hydratant Moyenne sur (N = 1000) - Date début
            </h5>
            <div
              class="
                d-lg-flex
                align-items-center
                justify-content-center
                shadow
                mb-4
                p-5
                b-rounded
              "
              id="ChartCompareHydratant"
              v-if="showCompare"
            ></div>
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
            <h5 v-if="showScore">Score 2 : Anti-Oxydant</h5>
            <div id="ChartScoreAntiOxydant" v-if="showScore"></div>
            <h5
              class="row align-items-center justify-content-center"
              v-if="showCompare"
            >
              Comparer Moyenne {{ label1 }} & {{ label2 }} de T0 à T1 avec pour
              critères 2 = Anti-Oxydant Moyenne sur (N = 1000) - Date début
            </h5>
            <div
              class="
                d-lg-flex
                align-items-center
                justify-content-center
                shadow
                mb-4
                p-5
                b-rounded
              "
              id="ChartCompareAntiOxydant"
              v-if="showCompare"
            ></div>
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
            <h5
              class="row align-items-center justify-content-center"
              v-if="showScore"
            >
              Score 3 : Barrière
            </h5>
            <div
              class="d-lg-flex align-items-center justify-content-center"
              id="ChartScoreBarriere"
              v-if="showScore"
            ></div>
            <h5
              class="row align-items-center justify-content-center"
              v-if="showCompare"
            >
              Comparer Moyenne {{ label1 }} & {{ label2 }} de T0 à T1 avec pour
              critères 3 = Barrière Moyenne sur (N = 1000) - Date début
            </h5>
            <div
              class="
                d-lg-flex
                align-items-center
                justify-content-center
                shadow
                mb-4
                p-5
                b-rounded
              "
              id="ChartCompareBarriere"
              v-if="showCompare"
            ></div>
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
            <h5
              class="row align-items-center justify-content-center"
              v-if="showScore"
            >
              Score 4 : Peau non traité
            </h5>
            <div
              class="
                d-lg-flex
                align-items-center
                justify-content-center
                shadow
                mb-4
                p-5
                b-rounded
              "
              id="ChartScorePeau"
              v-if="showScore"
            ></div>
            <h5
              class="row align-items-center justify-content-center"
              v-if="showCompare"
            >
              Comparer Moyenne {{ label1 }} & {{ label2 }} de T0 à T1 avec pour
              critères 1 = Hydratant Moyenne sur (N = 1000) - Date début
            </h5>
            <div
              class="d-lg-flex align-items-center justify-content-center"
              id="ChartComparePeauNonTraite"
              v-if="showCompare"
            ></div>
          </div>
        </div>

        <div id="containerCharts"></div>

        <div
          class="row align-items-center justify-content-center"
          v-if="showCompare || showScore"
        >
          <h3>Utilisateurs</h3>
          <div class="col-md-6">
            <div
              class="row align-items-center justify-content-center text-center"
            >
              <h3 class="">Avis globale</h3>
              <div class="row align-items-center">
                <div class="col-md-3 mt-3">
                  <p>Note globale :</p>
                </div>
                <div class="col-md-2 m-0">
                  <input class="form-control" type="number" min="0" max="10" />
                </div>
                <div class="col-md-auto m-0">
                  <span>/ 10</span>
                </div>
              </div>
              <div id="row align-items-center justify-content-center">
                <p>Pensez-vous acheter ce produit ? :</p>
                <div class="col-md-2 m-0">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Oui
                    </label>
                  </div>
                </div>
                <div class="col-md-2 ml-1">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Non
                    </label>
                  </div>
                </div>
              </div>
              <div id="row">
                <p>Précisez vos produit(s) habituel(s) ?</p>
                <input class="form-control m-2" type="text" />
                <p>
                  Qu'aimez-vous dans ce(s) produit(s)' ? Par exemple : texture,
                  application, etc
                </p>
                <input class="form-control m-2" type="text" />
              </div>
            </div>
            <div
              class="row align-items-center justify-content-center"
              v-if="showCompare || showScore"
            >
              <div class="col-md-6 m-3">
                <p>Avez-vous trouver ce produit efficace ?</p>
                <input class="form-control m-2" type="text" />
                <p>
                  Avez-vous trouvé son usage facile ? Pourriez-vous l'intégrer à
                  votre routine ?
                </p>
                <input class="form-control m-2" type="text" />
                <p>
                  Qu'avez vous pensé de la technologie Application/Capteur ? Que
                  pensez-vous de cet innovation en général ?
                </p>
                <input class="form-control m-2" type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Dashboard.js" type="text/javascript"></script>
