<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <b-modal id="cadastro-modal" ref="cadastroModal" title="Cadastro de Pessoa">
        <form @submit.prevent="cadastrarPessoa">
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input type="text" class="form-control" id="nome" v-model="pessoa.nome" required>
          </div>
          <div class="form-group">
            <label for="email">E-mail:</label>
            <input type="email" class="form-control" id="email" v-model="pessoa.email" required>
          </div>
          <div class="form-group">
            <label for="telefone">Telefone:</label>
            <input type="text" class="form-control" id="telefone" v-model="pessoa.telefone" required>
          </div>
          <div class="form-group">
            <label for="data_nascimento">Data de Nascimento:</label>
            <input type="date" class="form-control" id="data_nascimento" v-model="pessoa.data_nascimento" required>
          </div>
          <div class="form-group">
            <label for="sexo">Sexo:</label>
            <select class="form-control" id="sexo" v-model="pessoa.sexo" required>
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </div>
          <div class="form-group">
            <label for="cidade">Cidade:</label>
            <input type="text" class="form-control" id="cidade" v-model="pessoa.cidade" required>
          </div>
          <div class="form-group">
            <label for="uf">UF:</label>
            <input type="text" class="form-control" id="uf" v-model="pessoa.uf" required>
          </div>
          <button type="submit" class="btn btn-primary">Salvar</button>
        </form>
      </b-modal>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { BModal } from 'bootstrap-vue';
  
  export default {
    components: { BModal },
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    data() {
      return {
        pessoa: {
          nome: '',
          email: '',
          telefone: '',
          data_nascimento: '',
          sexo: '',
          cidade: '',
          uf: ''
        }
      };
    },
    methods: {
      cadastrarPessoa() {
        axios.post('http://localhost:8000/api/pessoas', this.pessoa)
          .then(response => {
            // this.$emit('pessoaCadastrada', response.data.pessoa);
            this.$emit('pessoaCadastrada', [response.data.pessoa]);
            this.$refs.cadastroModal.hide();
            this.pessoa = {
              nome: '',
              email: '',
              telefone: '',
              data_nascimento: '',
              sexo: '',
              cidade: '',
              uf: ''
            };
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  