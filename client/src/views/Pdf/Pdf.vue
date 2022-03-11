<template>
  <div>
    <router-view/>

    <h1>Rapports</h1>
    <div class="table-wrap">
      <table id="table" class="row-border hover">
        <thead>
        <tr>
          <th>Nom du rapport</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-bind:key="pdf.id" v-for="pdf in pdfs">
          <td style="color: white">{{ pdf.name }}</td>
          <td>
            <button data-bs-toggle="modal" data-bs-target="#modal" @click="namePdf = pdf.name">Attribuer un client</button>
            <button @click="showReport(pdf.pdf)">Voir</button>
            <button @click="deletePdf(pdf.name)">Supprimer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="modal fade" id="modal" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content time-modal">
          <div class="modal-header time-modal-header">
            <button type="button" class="btn-close time-button-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="table-wrap">
              <table id="tableUsers" class="row-border hover">
                <thead>
                <tr>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-bind:key="user.id" v-for="user in users">
                  <td style="color: white">{{ user.email }}</td>
                  <td>
                    <button data-bs-dismiss="modal" @click="addUser(user.email)">Choisir</button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Pdf.js" type="text/javascript"></script>
