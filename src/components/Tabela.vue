<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-v-else -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <h1>Cadastro de Pessoas</h1>
    <div class="btn-toolbar-container">
      <div class="btn-toolbar">
        <b-button  variant="outline-secondary" @click="showModalCadastro">
          <b-icon icon="plus"></b-icon>
          
        </b-button>
      </div>
    </div>
    <div class="btn-toolbar-container">
      <div class="btn-toolbar-2">
        <b-button  variant="outline-secondary" @click="editarPessoa(data.item.id)" class="editar">
          
          <b-icon icon="pencil"></b-icon>
        </b-button>
        <b-button variant="outline-secondary"  @click="excluirPessoa(data.item.id)" class="excluir">
          
          <b-icon icon="trash"></b-icon>
        </b-button>
      </div>
    </div>
    <b-table ref="tabela" v-if="pessoas.items.length" :items="pessoas.items" striped hover :fields="fields" >
  <template #table-busy>
    <div class="text-center my-2">
      <b-spinner  label=""></b-spinner>
    </div>
  </template>
</b-table>
<div v-else class="text-center my-2">
  <b-spinner  label=""></b-spinner>
</div>
    <!-- <b-modal v-model="showCadastroModal" title="Cadastro de Pessoa">
      <Cadastro @pessoaCadastrada="atualizarPessoas"/>
    </b-modal> -->
    <b-modal v-model="showCadastroModal" title="Cadastro de Pessoa">
      <Cadastro :pessoas="pessoa" @pessoaCadastrada="atualizarPessoas"/>
    </b-modal>
  </div>
</template>



<script>
import axios from 'axios';
import { BTable, BButton, BModal, BIcon, BSpinner} from 'bootstrap-vue';
import Cadastro from './Cadastro.vue';

export default {
  components: {BTable, BButton, BModal, BIcon, BSpinner, Cadastro},
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
      idSelecionado: null,
      showEditarModal: false,
      pessoa: {},
    };
  },
  mounted() {
    this.carregarPessoas();

    const tabela = this.$refs.tabela;
      tabela.$el.addEventListener('click', (event) => {
      const id = tabela.getRowId(event.target.closest('tr'));
      this.idSelecionado = id;
    })
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
    showModalCadastro() {
      this.showCadastroModal = true;
    },
    atualizarPessoas() {
      this.carregarPessoas();
    },
    editarPessoa(id) {
      this.idSelecionado = id;
      console.log("idSelecionado:", this.idSelecionado);
      this.showEditarModal = true;
    },
    
  },
  watch: {
      idSelecionado(newId) {
        if (newId !== null) {
          this.showEditarModal = true;
        }
      }
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
