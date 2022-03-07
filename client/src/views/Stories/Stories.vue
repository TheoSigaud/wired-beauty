<template>
  <div>
    <router-view/>

    <div class="container p-0 mt-5">
      <div class="d-flex justify-content-center">
        <h3>Histoires</h3>
      </div>
      <div class="m-3">
        <router-link v-bind:to="{name: 'NewStory'}">
          <button class="btn btn-primary">Créer une histoire</button>
        </router-link>
      </div>
    </div>

    <div v-if="stories.length > 0" class="container">
      <div class="row d-flex justify-content-start">
        <div class="card time-card time-card-story p-2 m-3" v-bind:key="story.id" v-for="story in stories">
          <img :src=story.image class="card-img-top" alt="image">
          <div class="card-body pb-0">
            <h5 class="card-title text-center">{{ story.name }}</h5>
            <p class="card-text time-card-story__description">{{ story.description }}</p>
            <div class="d-flex justify-content-between">
              <router-link class="btn btn-primary" v-bind:to="{ name: 'UpdateStory', params: { id: story._id } }">
                Modifier
              </router-link>
              <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modal-story" @click="idDeleteStory = story._id">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="text-center">
        <h5>Aucune histoire</h5>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modal-story" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content time-modal">
          <div class="modal-header time-modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Voulez-vous vraiment supprimer cette histoire ?</h5>
            <button type="button" class="btn-close time-button-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer time-modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteStory()">Supprimer</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="./Stories.js" type="text/javascript"></script>
