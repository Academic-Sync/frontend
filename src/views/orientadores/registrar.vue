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
                  <label for="name" class="form-label">Nome:</label>
                  <input :disabled="disabled" v-model="teacher.name" type="text" name="name" class="form-control" id="name" placeholder="Nome">
              </div>

              <div class="mb-3 text-start">
                  <label for="email" class="form-label">Email:</label>
                  <input v-model="teacher.email" type="name" name="email" class="form-control" id="email" placeholder="Email">
              </div>

              <div v-if="!teacher.id" class="mb-3 text-start">
                  <label for="password" class="form-label">Senha:</label>
                  <input type="password" name="password" class="form-control" id="password" placeholder="Senha">
              </div>

              <div class="mb-3 text-start">
                  <label for="code" class="form-label">Código:</label>
                  <input v-model="teacher.code" type="text" name="code" class="form-control" id="code" placeholder="Código">
              </div>
          </div>

          <div class="div-buttons">
            <RemoveButton v-if="teacher.id" @click="handleDelete" type="button" ButtonText="Apagar Orientador" />
            <AddButton :ButtonText="titleText" />
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
import Message from '../../components/Message.vue'
import { useRoute } from 'vue-router'
import eventBus from '../../eventBus'
import { ref, onMounted } from 'vue'
import RemoveButton from '@/components/RemoveButton.vue'
import { getToken } from '@/utils/auth'
import { validateEmailDominian } from '@/utils/user'

export default {
  name: 'Professores',
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


    validateData(e){
      const data = Object.fromEntries(new FormData(e.target).entries());

      if(!data.name || !data.email){
          const errorObject = {
            title: "",
            text: "Informe o nome e email"
          };
          eventBus.emit("error", errorObject);
          return;
      }

      if(!validateEmailDominian(data.email))
        return

      return data;
    },

    async handleDelete(){
      try {
        const id = document.querySelector("#id")
        const token = getToken();

        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/advisors/${id.value}`, {
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
          window.location.href = "/Orientadores"
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

    async update(e){
      try {
          const id = document.querySelector("#id")
          const token = getToken();

          const data = this.validateData(e);
          if(!data)
            return;
 

          // eslint-disable-next-line
          const response = await fetch(`${process.env.VUE_APP_API_URL}/advisors/${id.value}`, {
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
          const data = this.validateData(e);
          const token = getToken();

          if(!data)
            return;

            // eslint-disable-next-line
          const response = await fetch(`${process.env.VUE_APP_API_URL}/advisors`, {
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
            window.location.href = `/Orientadores/editar/${result.advisor.id}`
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
    const teacher = ref({})
    const titleText = ref("Adicionar Orientador")
    const id = ref(0)
    const disabled = ref(false)

    const fetchData = async (teacherId) => {
      try {
        const token = getToken();
        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/advisors/${teacherId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const professor = await response.json()

        if (!response.ok)
          throw new Error(professor.error)
        
        if (!professor)
          throw new Error('Orientador não encontrado')

        teacher.value = professor
        id.value = teacherId
        titleText.value = 'Salvar Orientador';

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
      teacher, titleText, id, disabled
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

form{
  width: 100%;;
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
