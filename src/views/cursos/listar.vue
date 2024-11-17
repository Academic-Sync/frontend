<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <h1>Cursos</h1>
        <SearchBar @key-up="onKeyup"></SearchBar>

        <div class="users-list">
          <List1 v-for="curso in filteredData" :key="curso.id"
          :text1="curso.name" 
          :subtext="'Cood: ' + curso?.coordinator?.name"
          :text2="curso.period"
          :link="curso.link"
          ></List1>
        </div>

        <div class="div-buttons">
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

export default {
  name: 'Cursos',
  components: {
    TheNavbar,
    TheFooter,
    SideBar,
    SearchBar,
    List1,
    AddButton,
  },

  data() {
    return {
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
      this.cursos = [];
      try {
        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/courses`);
        if (!response.ok) {
          throw new Error('Erro ao buscar estudantes'); // Tratamento de erro
        }
        this.cursos = await response.json(); // Define todos os estudantes
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
