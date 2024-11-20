<template>
  <TheNavbar></TheNavbar>
  <article>
    <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <Message />
        
        <h1>{{titleText}}</h1>

        <form @submit="handleSubmit">
          <input v-model="id" type="hidden" name="id" id="id">

          <div class="Form">
              <div class="mb-3 text-start">
                  <label for="name" class="form-label">Nome da Tarefa:</label>
                  <input v-model="activity.name" type="name" name="name" class="form-control" id="name" placeholder="Nome da Tarefa">
              </div>

              <div class="mb-3 text-start">
                  <label for="description" class="form-label">Descrição:</label>
                  <textarea v-model="activity.description" name="description" class="form-control" id="description" placeholder="Descrição"></textarea>
              </div>

              <div class="mb-3 text-start form-group">
                <div class="form-field">
                  <label for="date">Data</label>
                  <input v-model="activity.date" type="date" id="date" name="date" placeholder="00/00" class="form-control">
                </div>
                <div class="form-field">
                  <label for="time">Hora</label>
                  <input v-model="activity.time" type="time" id="time" name="time" placeholder="00:00" class="form-control">
                </div>
              </div>

              <div class="mb-3 text-start">
                  <label for="maximum_grade" class="form-label">Nota Maxima:</label>
                  <input v-model="activity.maximum_grade" type="number" name="maximum_grade" class="form-control" id="maximum_grade" placeholder="Nota">
              </div>

              <label for="actual-btn">Arquivo</label>
              <Dropdown/>
          </div>

          <div class="div-buttons">
            <RemoveButton v-if="activity.id" @click="handleDelete" type="button" ButtonText="Apagar Tarefa" />
            <AddButton :ButtonText="titleText"></AddButton>
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
import Dropdown from '../../components/Dropdown.vue'
import Message from '../../components/Message.vue'
import eventBus from '../../eventBus'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getToken } from '@/utils/auth'

export default {
  name: 'Turmas',
  components: {
    TheNavbar,
    TheFooter,
    RemoveButton,
    SideBar,
    AddButton,
    Dropdown,
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
        const id = document.querySelector("#id")

        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/activities/${id.value}`, {
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
          window.location.href = "/Tarefas"
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

      const user = localStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      data.teacher_id = parsedUser.id

      if(!data.name || !data.description || !data.date || !data.time || !data.maximum_grade){
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
          const response = await fetch(`${process.env.VUE_APP_API_URL}/activities/${id.value}`, {
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
      }
    },

    async create(e){
      try {
          const data = this.validateDate(e);
          const token = getToken();

          if(!data)
            return;

          // eslint-disable-next-line
          const response = await fetch(`${process.env.VUE_APP_API_URL}/activities`, {
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
            window.location.href = `/Tarefas`
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

  },

  setup() {
    const route = useRoute()
    const activity = ref({
      name: "",
      description: "",
      date: "",
      time: "",
      maximum_grade: "",
    })
    const professores = ref([{}])
    const cursos = ref([{}])
    const titleText = ref("Adicionar Tarefa")
    const id = ref(0)
    const textSemestre = ref("Semestre")
    const disabled = ref(false)

    const fetchData = async (activityId) => {
        try {
          // eslint-disable-next-line
          const url = process.env.VUE_APP_API_URL;
          const token = getToken();

          const [response] = await Promise.all([
            fetch(`${url}/activities/${activityId}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }),
          ]);

          const activityData = await response.json();

          // Verificando se todas as respostas foram bem-sucedidas
          if (!response.ok) throw new Error(activityData.error);

          if (!activityData && activityId)
            throw new Error("Tarefa não encontrada");

          if(activityId != 0)
            activity.value =  activityData;
            
          titleText.value = 'Salvar Tarefa';

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
      const routeId = route.params.id ?? 0
      
      if (routeId) {
        id.value = routeId;
      }
      fetchData(id.value)
    })

    return {
      activity, titleText, id, disabled, professores, cursos, textSemestre
    }
  }
}
</script>

<style>

</style>
