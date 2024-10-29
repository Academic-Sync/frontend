<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <h1>Adicionar Alunos</h1>
        <div class="Form" >
            <div class="mb-3 text-start">
                <label class="form-label">Nome:</label>
                <input v-model="student.name" type="name" name="nome" class="form-control" id="nome" placeholder="Nome">
            </div>

            <div class="mb-3 text-start">
                <label class="form-label">Email:</label>
                <input v-model="student.email" type="name" name="Email" class="form-control" id="Email" placeholder="Email">
            </div>

            <div v-if="!student" class="mb-3 text-start">
                <label class="form-label">Senha:</label>
                <input type="name" name="Senha" class="form-control" id="Senha" placeholder="Senha">
            </div>

            <div class="mb-3 text-start">
                <label class="form-label">RA:</label>
                <input v-model="student.code" type="name" name="RA" class="form-control" id="RA" placeholder="RA">
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
import TheNavbar from '../../components/TheNavbar.vue'
import TheFooter from '../../components/TheFooter.vue'
import SideBar from '../../components/SideBar.vue'
import AddButton from '../../components/AddButton.vue'
import { useRoute } from 'vue-router'
import eventBus from '../../eventBus'
import { ref, onMounted } from 'vue'

export default {
  name: 'Turmas',
  components: {
    TheNavbar,
    TheFooter,
    SideBar,
    AddButton,
  },

  setup() {
    const route = useRoute() // Obtemos a rota atual
    const student = ref({})

    const fetchAluno = async (id) => {
      try {
        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/students/${id}`)

        if (!response.ok)
          throw new Error('Erro ao buscar estudantes')

        const aluno = await response.json()
        
        if (!aluno)
          throw new Error('Erro ao buscar estudantes')

        student.value = aluno

      } catch (error) {
        const errorObject = {
          title: "Erro ao listar: ",
          text: error.message
        }
        eventBus.emit("error", errorObject)
      }
    }

    onMounted(() => {
      if (route.params.id) {
        fetchAluno(route.params.id)
      }
    })

    return {
      student
    }
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

.action-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3rem;
    margin-bottom: 4rem;
}

.Form{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    background-color: var(--Branco);
    border-radius: 1rem;    
    padding: 2rem;
    font-size: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

}
.Form label{
    font-size: 2rem;
    
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
</style>
