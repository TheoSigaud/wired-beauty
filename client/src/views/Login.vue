<template>
  <div>
    <div class="container">
      <div class="d-flex justify-content-center">
        <h1 class="mb-5 mt-5">TIME STORIES</h1>
      </div>

      <div class="row d-flex justify-content-center">
        <div class="col-6">
          <div class="card time-card time-form">
            <div class="card-body">

              <div v-if="!isResetPassword">
                <form v-on:submit.prevent="checkForm">
                  <div class="d-flex justify-content-center mt-4">
                    <div class="form-floating mb-4">
                      <input type="text" class="form-control" placeholder="Email" v-model="email">
                      <label>Email</label>
                      <div class="container-error">
                        <small v-if="errors.email">{{ errors.email }}</small>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center">
                    <div class="form-floating mb-4">
                      <input type="password" class="form-control" placeholder="Mot de passe" v-model="password">
                      <label>Mot de passe</label>
                      <div class="container-error">
                        <small v-if="errors.password">{{ errors.password }}</small>
                        <small v-if="errors.login">{{ errors.login }}</small>
                        <small v-if="errors.emailVerified">{{ errors.emailVerified }}</small>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center">
                    <button class="btn btn-lg time-button__green" type="submit">Se connecter</button>
                  </div>
                </form>

                <div class="row mt-5">
                  <div class="d-flex justify-content-between">
                    <router-link v-bind:to="{ name: 'Register' }" class="link">Pas de compte</router-link>
                    <a @click="isResetPassword = !isResetPassword;
                                errors.email = null;
                                errors.login = null;
                                errors.emailVerified = null;
                                errors.password = null;"
                       class="link">Mot de passe oublié</a>
                  </div>
                </div>
              </div>

              <div v-else>
                <button @click="isResetPassword = !isResetPassword; errors.email = null;" class="btn time-button__green mb-5">
                  <i class="fas fa-arrow-left"></i> Se connecter
                </button>

                <div class="d-flex flex-column align-items-center">
                  <p>Réinitialisation du mot de passe</p>

                  <form v-on:submit.prevent="resetPassword">
                    <div class="form-floating mb-4">
                      <input type="text" class="form-control" placeholder="Email" v-model="emailReset">
                      <label>Email</label>
                      <div class="container-error">
                        <small>{{ errors.email }}</small>
                      </div>
                    </div>

                    <div class="d-flex justify-content-center">
                      <button class="btn btn-lg time-button__green" type="submit">Réinitialiser</button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script src="./Login.js" type="text/javascript"></script>
