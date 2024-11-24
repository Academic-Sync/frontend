<template>
  <TheNavbar />
  <article>
    <div class="layout">
      <SideBar />
      <main class="content">
        <Breadcrumb :items="breadcrumbItems" />

        <Message />
        <h1>Coordenadores</h1>
        <SearchBar @key-up="onKeyup" />
        
        <div class="users-list" v-if="!isLoadingDatas">
          <List1 
            v-for="orienador in filteredData" 
            :key="orienador.id" 
            :text1="orienador.name" 
            :subtext="orienador.email" 
            :tipo="'Código: '" 
            :text2="orienador.code"
            :link="orienador.link"
          />
        </div>

        <div v-else>
          <SpinnerScreen/>
        </div>

        <div class="div-buttons">
          <AddButton
            href="/AddCoordenadores"
            ButtonText="Adicionar Coordenadores"
          />
        </div>
      </main>
    </div>
  </article>
  <TheFooter />
</template>

<script>
import TheNavbar from '../../components/TheNavbar.vue'
import TheFooter from '../../components/TheFooter.vue'
import SideBar from '../../components/SideBar.vue'
import SearchBar from '../../components/SearchBar.vue'
import List1 from '../../components/List1.vue'
import AddButton from '../../components/AddButton.vue'
import Message from '../../components/Message.vue'
import eventBus from '../../eventBus'
import { getToken } from '@/utils/auth'
import Breadcrumb from "@/components/Breadcrumb.vue"
import SpinnerScreen from '@/components/SpinnerScreen.vue'
import { ref } from 'vue'

export default {
  name: 'Coordenadores',
  components: {
    TheNavbar,
    TheFooter,
    SideBar,
    SearchBar,
    List1,
    AddButton,
    Message,
    Breadcrumb,
    SpinnerScreen
  },

  data() {
    return {
      breadcrumbItems: [
        { label: "Home", href: "/" },
        { label: "Listar Coordenadores", href: "/coordenadores" },
      ],

      allCoordenadores: [{
        id: 0,
        code: "",
        name: "",
        email: "",
        link: ""
      }],
      searchTerm: "",
    }
  },

  computed: {
    filteredData() {
      // Filtra Coordenadores com base no termo de busca
      return this.allCoordenadores.filter(orientador => {
        orientador.link = `/Coordenadores/editar/${orientador.id}`
        return (
          orientador.name.toLowerCase().includes(this.searchTerm) || 
          orientador.email.toLowerCase().includes(this.searchTerm) ||
          orientador.code.toLowerCase().includes(this.searchTerm)
        );
      });
    }
  },

  methods: {
    async fetchData() {
      this.allCoordenadores = [];
      const token = getToken();

      try {
        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/coordinators`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json(); // Define todos os professores

        if (!response.ok)
          throw new Error(data.error); // Tratamento de erro

        this.allCoordenadores = data;
      } catch (error) {
        const errorObject = {
          title: "Erro ao listar: ",
          text: error.message
        };
        eventBus.emit("error", errorObject);
      } finally{
        this.isLoadingDatas = false
      }
    },

    onKeyup(event) {
      // Atualiza o termo de busca ao pressionar uma tecla
      this.searchTerm = event.target.value.toLowerCase();
    }
  },

  mounted() {
    this.fetchData(); // Busca professores ao montar o componente
  },

  setup(){
    const isLoadingDatas = ref(true)

    return{
      isLoadingDatas
    }
  },
}
</script>

<style>
@import '/src/assets/style/cores.css';

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--preto);
}

.container {
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
}

.container h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.container p {
  font-size: 2rem;
  color: #666;
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 4rem;
}
</style>
