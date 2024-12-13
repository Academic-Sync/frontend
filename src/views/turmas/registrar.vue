<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <Breadcrumb :items="breadcrumbItems" />
        <Message />

        <h1>Adicionar Turmas</h1>
       <form @submit="handleSubmit" v-if="!isLoadingDatas">
        <div class="Form">
          <input v-model="id" type="hidden" name="id" id="id">
              <div class="mb-3 text-start">
                  <label for="teacher_id" class="form-label">Professor:</label>
                  <select v-model="turma.teacher_id" name="teacher_id" id="teacher_id">
                    <option value="0">Selecione o Professor</option>
                    <option v-for="professor in professores" :key="professor.id" :value="professor.id">{{ professor.name }}</option>
                  </select>
              </div>

              <div class="mb-3 text-start">
                  <label for="course_id" class="form-label">Curso:</label>
                  <select v-model="turma.course_id" name="course_id" id="course_id">
                    <option value="0">Selecione o Curso</option>
                    <option v-for="curso in cursos" :key="curso.id" :value="curso.id">{{ curso.name }}</option>
                  </select>
              </div>

              <div class="mb-3 text-start">
                  <label for="semester" class="form-label">{{ textSemestre }}</label>
                  <input v-model="turma.semester" type="number" name="semester" class="form-control" id="semester" placeholder="1">
              </div>
          </div>
        
          <div class="div-buttons">
            <RemoveButton :isLoading="isLoadingDelete" v-if="turma.id" @click="handleDelete" type="button" ButtonText="Apagar Turma" />
            <AddButton :isLoading="isLoadingInsert" ButtonText="Adicionar Turma" ></AddButton>
          </div>
       </form>

       <div v-else>
          <SpinnerScreen/>
        </div>
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
import { getToken } from '@/utils/auth'
import Breadcrumb from "@/components/Breadcrumb.vue"
import SpinnerScreen from '@/components/SpinnerScreen.vue'

export default {
  name: 'Turmas',
  components: {
    TheNavbar,
    TheFooter,
    SideBar,
    AddButton,
    Message,
    RemoveButton,
    Breadcrumb,
    SpinnerScreen
  },

  data(){
    return {
      breadcrumbItems: [
        { label: "Home", href: "/" },
        { label: "Listar Turmas", href: "/turmas" },
        { label: "Adicionar Turmas", href: "/turmas" },
      ],
    }
  },

  methods: {
    async handleSubmit(e){
      this.isLoadingInsert = true

      e.preventDefault();
      const id = document.querySelector("#id")
      if(id.value != 0)
        return await this.update(e);

        await this.create(e);
    },

    async handleDelete(){
      this.isLoadingDelete = true
      try {
        const studentId = document.querySelector("#id")
        const token = getToken(); 

        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/classes/${studentId.value}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`,
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
          this.$router.push("/turmas");
        }, 1000);
      } catch (error) {
          console.error(error);
          const errorObject = {
            title: "Erro ao listar: ",
            text: error.message
          }
          eventBus.emit("error", errorObject)
      } finally{
        this.isLoadingDelete = false
      }
    },

    validateDate(e){
      const data = Object.fromEntries(new FormData(e.target).entries());

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
        const token = getToken(); 

        if(!data)
          return;

          // eslint-disable-next-line
          const response = await fetch(`${process.env.VUE_APP_API_URL}/classes/${id.value}`, {
            method: "PUT",
            headers: {
              'Authorization': `Bearer ${token}`,
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
      } finally{
        this.isLoadingInsert = false
      }
    },

    async create(e){
      try {
          const data = this.validateDate(e);
          const token = getToken(); 

          if(!data)
            return;

          // eslint-disable-next-line
          const response = await fetch(`${process.env.VUE_APP_API_URL}/classes`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`,
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
          this.$router.push(`/turmas/editar/${result.class.id}`);
          }, 1000);

      } catch (error) {
          console.error(error);
          const errorObject = {
            title: "Erro ao cadastrar: ",
            text: error.message
          }
          eventBus.emit("error", errorObject)
      } finally{
        this.isLoadingInsert = false
      }
    },

    onSelectCurso(){
      const selectedCurso = this.cursos.find(curso => curso.id === this.turma.course_id);
      if (selectedCurso) {
        this.textSemestre = selectedCurso.is_annual ? "Ano: " : "Semestre: ";
      }
    },

  },

  setup() {
    const route = useRoute()
    const turma = ref({
      teacher_id: "0",
      course_id: 0,
      semester: ""
    })
    const professores = ref([{}])
    const cursos = ref([{}])
    const titleText = ref("Adicionar Turma")
    const id = ref(0)
    const textSemestre = ref("Semestre")
    const disabled = ref(false)
    const isLoadingDatas = ref(true)
    const isLoadingInsert = ref(false)
    const isLoadingDelete = ref(false)

    const fetchData = async (turmaId) => {
        try {
          // eslint-disable-next-line
          const url = process.env.VUE_APP_API_URL;
          const token = getToken();
          
          const [response, responseProfessor, responseCurso] = await Promise.all([
            fetch(`${url}/classes/${turmaId}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }),
            fetch(`${url}/teachers`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }),
            fetch(`${url}/courses`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            })
          ]);

          const turmaData = await response.json();
          const professoresData = await responseProfessor.json();
          const cursosData = await responseCurso.json();

          // Verificando se todas as respostas foram bem-sucedidas
          if (!response.ok) throw new Error(turmaData.error);
          if (!responseProfessor.ok) throw new Error(professoresData.error);
          if (!responseCurso.ok) throw new Error(cursosData.error);

          if (!turmaData && turmaId)
            throw new Error("Turma não encontrada");

          if(turmaId != 0)
            turma.value =  turmaData;

            
          professores.value = professoresData;
          cursos.value = cursosData;

          // id.value = turmaId;
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
        } finally{
        isLoadingDatas.value = false
      }
    };

    onMounted(() => {
      const routeId = route.params.id ?? 0
      if (routeId) {
        id.value = routeId;
      } else{
        isLoadingDatas.value = false
      }

      fetchData(id.value).then(() => {
        /* eslint-disable */
        // $("#teacher_id").select2();
        // $('#teacher_id').val(turma.value.teacher_id).trigger('change'); // Sincroniza o select2 com o valor inicial
        // // /* eslint-disable */
        // $("#course_id").select2();
        // $('#course_id').val(turma.value.course_id).trigger('change'); // Sincroniza o select2 com o valor inicial
      });
      

      $(document).ready(function() {
        // $("#teacher_id").select2();
        // $("#course_id").select2();
      });
    })

    return {
      turma, titleText, id, disabled, professores, cursos, textSemestre, isLoadingDatas, isLoadingDelete, isLoadingInsert
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

select{
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: start!important;
    border: none!important;
    border-radius: 1rem;
    font-size: 1.7rem;
    padding: 1rem;
    margin-bottom: 2rem;
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
    justify-content: start;
    border: none;
    border-radius: 1rem;
    font-size: 1.7rem;
    padding: 1rem;
    margin-bottom: 2rem;
}
</style>