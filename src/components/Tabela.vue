<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <h1>Cadastro de Pessoas</h1>
    <b-table :items="pessoas" striped hover :fields="fields"></b-table>
    <b-button variant="primary" @click="showModal">Cadastrar Pessoa</b-button>
    <b-modal v-model="showCadastroModal" title="Cadastro de Pessoa">
      <Cadastro />
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import { BTable, BButton, BModal } from 'bootstrap-vue';
import Cadastro from './Cadastro.vue';

export default {
  components: {BTable, BButton, BModal, Cadastro},
  data() {
    return {
      pessoas: [],
      fields: [
        { key: 'nome', label: 'Nome' },
        { key: 'email', label: 'E-mail' },
        { key: 'telefone', label: 'Telefone' },
        { key: 'data_nascimento', label: 'Data de Nascimento' },
        { key: 'sexo', label: 'Sexo' },
        { key: 'cidade', label: 'Cidade' },
        { key: 'uf', label: 'UF' },
      ],
      showCadastroModal: false,
    };
  },
  mounted() {
    this.carregarPessoas()
  },
  methods: {
    carregarPessoas(){
      axios.get('http://localhost:8000/api/pessoas')
      .then(response => {
        this.pessoas = response.data.pessoas;
      })
      .catch(error => {
        console.log(error);
      })
    },
    showModal() {
      this.showCadastroModal = true;
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
}

table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
  margin: auto;
}

th,
td {
  text-align: left;
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  color: black;
}
</style>