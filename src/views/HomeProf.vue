<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="container">
        <h1>Bem-vindo(a), {{ name.split(" ")[0] }}</h1>
        <p>O que deseja realizar?</p>
        <div class="action-buttons">
        <TheCard 
          href="/Tarefas"
          alt_image="Tarefas"
          :image="require('../assets/Relatorio.png')" 
          Titulo="Tarefas" 
          text="Adicione e gerencie suas Tarefas" 
        />
        <TheCard 
          href="/Alunos"
          alt_image="Alunos"
          :image="require('../assets/alunos.png')" 
          Titulo="Alunos" 
          text="Gerencie suas os alunos da instituição" 
        />
        <TheCard 
          href="/Turmas"
          alt_image="Turmas"
          :image="require('../assets/aulas.png')" 
          Titulo="Turmas" 
          text="Gerencie suas turmas ou adicione novas" 
        />
        <TheCard 
          href="/Cursos"
          alt_image="Cursos"
          :image="require('../assets/curso.png')" 
          Titulo="Curso" 
          text="Acompanhe o relatório do andamento dos trabalhos" 
        />

      </div>
      </div>
    </article>
  <TheFooter></TheFooter>
</template>

<script>
import TheNavbar from '../components/TheNavbar.vue'
import TheFooter from '../components/TheFooter.vue'
import TheCard from '../components/TheCard.vue'


export default {
  name: 'HomeCoord',
  components: {
    TheNavbar,
    TheFooter,
    TheCard,
  },

  data(){
    return {
      name: ''
    }
  },
  mounted() {
    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    this.name = parsedUser.name || 'Coordenador';
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
