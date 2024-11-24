<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <Breadcrumb :items="breadcrumbItems" />
        
        <Message />

        <div class="w-100" v-if="!isLoadingDatas">

          <div class="grid-cont">
            <div class="iten"><h1> {{ activity.name }} </h1></div>
            <div class="iten">
              <div class="side_tarefa_info">
                <h2>Entrega: {{ formatDate(activity.date) }} às {{ activity.time }}</h2>
                <h2>Nota Maxima: {{ activity.maximum_grade }}</h2>
              </div>

            </div>
          </div>
          <h2>
            {{ activity.description }}
          </h2>
          <div class="arquives_text" v-if="files.length > 0">
              <h2>ARQUIVOS DA TAREFA</h2>
          </div>
          
          <!-- <AttArquive/> -->
          <div v-if="files.length > 0" class="files-container w-100">
            <div v-for="(file, index) in files" :key="index" class="file-card w-100">
              <div class="file-component">
                <div class="div-text-atividade">
                  <img src="@/assets/tasks-icon.png" alt="Ícone de arquivo" class="file-icon" style="filter: invert(100%);	" />
                  <span class="file-name">{{file.split("----")[file.split("----").length-1]}}</span>
                </div>

                <div class="div-button-atividade">
                  <a :href="linkDownload + 'activity/' + file.split('/')[file.split('/').length - 1]" 
                    :download="file.split('/')[file.split('/').length - 1]" 
                    target="_blank" 
                    rel="noopener noreferrer">
                      <img src="@/assets/downloads.png" height="20" class="img-download">
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <form @submit="handleSubmit">
              <div class="arquives_text">
              <h2>MEUS ARQUIVOS</h2>
            </div>
            <div class="Form">
                <label for="Arquivo">Arquivo</label>
                <Dropdown :files="files" @updateFiles="updateFiles"/>
            </div>

                <AddButton :isLoading="isLoadingInsert"
                href="/AddTarefas"
                ButtonText="Enviar Tarefa"
                ></AddButton>
          </form>
        </div>

        <div v-else>
          <SpinnerScreen/>
        </div>
        
      </main>
    </div>

    </article>
  <TheFooter></TheFooter>
</template>


<script>
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import SideBar from '@/components/SideBar.vue'
import AddButton from '@/components/AddButton.vue'
import Breadcrumb from "@/components/Breadcrumb.vue"
import { getToken } from '@/utils/auth'
import eventBus from '@/eventBus'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Message from '@/components/Message.vue'
import Dropdown from '@/components/Dropdown.vue'
import SpinnerScreen from '@/components/SpinnerScreen.vue'

export default {
  name: 'VisuTarefas',
  components: {
    TheNavbar,
    TheFooter,
    SideBar,
    AddButton,
    Breadcrumb,
    Message,
    Dropdown,
    SpinnerScreen
  },

  data() {
    return {
      breadcrumbItems: [
        { label: "Home", href: "/" },
        { label: "Listar Tarefas", href: "/tarefas" },
        { label: "Ver Tarefa", href: "/tarefas" },
      ],
      // eslint-disable-next-line
      linkDownload: process.env.VUE_APP_API_URL + "/../"
      // files: [],
    }
  },

  methods: {
    formatDate(date) {
      try {
        const parsedDate = new Date(`${date}T00:00:00`); // Garante compatibilidade com o formato "YYYY-MM-DD"
        const day = String(parsedDate.getDate()).padStart(2, '0');
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
        const year = parsedDate.getFullYear();
        return `${day}/${month}/${year}`;
      } catch (error) {
        console.error("Erro ao formatar data:", error);
        return "Data inválida";
      }
    },

    updateFiles(newFiles) {
      // eslint-disable-next-line
      this.files.value = newFiles;
    },

    async removeFile(file_name) {
      try {
        console.log(file_name);
        
        const id = document.querySelector("#id")
        const token = getToken();

        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/activities/${id.value}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: file_name
      });


        const result = await response.json();

        
        console.log(result);

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

    async handleSubmit(e){
      e.preventDefault();
        await this.create(e);
    },

    async handleDelete(){
      try {
        const id = document.querySelector("#id")
        const token = getToken();

        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/activities/${id.value}`, {
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
      const formData = new FormData(e.target);

      this.files.forEach((file) => {
        formData.append('files[]', file);
      });
      
      if(!formData.get('files')){
        const errorObject = {
          title: "",
          text: "Envie um arquivo"
        }
        eventBus.emit("error", errorObject)
        return 0;
      }    

      return formData;
    },

    async create(e){
      this.isLoadingInsert = true
      try {
          const data = this.validateDate(e);
          const token = getToken();

          if(!data)
            return;

          // eslint-disable-next-line
          const response = await fetch(`${process.env.VUE_APP_API_URL}/activities/submit`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            },
            body: data
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
    const id = ref(0)
    const files = ref([])
    const isLoadingDatas = ref(true)
    const isLoadingInsert = ref(true)
    const isLoadingDelete = ref(false)

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

          if (!activityData || !activityId)
            throw new Error("Tarefa não encontrada");

          if(activityId != 0)
            activity.value =  activityData;
            
          if (activityData?.file_path) {
              files.value = JSON.parse(activityData?.file_path); // Supondo que a lista de arquivos seja 'files'
          }

        } catch (error) {
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
      }
      fetchData(id.value)
    })

    return {
      activity, id, files, isLoadingDatas, isLoadingDelete, isLoadingInsert
    }
  }
}
</script>

<style scoped>
@import '/src/assets/style/cores.css';

#app {
  display: flex;
    flex-direction: column;
    min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--preto);
}

.container {
    margin: 2rem auto;
    padding: 2rem;
}

.container h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}


.container p {
    font-size: 2rem;
    color: #666;
    margin-bottom: 2rem;
}

.grid-cont{
  display: grid;
  width: 100%;
  grid-template-columns: 75% 25%; /* Duas colunas, cada uma com 100px */
}

.side_tarefa_info{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.iten h2{
  font-size: 2wrem;
  text-align: justify;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

h1{
  text-align: left;
  margin-bottom: 0rem;
}

.arquives_text h2{
  color: #666;
  font-size: 1.7rem;
  text-align: justify;
  font-weight: lighter;
  margin-top:  4rem;
}

.action-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3rem;
    margin-bottom: 4rem;
}
</style>
