<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <Breadcrumb :items="breadcrumbItems" />

        <div class="grid-cont">
          <div class="iten"><h1>Criação do Pré-Projeto</h1></div>
          <div class="iten">
            <div class="side_tarefa_info">
              <h2>Entrega: 19/06 às 23:59</h2>
              <h2>Nota: 100</h2>
            </div>

          </div>
        </div>
        <h2>Olá, queridos alunos, espero que estejam todos bem!<br />
            Nesta tarefa, vocês deverão realizar a entrega da primeira parte do trabalho desenvolvido: o pré-projeto.<br />
            Qualquer dúvida tiraremos na aula. Até mais!
        </h2>
        <div class="arquives_text">
           <h2>ARQUIVOS DA TAREFA</h2>
        </div>
        <AttArquive/>
        <div class="arquives_text">
           <h2>Adcionar Arquivos</h2>
        </div>
        <div class="throwDown ">
        <AddButton
        href="/AddTarefas"
        ButtonText="Enviar Tarefa"
        ></AddButton>
      </div>
      </main>
    </div>

    </article>
  <TheFooter></TheFooter>
</template>

<script>
import TheNavbar from '../components/TheNavbar.vue'
import TheFooter from '../components/TheFooter.vue'
import SideBar from '../components/SideBar.vue'
import AddButton from '../components/AddButton.vue'
import AttArquive from '../components/AttArquive.vue'
import Breadcrumb from "@/components/Breadcrumb.vue"

export default {
  name: 'Turmas',
  components: {
    TheNavbar,
    TheFooter,
    SideBar,
    AddButton,
    AttArquive,
    Breadcrumb,
  },

  data() {
    return {
      breadcrumbItems: [
        { label: "Home", href: "/" },
        { label: "Listar Tarefas", href: "/tarefas" },
        { label: "Ver Tarefa", href: "/tarefas" },
      ],
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

.grid-cont{
  display: grid;
  width: 100%;
  grid-template-columns: 75% 25%; /* Duas colunas, cada uma com 100px */
}

.side_tarefa_info{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.iten h2{
  font-size: 2wrem;
  text-align: justify;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.arquives_text h2{
  color: #666;
  font-size: 1.7rem;
  text-align: justify;
  font-weight: lighter;
  margin-top:  2rem;
}



.action-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3rem;
    margin-bottom: 4rem;
}
</style>
