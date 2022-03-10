<template>
  
  <div>
    <navbar></navbar>
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
      <select id="typeChart" v-model="typeChart" @change="checkGenerate()">
        <option disabled value="">Choisissez</option>
        <option value="compare">Comparaison</option>
        <option value="score">Score</option>
      </select>

      <label>Produit</label>
      <select id="typeProduct" v-model="typeProduct" @change="checkGenerate()">
        <option disabled value="">Choisissez</option>
        <option value="1">Anti-oxydant (1)</option>
        <option value="2">Hydratant (2)</option>
        <option value="3">Barrière (3)</option>
      </select>

      <label>Option</label>
      <select id="typeOption" v-model="typeOption" @change="checkGenerate()">
        <option disabled value="">Choisissez</option>
        <option value="time">Temps (T0, T1)</option>
        <option value="disperse">Dispertion (SKC, VITC)</option>
      </select>
    </div>

    <button v-if="showGenerate" @click="generateChart()">Générer le graphique</button>
    <pdf v-if="showAddGraph" v-bind:values="pdfValues"></pdf>
    <button v-if="showAddGraph" @click="addGraph()">Ajouter un graphique</button>
    
    <div id="">
        <h3>Score 1 : Hydratant</h3>
        <h5>Comparer Moyenne {{label1}} & {{label2}} de T0 à T1 avec pour critères 1 = Hydratant Moyenne sur (N = 1000) - Date début</h5> 
        <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10">
    </div>

    <div id="containerCharts"></div>

    <div id="">
        <h3>Score 2 : Anti-Oxydant</h3>
        <h5>Comparer Moyenne {{label1}} & {{label2}} de T0 à T1 avec pour critères 1 = Hydratant Moyenne sur (N = 1000) - Date début</h5> 
        <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10">
    </div>
    <div id="">
        <h3>Score 3 : Barrière</h3>
        <h5>Comparer Moyenne {{label1}} & {{label2}} de T0 à T1 avec pour critères 3 = Barrière Moyenne sur (N = 1000) - Date début</h5> 
        <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10">
    </div>
    <div id="">
        <h3>Score 4 : Peau non traité</h3>
        <h5>Comparer Moyenne {{label1}} & {{label2}} de T0 à T1 avec pour critères 1 = Hydratant Moyenne sur (N = 1000) - Date début</h5> 
        <div id="peaunontraite"></div>
    </div>
    <h2>Avis globale</h2>
    <div id="">
        <h3>Note globale : </h3>
        <h3>Intention d'achat : </h3>
        <h3>Préférence : </h3>
        <span>VS</span>
        <h3>Crème habituelle : </h3>
    </div>
    <h2>Efficacité</h2>
      <input type="text">
    <h2>Usage</h2>
      <input type="text">
    <h2>Device IoT</h2>
      <input type="text">
    </div>

</template>

<script src="./Dashboard.js" type="text/javascript"></script>
