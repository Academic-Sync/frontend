<template>
  <TheNavbar></TheNavbar>
  <article>
    <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <h1>Adicionar Tarefa</h1>
        <div class="Form">
            <div class="mb-3 text-start">
                <label class="form-label">Nome da Tarefa:</label>
                <input type="name" name="NameTarefa" class="form-control" id="NameTarefa" placeholder="Nome da Tarefa">
            </div>

            <div class="mb-3 text-start">
                <label class="form-label">Descrição:</label>
                <textarea name="Descricao" class="form-control" id="Descricao" placeholder="Descrição"></textarea>
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
                <label class="form-label">Nota Maxima:</label>
                <input type="Numeber" name="Nota" class="form-control" id="Nota" placeholder="Nota">
            </div>
            <label for="Dropdown">Arquivo</label>
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
