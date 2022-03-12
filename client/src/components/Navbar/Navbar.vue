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
        data-toggle="collapse"
        data-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="fa-solid fa-users"></i>
        <span>Clients</span>
      </a>
      <div
        id="collapseTwo"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Types</h6>
          <a class="collapse-item" href="buttons.html">Laboratory</a>
          <a class="collapse-item" href="cards.html">Contact</a>
        </div>
      </div>
    </li>

    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseUtilities"
        aria-expanded="true"
        aria-controls="collapseUtilities"
      >
        <i class="fa-solid fa-handshake"></i>
        <span>Communication</span>
      </a>
      <div
        id="collapseUtilities"
        class="collapse"
        aria-labelledby="headingUtilities"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header"></h6>
          <a class="collapse-item" href="utilities-color.html">Emailing</a>
          <a class="collapse-item" href="utilities-border.html">Scrapping</a>
        </div>
      </div>
    </li>

    <hr class="sidebar-divider" />

    <div class="sidebar-heading">Our data</div>

    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapsePages"
        aria-expanded="true"
        aria-controls="collapsePages"
      >
        <i class="fa-solid fa-file"></i>
        <span>Reports</span>
      </a>
      <div
        id="collapsePages"
        class="collapse"
        aria-labelledby="headingPages"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <a class="collapse-item" href="#">By Date</a>
          <a class="collapse-item" href="# ">By Client</a>
        </div>
      </div>
    </li>

    <li class="nav-item">
      <a class="nav-link" href="charts.html">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>Global Data</span></a
      >
    </li>
    <hr class="sidebar-divider d-none d-md-block" />
  </ul>
</template>

<script src="./Navbar.js" type="text/javascript"></script>
