<template>
  <div class="align-items-center justify-content-center">
    <button class="btn btn-primary shadow-sm ml-5 mb-2" v-on:click="exportPdf" type="button" name="button"><i class="fas fa-download fa-sm text-white-50"></i>  Export </button>
    <input v-model="namePdf" type="text" class="form-control">
  </div>
</template>

<script src="./Pdf.js" type="text/javascript"></script>
