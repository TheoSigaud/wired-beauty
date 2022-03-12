<template>
  <div>
    <div class="container">
      <div class="row d-flex justify-content-center m-5">
        <div class="col-lg-10 m-auto p-3">
          <div
            class="card time-card time-form shadow"
            style="border: none; border-radius: 5px"
          >
            <div class="card-body">
              <div>
                <img
                  class="
                    row
                    center
                    mx-auto
                    align-items-center
                    justify-content-center
                  "
                  src="../assets/WB.png"
                  width="200"
                  height="205"
                  alt="Wired Beauty"
                />
                <h5 class="text-center font-weight-bold" style="color: black">
                  Welcome back
                </h5>
                <form v-on:submit.prevent="checkForm" style="color: grey">
                  <div class="d-flex justify-content-center mt-4">
                    <div class="form-floating mb-1 col-lg-5">
                      <input
                        type="text"
                        class="form-control form-login shadow-inverse"
                        placeholder="Your email adress"
                        v-model="email"
                      />
                      <label
                        style="top: -5px; color: #bec5ce"
                        class="mb-3 ml-3 mt-0"
                        ><i class="fa-solid fa-user mr-2"></i>Your email
                        adress</label
                      >
                      <div class="container-error">
                        <small v-if="errors.email">{{ errors.email }}</small>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center">
                    <div class="form-floating mb-1 col-lg-5 m-4">
                      <input
                        type="password"
                        class="form-control form-login shadow-inverse"
                        placeholder="Mot de passe"
                        v-model="password"
                      />
                      <label
                        style="top: -5px; color: #bec5ce"
                        class="mb-3 ml-3 mt-0"
                        ><i class="fa-solid fa-key mr-2"></i>Password</label
                      >
                      <div class="container-error">
                        <small v-if="errors.password">{{
                          errors.password
                        }}</small>
                        <small v-if="errors.login">{{ errors.login }}</small>
                      </div>
                    </div>
                  </div>

                  <div class="row d-flex justify-content-center m-3">
                    <button
                      style="background-color: #8fdfcc; color: white"
                      class="
                        btn btn-lg
                        time-button__green
                        shadow
                        col-lg-4
                        font-weight-bold
                      "
                      type="submit"
                    >
                      Log in
                    </button>
                  </div>

                  <div class="row d-flex justify-content-center m-3">
                    <p
                      style="color: #bec5ce"
                      class="text-center font-weight-bold"
                    >
                      You have forgot your password ?
                    </p>
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
