<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <Message />

        <h1>{{titleText}}</h1>
        <form @submit="handleSubmit">
          <div class="Form">
            <input v-model="id" type="hidden" name="id" id="id">

              <div class="mb-3 text-start">
                  <label class="form-label">Coordenador:</label>
                  <input v-model="curso.coordinator_id" type="name" name="coordinator_id" class="form-control" id="coordinator_id" placeholder="Coordenador">
              </div>

              <div class="mb-3 text-start">
                  <label class="form-label">Nome do curso:</label>
                  <input v-model="curso.name" type="name" name="name" class="form-control" id="name" placeholder="Nome do curso">
              </div>

              <div class="mb-3 text-start">
                  <label class="form-label">Periodo:</label>
                  <input v-model="curso.period" type="text" name="period" class="form-control" id="period" placeholder="Manhã/Tarde/Noite">
              </div>

              <div class="mb-3 text-start">
                  <label class="form-label">Tipo de trabalho final:</label>
                  <input v-model="curso.type_work" type="name" name="type_work" class="form-control" id="type_work" placeholder="Tipo de trabalho final">
              </div>

              <label class="form-label">Curso anual ou bimestral:</label>
              <div class="radio-group">
                <label class="radio-option">
                    <input v-model="curso.is_annual" type="radio" name="is_annual" :value="true">
                    Bimestral
                </label>
                <label class="radio-option">
                    <input v-model="curso.is_annual" type="radio" name="is_annual" :value="false">
                    Anual
                </label>
            </div>
          </div>

          <div class="div-buttons">
            <RemoveButton v-if="curso.id" @click="handleDelete" type="button" ButtonText="Apagar Curso" />
            <AddButton :ButtonText="titleText" ></AddButton>
          </div>
        </form>
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
import RemoveButton from '../../components/RemoveButton.vue'
import Message from '../../components/Message.vue'
import eventBus from '../../eventBus'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

export default {
  name: 'Turmas',
  components: {
    TheNavbar,
    TheFooter,
    SideBar,
    AddButton,
    RemoveButton,
    Message
  },

  methods: {
    async handleSubmit(e){
      e.preventDefault();
      const id = document.querySelector("#id")
      if(id.value != 0)
        return await this.update(e);

        await this.create(e);
    },

    async handleDelete(){
      try {
        const studentId = document.querySelector("#id")

        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/courses/${studentId.value}`, {
          method: "DELETE",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error); // Tratamento de erro
        }

        const successObject = {
          title: "",
          text: result.message
        }
        eventBus.emit("success", successObject)

        setTimeout(()=>{
          window.location.href = "/Cursos"
        }, 1000);
      } catch (error) {
          console.error(error);
          const errorObject = {
            title: "Erro ao listar: ",
            text: error.message
          }
          eventBus.emit("error", errorObject)
      }
    },

    validateDate(e){
      const data = Object.fromEntries(new FormData(e.target).entries());

      if(!data.coordinator_id || !data.name || !data.period || !data.type_work || !data.is_annual){
        const errorObject = {
          title: "",
          text: "Informe todos os campos"
        }
        eventBus.emit("error", errorObject)
        return 0;
      }    

      return data;
    },

    async update(e){
      try {
        const data = this.validateDate(e);
        if(!data)
          return;

          // eslint-disable-next-line
          const response = await fetch(`${process.env.VUE_APP_API_URL}/courses/${id.value}`, {
            method: "PUT",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          
          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error); // Tratamento de erro
          }

          const successObject = {
            title: "",
            text: result.message
          }
          eventBus.emit("success", successObject)

      } catch (error) {
          console.error(error);
          const errorObject = {
            title: "Erro ao atualizar: ",
            text: error.message
          }
          eventBus.emit("error", errorObject)
      }
    },

    async create(e){
      try {
          const data = this.validateDate(e);

          if(!data)
            return;

          // eslint-disable-next-line
          const response = await fetch(`${process.env.VUE_APP_API_URL}/courses`, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          
          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error); // Tratamento de erro
          }

          const successObject = {
            title: "",
            text: result.message
          }
          eventBus.emit("success", successObject)

          setTimeout(()=>{
            window.location.href = `/Cursos/editar/${result.course.id}`
          }, 1000);

      } catch (error) {
          console.error(error);
          const errorObject = {
            title: "Erro ao cadastrar: ",
            text: error.message
          }
          eventBus.emit("error", errorObject)
      }
    }
  },

  setup() {
    const route = useRoute()
    const curso = ref({})
    const titleText = ref("Adicionar Curso")
    const id = ref(0)
    const disabled = ref(false)

    const fetchData = async (cursoId) => {
      try {
        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/courses/${cursoId}`)
        const cursoData = await response.json()

        if (!response.ok)
          throw new Error(cursoData.error)

        if (!cursoData)
          throw new Error("Curso não encontrado")

        curso.value = cursoData
        id.value = cursoId
        titleText.value = 'Salvar Curso';

      } catch (error) {
        disabled.value = true
        const errorObject = {
          title: "Erro ao listar: ",
          text: error.message
        }
        eventBus.emit("error", errorObject)
      }
    }

    onMounted(() => {
      if (route.params.id) {
        id.value = route.params.id;
        fetchData(id.value)
      }
    })

    return {
      curso, titleText, id, disabled
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
