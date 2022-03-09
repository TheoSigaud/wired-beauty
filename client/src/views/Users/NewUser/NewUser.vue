<template>
  <div>
    <router-view/>

    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-6">
          <div class="card time-card time-form">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center">

                <p>Création du client</p>

                <form v-on:submit.prevent="checkForm">
                  <div class="form-floating mb-4">
                    <input type="email" class="form-control" placeholder="Email" v-model="email">
                    <label>Email</label>
                    <div class="container-error">
                      <small>{{ errors.email }}</small>
                      <small>{{ errors.register }}</small>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center">
                    <button class="btn btn-lg time-button__green" type="submit" :disabled="isDisabled">Création
                    </button>
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

<script src="./NewUser.js" type="text/javascript"></script>
