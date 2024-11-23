<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <Breadcrumb :items="breadcrumbItems" />

        <Message />

        <h1>Tarefas</h1>
         <SearchBar @key-up="onKeyup" />

        <Tarefa
          v-for="activity in filteredData" 
          :key="activity.id" 
          :image="require('../../assets/Relatorio.png')" 
          alt_img="atividade imagem" 
          :Nome="activity.name" 
          :Entrega="activity.date_formatted"
          :Nota="activity.note"
          :link="activity.link"
        ></Tarefa>

        <AddButton
        v-if="permissaoAdd"
        href="/AddTarefas"
        ButtonText="Adicionar Tarefas"
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
import AddButton from '../../components/AddButton.vue'
import Tarefa from '../../components/Tarefa.vue'
import Message from '../../components/Message.vue'
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
    AddButton,
    Tarefa,
    Message,
    Breadcrumb
  },
  data() {
    return {
      breadcrumbItems: [
        { label: "Home", href: "/" },
        { label: "Listar Tarefas", href: "/tarefas" },
      ],
      allActivities: [{
        id: 0,
        name: "",
        date: "",
        time: ""
      }],
      searchTerm: "",
      permissaoAdd: false
    }
  },

  computed: {
    filteredData() {
      // Filtra activityes com base no termo de busca
      const user = localStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      
      return this.allActivities.filter(activity => {
        activity.link = parsedUser.user_type == 'student' ? "/visualizarTarefas" : `/Tarefas/editar/${activity.id}`;
        activity.note = `Nota Máxima: ${activity.maximum_grade}`

        const date = new Date(activity.date);
        const time = new Date(`1970-01-01T${activity.time}`);
        const dateFormatted = date.toLocaleDateString('pt-BR');
        const timeFormatted = time.toLocaleTimeString('pt-BR');
        activity.date_formatted = `${dateFormatted} - ${timeFormatted}`;
        return (
          activity.name.toLowerCase().includes(this.searchTerm) || 
          activity.date.toLowerCase().includes(this.searchTerm) ||
          activity.time.toLowerCase().includes(this.searchTerm)
        );
      });
    }
  },

  methods: {
    async fetchData() {
      this.allActivities = [];
      const token = getToken();
      
      try {
        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/activities`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json(); // Define todos os professores

        if (!response.ok)
          throw new Error(data.error); // Tratamento de erro

        this.allActivities = data;
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
    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    this.permissaoAdd = parsedUser.user_type == 'teacher';
    this.fetchData(); // Busca professores ao montar o componente
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
