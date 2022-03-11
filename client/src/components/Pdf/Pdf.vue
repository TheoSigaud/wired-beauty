<template>
  <div>
    <input v-model="namePdf" type="text">
    <button v-on:click="exportPdf" type="button" name="button">Exporter</button>
  </div>
</template>

<script src="./Pdf.js" type="text/javascript"></script>
