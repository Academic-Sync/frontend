<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <h1>Tarefas</h1>
        <SearchBar></SearchBar>
        <Tarefa
        :image="require('../assets/Relatorio.png')" 
        alt_img="atividade imagem" 
        Nome="Criação do Pré-Projeto" 
        Entrega="Entrega: 19/06 às 23:59"
        Nota="Pontos: 100:"
        link="/AddTarefas"
        
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
import TheNavbar from '../components/TheNavbar.vue'
import TheFooter from '../components/TheFooter.vue'
import SideBar from '../components/SideBar.vue'
import SearchBar from '../components/SearchBar.vue'
import AddButton from '../components/AddButton.vue'
import Tarefa from '../components/Tarefa.vue'

export default {
  name: 'Turmas',
  components: {
    TheNavbar,
    TheFooter,
    SideBar,
    SearchBar,
    AddButton,
    Tarefa,
  },
  data(){
    return {
      permissaoAdd: false
    }
  },
  mounted() {
    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    this.permissaoAdd = parsedUser.user_type == 'teacher';
  }
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
