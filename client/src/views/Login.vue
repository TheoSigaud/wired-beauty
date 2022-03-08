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

              <div>
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
                      </div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center">
                    <button class="btn btn-lg time-button__green" type="submit">Se connecter</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Login.js" type="text/javascript"></script>
