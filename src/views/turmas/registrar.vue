<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <Message />

        <h1>Adicionar Turmas</h1>
       <form @submit="handleSubmit">
        <div class="Form">
          <input v-model="id" type="hidden" name="id" id="id">
              <div class="mb-3 text-start">
                  <label class="form-label">Professor:</label>
                  <select v-model="turma.teacher_id" name="teacher_id" id="teacher_id">
                    <option value="0">Selecione o Professor</option>
                    <option class="form-control" v-for="professor in professores" :key="professor.id" :value="professor.id">{{ professor.name }}</option>
                  </select>
              </div>

              <div class="mb-3 text-start">
                  <label class="form-label">Curso:</label>
                  <select @change="onSelectCurso" v-model="turma.course_id" name="course_id" id="course_id">
                    <option value="0">Selecione o Curso</option>
                    <option class="form-control" v-for="curso in cursos" :key="curso.id" :value="curso.id">{{ curso.name }}</option>
                  </select>
              </div>

              <div class="mb-3 text-start">
                  <label class="form-label">{{ textSemestre }}</label>
                  <input v-model="turma.semester" type="number" name="semester" class="form-control" id="semester" placeholder="1">
              </div>
          </div>
        
          <div class="div-buttons">
            <RemoveButton v-if="turma.semester" @click="handleDelete" type="button" ButtonText="Apagar Turma" />
            <AddButton ButtonText="Adicionar Turma" ></AddButton>
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
    Message,
    RemoveButton
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

      console.log(data);
      

      if(!data.teacher_id || !data.course_id || !data.semester){
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
            window.location.href = `/Turmas/editar/${result.class.id}`
          }, 1000);

      } catch (error) {
          console.error(error);
          const errorObject = {
            title: "Erro ao cadastrar: ",
            text: error.message
          }
          eventBus.emit("error", errorObject)
      }
    },

    onSelectCurso(){
      const selectedCurso = this.cursos.find(curso => curso.id === this.turma.course_id);
      if (selectedCurso) {
        this.textSemestre = selectedCurso.is_annual ? "Ano: " : "Semestre: ";
      }
    }
  },

  setup() {
    const route = useRoute()
    const turma = ref({
      teacher_id: 0,
      course_id: 0,
      semester: ""
    })
    const professores = ref([{}])
    const cursos = ref([{}])
    const titleText = ref("Adicionar Turma")
    const id = ref(0)
    const textSemestre = ref("")
    const disabled = ref(false)

    const fetchData = async (turmaId) => {
      /* eslint-disable */
        try {
          const [response, responseProfessor, responseCurso] = await Promise.all([
            fetch(`${process.env.VUE_APP_API_URL}/classes/${turmaId}`),
            fetch(`${process.env.VUE_APP_API_URL}/teachers`),
            fetch(`${process.env.VUE_APP_API_URL}/courses`)
          ]);

          const turmaData = await response.json();
          const professoresData = await responseProfessor.json();
          const cursosData = await responseCurso.json();

          // Verificando se todas as respostas foram bem-sucedidas
          if (!response.ok) throw new Error(turmaData.error);
          if (!responseProfessor.ok) throw new Error(professoresData.error);
          if (!responseCurso.ok) throw new Error(cursosData.error);

          if(turmaId != 0)
            turma.value =  turmaData;

          professores.value = professoresData;
          cursos.value = cursosData;

          if (!turmaData && turmaId)
            throw new Error("Turma não encontrada");

          id.value = turmaId;
          titleText.value = 'Salvar Turma';


          // verifica se é anual ou semestral
          const selectedCurso = cursos.value.find(curso => curso.id === turma.value.course_id);
          if (selectedCurso) {
            textSemestre.value = selectedCurso.is_annual ? "Ano: " : "Semestre: ";
          }

        } catch (error) {
          disabled.value = true;
          console.error("Erro ao buscar dados:", error); // Log do erro
          const errorObject = {
            title: "Erro ao listar: ",
            text: error.message
          };
          eventBus.emit("error", errorObject);
        }
    };

    onMounted(() => {
      id.value = 0;
      if (route.params.id) {
        id.value = route.params.id;
      }
      fetchData(id.value)
    })

    return {
      turma, titleText, id, disabled, professores, cursos, textSemestre
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
