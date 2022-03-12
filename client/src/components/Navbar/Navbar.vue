<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion shadow"
    id="accordionSidebar"
  >
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

    <div class="sidebar-heading">Our clients</div>

    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#" 
      >
        <i class="fa-solid fa-users"></i>
        <span>Clients</span>
      </a> 
    </li> 

    <hr class="sidebar-divider" />

    <div class="sidebar-heading">Our data</div>

    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
      >
        <i class="fa-solid fa-file"></i>
        <span>Reports</span>
      </a>
    </li> 
    <hr class="sidebar-divider d-none d-md-block" />
  </ul>
</template>

<script src="./Navbar.js" type="text/javascript"></script>
