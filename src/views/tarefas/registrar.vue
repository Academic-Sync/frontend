<template>
  <TheNavbar></TheNavbar>
  <article>
    <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <Breadcrumb :items="breadcrumbItems" />

        <Message />
        
        <h1>{{titleText}}</h1>

        <form @submit="handleSubmit" v-if="!isLoadingDatas">
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
              <Dropdown :files="files" @updateFiles="updateFiles"/>

              <div v-if="files.length > 0" class="files-container">
                <div v-for="(file, index) in files" :key="index" class="file-card">
                  <div class="file-component">
                    <div class="div-text-atividade">
                      <img src="@/assets/tasks-icon.png" alt="Ícone de arquivo" class="file-icon" style="filter: invert(100%);	" />
                      <span class="file-name">{{file.split("----")[file.split("----").length-1]}}</span>
                    </div>

                    <div class="div-button-atividade">
                      <a :href="linkDownload + 'activity/' + file.split('/')[file.split('/').length - 1]" 
                        :download="file.split('/')[file.split('/').length - 1]" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="link-download">
                          <img src="@/assets/downloads.png" height="20" class="img-download">
                      </a>
                      <button type="button" @click="removeFile(file)" class="remove-btn">Remover</button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="div-buttons" style="margin-top: 50px">
                <RemoveButton :isLoading="isLoadingDelete" v-if="activity.id" @click="handleDelete" type="button" ButtonText="Apagar Tarefa" />
                <AddButton v-if="activity.id" target="_blank" :href="'/tarefas/visualizar/' +activity.id " ButtonText="Visualizar como Aluno"></AddButton>
                <AddButton :isLoading="isLoadingInsert" :ButtonText="titleText"></AddButton>
              </div>
          </div>
        </form>

        <div class="Form" v-if="!isLoadingDatas && activity?.activities_delivered?.length > 0">
          <h1>Entregas</h1>

          <div class="files-container">
            <div v-for="(entrega, index) in entregas" :key="index" class="file-card">
              <div class="file-component">
                <div class="div-text-atividade">
                  <img src="@/assets/tasks-icon.png" alt="Ícone de arquivo" class="file-icon" style="filter: invert(100%);" />
                  <span class="file-name">Aluno: {{ entrega.student.name }}</span>
                </div>

                <div class="div-button-atividade">
                  <!-- Link de download para cada arquivo -->
                  <button @click="downloadZip(activity.id, entrega.student.id, entrega.student.name)" class="download-zip-button">
                    <img src="@/assets/downloads.png" height="20" class="img-download" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>

        <div v-if="isLoadingDatas">
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
import Dropdown from '../../components/Dropdown.vue'
import Message from '../../components/Message.vue'
import eventBus from '../../eventBus'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getToken } from '@/utils/auth'
import Breadcrumb from "@/components/Breadcrumb.vue"
import SpinnerScreen from '@/components/SpinnerScreen.vue'
import axios from 'axios'

export default {
  name: 'Turmas',
  components: {
    TheNavbar,
    TheFooter,
    RemoveButton,
    SideBar,
    AddButton,
    Dropdown,
    Message,
    Breadcrumb,
    SpinnerScreen
  },

  data() {
    return {
      breadcrumbItems: [
        { label: "Home", href: "/" },
        { label: "Listar Tarefas", href: "/tarefas" },
        { label: "Adicionar Tarefa", href: "/tarefas" },
      ],
      // eslint-disable-next-line
      linkDownload: process.env.VUE_APP_API_URL + "/../"
      // files: [],
    }
  },

  methods: {
    updateFiles(newFiles) {
      // eslint-disable-next-line
      this.files.value = newFiles;
    },

    async removeFile(file_name) {
      try {
        const id = document.querySelector("#id")
        const token = getToken();

        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/activities/file/${id.value}/${encodeURIComponent(file_name)}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
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
          window.location.reload();
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
          this.$router.push(`/tarefas`);
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
      const formData = new FormData(e.target);

      this.files.forEach((file) => {
        formData.append('files[]', file);
      });

      const user = localStorage.getItem('user');
      const parsedUser = JSON.parse(user);
      formData.append('teacher_id', parsedUser.id);
      
      if(!formData.get('name') || !formData.get('description') || !formData.get('date') || !formData.get('time') || !formData.get('maximum_grade')){
        const errorObject = {
          title: "",
          text: "Informe todos os campos"
        }
        eventBus.emit("error", errorObject)
        return 0;
      }    

      return formData;
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
          const response = await fetch(`${process.env.VUE_APP_API_URL}/activities`, {
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
            this.$router.push(`/tarefas`);
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

  async downloadZip(activityId, studentId, name) {
      try {
        // Chamada à API com o token de autenticação
        // eslint-disable-next-line
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/activities/download-zip/${activityId}/${studentId}`,
          {
            responseType: 'blob', // Importante para arquivos binários
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` // Adicione o token
            }
          }
        );

        // Cria um link de download para o arquivo ZIP
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `tarefa de ${name} - ${activityId}.zip`);
        document.body.appendChild(link);
        link.click();

        // Remove o link após o uso
        link.parentNode.removeChild(link);
      } catch (error) {
        console.error('Erro ao baixar o ZIP:', error);
        alert('Não foi possível baixar as atividades. Tente novamente mais tarde.');
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
    const files = ref([])
    const entregas = ref([])
    const isLoadingDatas = ref(true)
    const isLoadingInsert = ref(false)
    const isLoadingDelete = ref(false)
    const url = ref("")

    const fetchData = async (activityId) => {
        try {
          // eslint-disable-next-line
          url.value = process.env.VUE_APP_API_URL;
          const token = getToken();

          const [response] = await Promise.all([
            fetch(`${url.value}/activities/${activityId}`, {
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

          if(activityId != 0){
            activity.value =  activityData;
            entregas.value = activity.value.activities_delivered
          }
            
          titleText.value = 'Salvar Tarefa';

          if (activityData?.file_path) {
              files.value = JSON.parse(activityData?.file_path); // Supondo que a lista de arquivos seja 'files'
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
      }else{
        isLoadingDatas.value = false
      }

      fetchData(id.value)
    })

    return {
      activity, titleText, id, disabled, professores, cursos, textSemestre, files, isLoadingDatas, isLoadingDelete, isLoadingInsert, entregas, url
    }
  }
}
</script>

<style>
.div-buttons-file{
  display: flex;
  align-items: center;
  gap: 10px;
}

.link-download{
  display: flex;
}

.div-text-atividade{
  flex: 1;
  display: flex;
  justify-content: start;
  align-items: center;
}

.div-button-atividade{
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 10px;
}

.file-component {
  display: flex;
  /* align-items: center; */
  border-radius: 0.5rem;
  width: 100%;
  height: 6rem; 
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.233);
}

.file-icon {
  width: 30px; /* Ajustar o tamanho do ícone */
  height: 30px;
  margin-right: 10px;
  margin-left: 10px;
}

.file-name {
    font-size: 1.5rem;

}

.download-zip-button{
  border: 0;
  background: transparent;
}

.img-download{
  margin-right: 10px;
  cursor: pointer;
}
</style>
