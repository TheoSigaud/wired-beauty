<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-center">
        <h1 class="h3 mt-5 mb-5">TIME STORIES</h1>
      </div>

      <div class="row d-flex justify-content-center">
        <div class="col-6">
          <div class="card time-card time-form">
            <div class="card-body">
              <router-link v-bind:to="{ name: 'Login' }" class="btn time-button__green mb-5"><i class="fas fa-arrow-left"></i>
                Se connecter
              </router-link>
              <div class="d-flex flex-column align-items-center" v-if="!msgMail">

                <p>Création du compte</p>

                <form v-on:submit.prevent="checkForm">
                  <div class="form-floating mb-4">
                    <input type="text" class="form-control" placeholder="Pseudo" v-model="pseudo">
                    <label>Pseudo</label>
                    <div class="container-error">
                      <small>{{ errors.pseudo }}</small>
                    </div>
                  </div>
                  <div class="form-floating mb-4">
                    <input type="email" class="form-control" placeholder="Email" v-model="email">
                    <label>Email</label>
                    <div class="container-error">
                      <small>{{ errors.email }}</small>
                    </div>
                  </div>
                  <div class="form-floating mb-4">
                    <input type="password" class="form-control" placeholder="Mot de passe" v-model="password">
                    <label>Mot de passe</label>
                    <div class="container-error">
                      <small>{{ errors.password }}</small>
                    </div>
                  </div>
                  <div class="form-floating mb-4">
                    <input type="password" class="form-control" placeholder="Confirmation du mot de passe"
                           v-model="confirmPassword">
                    <label>Confirmation du mot de passe</label>
                    <div class="container-error">
                      <small>{{ errors.confirmPassword }}</small>
                      <small>{{ errors.register }}</small>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center">
                    <button class="btn btn-lg time-button__green" type="submit" :disabled="isDisabled">S'inscrire
                    </button>
                  </div>
                </form>
              </div>

              <div v-else>
                <p>Un email vous a été envoyé pour confirmer votre compte</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script src="./Register.js" type="text/javascript"></script>
