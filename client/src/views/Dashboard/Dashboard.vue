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

    <div v-if="showSelectChart">
      <div class="container mt-5" @click="selectChart('vertical')">
        <div class="row">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <img src="@/assets/vertical-chart.png" width="80%">
                <p style="color: black">Vertical bar</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-5" @click="selectChart('line')">
        <div class="row">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <img src="@/assets/line-chart.png" width="80%">
                <p style="color: black">Line chart</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-5" @click="selectChart('scatter')">
        <div class="row">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <img src="@/assets/scatter-chart.png" width="80%">
                <p style="color: black">Scatter chart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showSelectAxes">
      <div class="container mt-5" @click="selectChart('scatter')">
        <div class="row">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <p style="color: black">User id</p>
                <select v-model="selectUserId">
                  <option value="all">Tout</option>
                  <option v-for="userId in usersId" :value="userId" :key="userId">
                    {{ userId }}
                  </option>
                </select>

                <p style="color: black">Axe X</p>
                <select v-model="axisX">
                  <option v-for="title in titles" :value="title" :key="title">
                    {{ title }}
                  </option>
                </select>

                <p style="color: black">Axe Y</p>
                <select v-model="axisY">
                  <option v-for="title in titles" :value="title" :key="title">
                    {{ title }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <canvas id="turnover" width="170" height="60"></canvas>
  </div>
</template>

<script src="./Dashboard.js" type="text/javascript"></script>
