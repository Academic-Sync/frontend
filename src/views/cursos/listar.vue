<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <Breadcrumb :items="breadcrumbItems" />
        <Message />

        <h1>Cursos</h1>
        <SearchBar @key-up="onKeyup"></SearchBar>

        <div class="users-list" v-if="!isLoadingDatas">
          <List1 v-for="curso in filteredData" :key="curso.id"
          :text1="curso.name" 
          :subtext="'Cood: ' + curso?.coordinator?.name"
          :text2="curso.period"
          :link="curso.link"
          ></List1>
        </div>

        <div v-else>
          <SpinnerScreen/>
        </div>

        <div class="div-buttons" v-if="user.user_type == 'coordinator' || user.user_type == 'admin'">
          <AddButton href="/AddCursos" ButtonText="Adicionar Curso" ></AddButton>
        </div>
      </main>
    </div>

    </article>
  <TheFooter></TheFooter>
</template>

<script>
import TheNavbar from '../../components/TheNavbar.vue'
import TheFooter from '../../components/TheFooter.vue'
import SideBar from '../../components/SideBar.vue'
import SearchBar from '../../components/SearchBar.vue'
import List1 from '../../components/List1.vue'
import AddButton from '../../components/AddButton.vue'
import eventBus from '../../eventBus'
import { getToken, getUser } from '@/utils/auth'
import Message from '@/components/Message.vue'
import Breadcrumb from "@/components/Breadcrumb.vue"
import SpinnerScreen from '@/components/SpinnerScreen.vue'
import { ref } from 'vue'

export default {
  name: 'Cursos',
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
        { label: "Listar Cursos", href: "/cursos" },
      ],

      cursos: [{
        id: 0,
        name: "",
        coordinator: {
          name: ''
        },
        period: "",
        type_work: ""
      }],
      searchTerm: "",
      user: ({
        name: '',
        user_type: '',
        id: '',
        token: ''
      })
    }
  },

  computed: {
    filteredData() {
      // Filtra estudantes com base no termo de busca
      return this.cursos.filter(curso => {
        curso.link = `/Cursos/editar/${curso.id}`
        return (
          curso.name.toLowerCase().includes(this.searchTerm) || 
          curso.period.toLowerCase().includes(this.searchTerm) || 
          curso?.coordinator?.name.toLowerCase().includes(this.searchTerm)
        );
      });
    }
  },

  methods: {
    async fetchData() {
      const token = getToken();
      this.cursos = [];

      try {
        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/courses`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error); // Tratamento de erro
        }
        this.cursos = data; // Define todos os estudantes
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
    this.user = getUser();
    console.log(getUser());
    
    this.fetchData(); // Busca estudantes ao montar o componente
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
