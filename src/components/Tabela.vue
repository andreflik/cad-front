<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <h1>Cadastro de Pessoas</h1>
    <div class="btn-toolbar-container">
      <div class="btn-toolbar">
        <b-button variant="primary" @click="showModal">
          <b-icon icon="plus"></b-icon>
          Novo
        </b-button>
      </div>
    </div>
    <div class="btn-toolbar-container">
      <div class="btn-toolbar-2">
        <b-button variant="warning"  @click="editarPessoa(data.item.id)" class="editar">
          Editar
          <b-icon icon="pencil"></b-icon>
        </b-button>
        <b-button variant="danger"  @click="excluirPessoa(data.item.id)" class="excluir">
          Excluir
          <b-icon icon="trash"></b-icon>
        </b-button>
      </div>
    </div>
    <b-table :items="pessoas.items" striped hover :fields="fields">
    </b-table>
    
    <b-modal v-model="showCadastroModal" title="Cadastro de Pessoa">
      <Cadastro @pessoaCadastrada="atualizarPessoas"/>
    </b-modal>
  </div>
</template>



<script>
import axios from 'axios';
import { BTable, BButton, BModal, BIcon} from 'bootstrap-vue';
import Cadastro from './Cadastro.vue';

export default {
  components: {BTable, BButton, BModal, BIcon, Cadastro},
  data() {
    return {
      pessoas: { items: [] },
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
        this.pessoas.items = response.data.pessoas;

      })
      .catch(error => {
        console.log(error);
      })
    },
    showModal() {
      this.showCadastroModal = true;
    },
    atualizarPessoas() {
      this.carregarPessoas();
    },
  },
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
  margin-top: 10px;
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

.btn-toolbar {
  margin-right: 50rem;
}

.btn-toolbar-2 {
  margin-left: 10px;
  max-width: 120
}

.float-right {
  text-align: right;
}

.btn-toolbar-container {
  display: inline-block;
}

.btn-toolbar-container:first-child {
  float: left;
}

.btn-toolbar-container:last-child {
  float: right;
}

.editar {
  margin: 0 10px;
}
</style>
