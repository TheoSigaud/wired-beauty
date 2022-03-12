<template>
  <div>
    <input v-model="namePdf" type="text">
    <button class="btn btn-primary shadow-sm" v-on:click="exportPdf" type="button" name="button"><i class="fas fa-download fa-sm text-white-50"></i>  Export</button>
  </div>
</template>

<script src="./Pdf.js" type="text/javascript"></script>
