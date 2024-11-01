<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <h1>Adicionar Turmas</h1>
        <div class="Form">
            <div class="mb-3 text-start">
                <label class="form-label">Código do professor:</label>
                <input type="name" name="Coordenador" class="form-control" id="Coordenador" placeholder="Coordenador">
            </div>

            <div class="mb-3 text-start">
                <label class="form-label">Código do curso:</label>
                <input type="name" name="Nome do curso" class="form-control" id="Nome do curso" placeholder="Nome do curso">
            </div>

            <div class="mb-3 text-start">
                <label class="form-label">Semestre:</label>
                <input type="name" name="Periodo" class="form-control" id="Periodo" placeholder="Periodo">
            </div>
        </div>
        <AddButton
        href="/Turmas"
        ButtonText="Adicionar Turma"
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

</style>
