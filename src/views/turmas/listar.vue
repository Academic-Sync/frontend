<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <Breadcrumb :items="breadcrumbItems" />

        <h1>Turmas</h1>
        <SearchBar  @key-up="onKeyup"></SearchBar>

        <div class="users-list">
          <List1 
            :key="turma.id" 
            v-for="turma in filteredData" 
            :text1="turma.course.name"  
            :subtext="turma.period" 
            :tipo="turma.textSemestre" 
            :link="turma.link"
            :text2="turma.semester" >
          </List1>
        </div>

        <AddButton
        href="/AddTurmas"
        ButtonText="Adicionar Turmas"
        ></AddButton>
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
import { getToken } from '@/utils/auth'
import Breadcrumb from "@/components/Breadcrumb.vue"

export default {
  name: 'Turmas',
  components: {
    TheNavbar,
    TheFooter,
    SideBar,
    SearchBar,
    List1,
    AddButton,
    Breadcrumb
  },

  data() {
    return {
      breadcrumbItems: [
        { label: "Home", href: "/" },
        { label: "Listar Turmas", href: "/turmas" },
      ],

      turmas: [{
        id: 0,
        semester: 0,
        course: {
          name: '',
          period: '',
          is_annual: true
        },
        period: "",
        textSemestre: "" // semestre ou ano
      }],
      searchTerm: "",
    }
  },

  computed: {
    filteredData() {
      // Filtra estudantes com base no termo de busca
      
      return this.turmas.filter(turma => {
        turma.link = `/Turmas/editar/${turma.id}`
        turma.period = `Periodo: ${turma.course.period}`
        turma.textSemestre = turma.course.is_annual ? "Ano: " : "Semestre: "
        return (
          turma.period.toString().toLowerCase().includes(this.searchTerm) || 
          turma?.course?.name.toLowerCase().includes(this.searchTerm) || 
          turma?.semester?.toString().toLowerCase().includes(this.searchTerm) || 
          turma?.textSemestre?.toLowerCase().includes(this.searchTerm)
        );
      });
    }
  },

  methods: {
    async fetchData() {
      this.turmas = [];
      const token = getToken();

      try {
        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/classes`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json(); // Define todos os estudantes
        

        if (!response.ok) {
          throw new Error(data.error); // Tratamento de erro
        }

        this.turmas = data;
      } catch (error) {
        const errorObject = {
          title: "Erro ao listar: ",
          text: error.message
        };
        eventBus.emit("error", errorObject);
      }
    },

    onKeyup(event) {
      // Atualiza o termo de busca ao pressionar uma tecla
      this.searchTerm = event.target.value.toLowerCase();
    }
  },

  mounted() {
    this.fetchData(); // Busca estudantes ao montar o componente
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
