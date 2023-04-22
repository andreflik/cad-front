<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <b-modal v-model="showEditarModal" title="Editar Pessoa">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" class="form-control" id="nome" v-model="pessoa.nome">
      </div>
      <div class="form-group">
        <label for="email">E-mail:</label>
        <input type="email" class="form-control" id="email" v-model="pessoa.email">
      </div>
      <div class="form-group">
        <label for="telefone">Telefone:</label>
        <input type="tel" class="form-control" id="telefone" v-model="pessoa.telefone">
      </div>
      <div class="form-group">
        <label for="data_nascimento">Data de Nascimento:</label>
        <input type="date" class="form-control" id="data_nascimento" v-model="pessoa.data_nascimento">
      </div>
      <div class="form-group">
        <label for="sexo">Sexo:</label>
        <select class="form-control" id="sexo" v-model="pessoa.sexo">
          <option value="Feminino">Feminino</option>
          <option value="Masculino">Masculino</option>
        </select>
      </div>
      <div class="form-group">
        <label for="cidade">Cidade:</label>
        <input type="text" class="form-control" id="cidade" v-model="pessoa.cidade">
      </div>
      <div class="form-group">
        <label for="uf">UF:</label>
        <input type="text" class="form-control" id="uf" v-model="pessoa.uf">
      </div>
      <div class="text-right">
        <b-button variant="danger" class="mr-2" @click="fecharModal">Cancelar</b-button>
        <b-button variant="primary" @click="salvarPessoa">Salvar</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    pessoa: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showEditarModal: true
    }
  },
  methods: {
    fecharModal() {
      this.showEditarModal = false;
    },
    editarPessoa(id) {
        axios.get('http://localhost:8000/api/pessoas/' + id)
      .then(response => {
        const pessoa = response.data.pessoa;
        this.$bvModal.show('editar-modal');
        this.$refs.editar.setPessoa(pessoa);
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>
