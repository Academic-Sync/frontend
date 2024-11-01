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


</style>
