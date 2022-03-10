<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg time-navbar">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <router-link v-bind:to="{ name: 'Dashboard' }" v-if="admin">
              <li class="nav-item">Dashboard</li>
            </router-link>

            <router-link v-bind:to="{ name: 'Users' }" v-if="admin">
              <li class="nav-item">Clients</li>
            </router-link>
          </ul>
          <ul class="navbar-nav">
            <a href="" @click="logOut()">
              <li class="nav-item">Déconnexion</li>
            </a>

          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script src="./Navbar.js" type="text/javascript"></script>
