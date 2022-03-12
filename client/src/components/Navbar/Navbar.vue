<template>
  <div>
    <ul class="nav flex-column" style="background-color: #212a2c; width: 300px; height: 100vh; position: fixed">
      <a
        class="sidebar-brand d-flex align-items-center justify-content-center"
        href="/dashboard"
      >
        <div class="mx-5 px-5">
          <img
            src="../../assets/logoWhite.png"
            width="110"
            height="110"
            alt="Wired Beauty"
          />
        </div>
      </a>

      <hr class="sidebar-divider" />

      <div class="sidebar-heading" v-if="admin">&nbsp;&nbsp;&nbsp;Our clients</div>

      <li class="nav-item" v-if="admin">
        <router-link v-bind:to="{ name: 'Users' }" class="nav-link" style="color: #646a6c">
          <i class="fa-solid fa-users" style="color: #646a6c"></i>
          <span style="color: #d3d4d5">Clients</span>
        </router-link>
      </li>

      <hr class="sidebar-divider" v-if="admin"/>

      <div class="sidebar-heading" v-if="admin">&nbsp;&nbsp;&nbsp;Our data</div>

      <li class="nav-item" v-if="admin">
        <router-link v-bind:to="{ name: 'Pdf' }" class="nav-link">
          <i class="fa-solid fa-file" style="color: #646a6c"></i>
          <span style="color: #d3d4d5">&nbsp;Reports</span>
        </router-link>
      </li>
      <hr class="sidebar-divider d-none d-md-block" v-if="admin"/>
      <li class="nav-item" style="color: #646a6c">
        <a href="" @click="logOut()" class="nav-link" style="color: #d3d4d5">
          <i class="fa-solid fa-right-from-bracket" style="color: #646a6c"></i>
          <span>Déconnexion</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script src="./Navbar.js" type="text/javascript"></script>
