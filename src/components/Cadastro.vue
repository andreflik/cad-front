<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <b-modal id="cadastro-modal" ref="cadastroModal" title="Cadastro de Pessoa">
        <form @submit.prevent="cadastrarPessoa">
          <div class="form-group">
            <label for="nome">Nome:</label>
            <input type="text" class="form-control" id="nome" v-model="nome" required>
          </div>
          <div class="form-group">
            <label for="email">E-mail:</label>
            <input type="email" class="form-control" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="telefone">Telefone:</label>
            <input type="text" class="form-control" id="telefone" v-model="telefone" required>
          </div>
          <div class="form-group">
            <label for="data_nascimento">Data de Nascimento:</label>
            <input type="date" class="form-control" id="data_nascimento" v-model="data_nascimento" required>
          </div>
          <div class="form-group">
            <label for="sexo">Sexo:</label>
            <select class="form-control" id="sexo" v-model="sexo" required>
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
      pessoas: {
        type: Object,
        default: () => ({})
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
        },

      };
    },
    
    methods: {
      watch: {
        pessoas: {
          handler(pessoas) {
            this.nome = pessoas.nome;
            this.email = pessoas.email;
            this.telefone = pessoas.telefone;
            this.data_nascimento = pessoas.data_nascimento;
            this.sexo = pessoas.sexo;
            this.cidade = pessoas.cidade;
            this.uf = pessoas.uf;
          },
          immediate: true
        }
      },
      
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
  