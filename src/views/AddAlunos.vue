<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <h1>Adicionar Alunos</h1>
        <div class="Form">
            <div class="mb-3 text-start">
                <label class="form-label">Nome:</label>
                <input type="name" name="nome" class="form-control" id="nome" placeholder="Nome">
            </div>

            <div class="mb-3 text-start">
                <label class="form-label">Email:</label>
                <input type="name" name="Email" class="form-control" id="Email" placeholder="Email">
            </div>

            <div class="mb-3 text-start">
                <label class="form-label">Senha:</label>
                <input type="name" name="Senha" class="form-control" id="Senha" placeholder="Senha">
            </div>

            <div class="mb-3 text-start">
                <label class="form-label">RA:</label>
                <input type="name" name="RA" class="form-control" id="RA" placeholder="RA">
            </div>
        </div>
        <AddButton
        href="/Alunos"
        ButtonText="Adicionar Aluno"
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
