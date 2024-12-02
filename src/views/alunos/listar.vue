<template>
  <TheNavbar />
  <article>
    <div class="layout">
      <SideBar />
      <main class="content">

        <Breadcrumb :items="breadcrumbItems" />

        <Message />

        <h1>Alunos</h1>
        <SearchBar @key-up="onKeyup" />
        
        <div class="users-list" v-if="!isLoadingDatas">
          <List1 
            v-for="student in filteredStudents" 
            :key="student.id" 
            :text1="student.name" 
            :subtext="student.email" 
            :tipo="'RA: '" 
            :text2="student.code"
            :link="student.link"
          />
        </div>
        
        <div v-else>
          <SpinnerScreen/>
        </div>

        <div class="div-buttons">
          <AddButton
            href="/AddAlunos"
            ButtonText="Adicionar Alunos"
          />
          <AddButton
            href="/AddAlunosArquivo"
            ButtonText="Adicionar Por Arquivo"
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
import { getToken } from '../../utils/auth'
import Breadcrumb from "@/components/Breadcrumb.vue"
import SpinnerScreen from '@/components/SpinnerScreen.vue'
import { ref } from 'vue'

export default {
  name: 'Turmas',
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
        { label: "Listar Alunos", href: "/alunos" },
      ],

      allStudents: [{
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
    filteredStudents() {
      // Filtra estudantes com base no termo de busca
      return this.allStudents.filter(student => {
        student.link = `/Alunos/editar/${student.id}`
        return (
          student.name.toLowerCase().includes(this.searchTerm) || 
          student.email?.toLowerCase().includes(this.searchTerm) ||
          student.code.toLowerCase().includes(this.searchTerm)
        );
      });
    }
  },

  methods: {
    async fetchStudents() {
      const token = getToken();
      
      this.allStudents = [];
      try {
        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/students`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error); // Tratamento de erro
        }
        this.allStudents = data; // Define todos os estudantes
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

  setup(){
    const isLoadingDatas = ref(true)

    return{
      isLoadingDatas
    }
  },

  mounted() {
    this.fetchStudents(); // Busca estudantes ao montar o componente
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
