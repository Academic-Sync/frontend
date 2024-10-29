<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <h1>Adicionar Cursos</h1>
        <div class="Form">
            <div class="mb-3 text-start">
                <label class="form-label">Coordenador:</label>
                <input type="name" name="Coordenador" class="form-control" id="Coordenador" placeholder="Coordenador">
            </div>

            <div class="mb-3 text-start">
                <label class="form-label">Nome do curso:</label>
                <input type="name" name="Nome do curso" class="form-control" id="Nome do curso" placeholder="Nome do curso">
            </div>

            <div class="mb-3 text-start">
                <label class="form-label">Periodo:</label>
                <input type="name" name="Periodo" class="form-control" id="Periodo" placeholder="Periodo">
            </div>

            <div class="mb-3 text-start">
                <label class="form-label">Tipo de trabalho final:</label>
                <input type="name" name="TTF" class="form-control" id="TTF" placeholder="Tipo de trabalho final">
            </div>

            <label class="form-label">Curso anual ou bimestral:</label>
            <div class="radio-group">
    <label class="radio-option">
        <input type="radio" name="period" value="bimestral">
        Bimestral
    </label>
    <label class="radio-option">
        <input type="radio" name="period" value="anual">
        Anual
    </label>
</div>
        </div>
        <AddButton
        href="/Cursos"
        ButtonText="Adicionar Curso"
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
import AddButton from '../components/AddButton.vue'

export default {
  name: 'Turmas',
  components: {
    TheNavbar,
    TheFooter,
    SideBar,
    AddButton,
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
    color: var(--Cinza);
    margin-bottom: 2rem;
}


.Form{
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--Branco);
    border-radius: 1rem;    
    padding: 2rem;
    font-size: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
}
.Form label{
  display: flex;
  font-size: 2rem;
  text-align: left;
}
.Form input{
    width: 100%;
    background-color: var(--Branco2);
    display: flex;
    justify-content: center;
    border: none;
    border-radius: 1rem;
    font-size: 1.7rem;
    padding: 1rem;
    margin-bottom: 2rem;
}

.radio-group {
    display: flex;
    flex-direction: column;
    gap: 1rem; 
    align-items: flex-start;
}

.radio-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.radio-option input[type="radio"] {
    margin: 0;
    accent-color: var(--Azul); 
}
</style>
