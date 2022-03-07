<template>
  <div>
    <router-view/>

    <div class="container mt-5">
      <div class="d-flex justify-content-center">
        <h3 class="mb-5 mt-5">Modification de l'histoire</h3>
      </div>
      <div class="row d-flex justify-content-center mb-5">
        <div class="col-6">
          <div class="card time-card time-form">
            <div class="card-body">
              <button @click="$router.go(-1)" class="btn time-button__green mb-5"><i class="fas fa-arrow-left"></i>
                Retour
              </button>
              <form v-on:submit.prevent="checkForm()">
                <div class="d-flex justify-content-center mt-4">

                  <div class="form-floating mb-4">
                    <input type="text" class="form-control" placeholder="Titre" v-model="name">
                    <label>Titre</label>
                    <div class="container-error">
                      <small>{{ errors.name }}</small>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-center">
                  <div class="form-floating mb-4">
                    <textarea class="form-control" placeholder="Description" v-model="description"></textarea>
                    <label>Description</label>
                    <div class="container-error">
                      <small>{{ errors.description }}</small>
                    </div>
                  </div>
                </div>

                <input id="uploadImage" type="file" accept="image/*" class="time-upload-input" @change="uploadImage">

                <div class="d-flex flex-column align-items-center">
                  <div class="time-upload m-2" @click="selectInput()">
                    <img :src=image class="previewImage p-3" id="previewImage">
                  </div>
                </div>

                <div class="d-flex justify-content-center mt-4">
                  <button class="btn btn-lg time-button__green" type="submit">Enregistrer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./UpdateStory.js" type="text/javascript"></script>
