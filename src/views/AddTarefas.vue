<template>
  <TheNavbar></TheNavbar>
  <article>
    <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <h1>Adicionar Tarefa</h1>
        <div class="Form">
            <div class="mb-3 text-start">
                <label for="name" class="form-label">Nome da Tarefa:</label>
                <input type="name" name="name" class="form-control" id="name" placeholder="Nome da Tarefa">
            </div>

            <div class="mb-3 text-start">
                <label for="description" class="form-label">Descrição:</label>
                <textarea name="description" class="form-control" id="description" placeholder="Descrição"></textarea>
            </div>

            <div class="mb-3 text-start form-group">
              <div class="form-field">
                <label for="data">Data</label>
                <input type="date" id="data" placeholder="00/00" class="form-control">
              </div>
              <div class="form-field">
                <label for="hora">Hora</label>
                <input type="time" id="hora" placeholder="00:00" class="form-control">
              </div>
            </div>

            <div class="mb-3 text-start">
                <label for="nota" class="form-label">Nota Maxima:</label>
                <input type="number" name="nota" class="form-control" id="nota" placeholder="Nota">
            </div>
            <label for="actual-btn">Arquivo</label>
            <Dropdown/>
        </div>
        <AddButton
        href="/Tarefas"
        ButtonText="Adicionar Tarefa"
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
import Dropdown from '../components/Dropdown.vue'

export default {
  name: 'Turmas',
  components: {
    TheNavbar,
    TheFooter,
    SideBar,
    AddButton,
    Dropdown,
  }
}
</script>

<style>

</style>
