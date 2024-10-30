<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <h1>Adicionar Turmas</h1>
       <form @submit="handleSubmit">
        <div class="Form">
              <div class="mb-3 text-start">
                  <label class="form-label">Código do professor:</label>
                  <input type="name" name="Coordenador" class="form-control" id="Coordenador" placeholder="Coordenador">
              </div>

              <div class="mb-3 text-start">
                  <label class="form-label">Código do turma:</label>
                  <select v-model="turma.coordinator_id" name="course_id" id="course_id">
                    <option v-for="coordenador in coordenadores" :key="coordenador.id" value="coordenador.id">{{ coordenador.name }}</option>
                  </select>
                  <input type="name" name="Nome do turma" class="form-control" id="Nome do turma" placeholder="Nome do turma">
              </div>

              <div class="mb-3 text-start">
                  <label class="form-label">Semestre:</label>
                  <input type="name" name="Periodo" class="form-control" id="Periodo" placeholder="Periodo">
              </div>
          </div>
        
          <div class="div-buttons">
            <AddButton
          href="/Turmas"
          ButtonText="Adicionar Turma"
          ></AddButton>
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
        const response = await fetch(`${process.env.VUE_APP_API_URL}/classes/${studentId.value}`, {
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
          window.location.href = "/Turmas"
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
          const response = await fetch(`${process.env.VUE_APP_API_URL}/classes/${id.value}`, {
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
          const response = await fetch(`${process.env.VUE_APP_API_URL}/classes`, {
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
            window.location.href = `/Turmas/editar/${result.course.id}`
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
    const turma = ref({})
    const professores = ref([{}])
    const coordenadores = ref([{}])
    const titleText = ref("Adicionar Turma")
    const id = ref(0)
    const disabled = ref(false)

    const fetchData = async (turmaId) => {
      console.log("qas");
      
      try {
        // eslint-disable-next-line
        const [response, responseProfessor, responseCoordenador] = await Promise.all([
          // eslint-disable-next-line
          fetch(`${process.env.VUE_APP_API_URL}/classes/${turmaId}`),
          // eslint-disable-next-line
          fetch(`${process.env.VUE_APP_API_URL}/teachers`),
          // eslint-disable-next-line
          fetch(`${process.env.VUE_APP_API_URL}/coordinators`)
        ]).catch(e=> {throw new Error(e.error)});

        // Obtendo os dados das respostas
        const turmaData = await response.json();
        const professoresData = await responseProfessor.json();
        const coordenadoresData = await responseCoordenador.json();


        // Checando se todas as respostas foram bem-sucedidas
        if (!response.ok) throw new Error(turmaData.error);
        if (!responseProfessor.ok) throw new Error(professoresData.error);
        if (!responseCoordenador.ok) throw new Error(coordenadoresData.error);

        turma.value = turmaData;
        professores.value = professoresData;
        coordenadores.value = coordenadoresData;

        console.log(coordenadores);
        

        if (!turmaData)
          throw new Error("Turma não encontrado")

        turma.value = turmaData
        id.value = turmaId
        titleText.value = 'Salvar Turma';

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
      turma, titleText, id, disabled, coordenadores
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
