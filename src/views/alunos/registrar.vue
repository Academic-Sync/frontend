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
            <input v-model="studentId" type="hidden" name="id" id="id">

              <div class="mb-3 text-start">
                  <label class="form-label">Nome:</label>
                  <input :disabled="disabled" v-model="student.name" type="text" name="name" class="form-control" id="name" placeholder="Nome">
              </div>

              <div class="mb-3 text-start">
                  <label class="form-label">Email:</label>
                  <input v-model="student.email" type="name" name="email" class="form-control" id="email" placeholder="Email">
              </div>

              <div v-if="!student" class="mb-3 text-start">
                  <label class="form-label">Senha:</label>
                  <input type="password" name="password" class="form-control" id="password" placeholder="password">
              </div>

              <div class="mb-3 text-start">
                  <label class="form-label">RA:</label>
                  <input v-model="student.code" type="text" name="code" class="form-control" id="code" placeholder="RA">
              </div>
          </div>

          <div class="div-buttons">
            <RemoveButton v-if="student.id" @click="handleDelete" type="button" ButtonText="Apagar aluno" />
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

  data(){
    return {
      olaMundo: "Joao"
    }
  },

  methods: {
    async handleSubmit(e){
      e.preventDefault();
      if(!this.validateEmail())
        return

      const studentId = document.querySelector("#id")
      if(studentId.value != 0)
        return await this.update(e);

        await this.create(e);
    },

    validateEmail(){
      const email = this.student.email;

      // Verifica se o email é do domínio fatec.sp.gov.br
      const emailPattern = /^[a-zA-Z0-9._%+-]+@fatec\.sp\.gov\.br$/;
      if (!emailPattern.test(email)) {
        const errorObject = {
          title: "",
          text: "O email precisa ser do domínio @fatec.sp.gov.br"
        };
        eventBus.emit("error", errorObject);
        return 0;
      }

      return 1;
    },

    async handleDelete(){
      try {
        const studentId = document.querySelector("#id")

        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/students/${studentId.value}`, {
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
          window.location.href = "/Alunos"
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
          const data = Object.fromEntries(new FormData(e.target).entries());
          const studentId = document.querySelector("#id")

          if(!data.name || !data.email || !data.code){
            const errorObject = {
              title: "",
              text: "Informe todos os campos"
            }
            eventBus.emit("error", errorObject)
            return;
          }    

          // eslint-disable-next-line
          const response = await fetch(`${process.env.VUE_APP_API_URL}/students/${studentId.value}`, {
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
          const data = Object.fromEntries(new FormData(e.target).entries());

          if(!data.name || !data.email || !data.code){
            const errorObject = {
              title: "",
              text: "Informe todos os campos"
            }
            eventBus.emit("error", errorObject)
            return;
          }    

          // eslint-disable-next-line
          const response = await fetch(`${process.env.VUE_APP_API_URL}/students`, {
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
    const route = useRoute() // Obtemos a rota atual
    const student = ref({})
    const titleText = ref("Adicionar Aluno")
    const studentId = ref(0)
    const disabled = ref(false)

    const fetchAluno = async (id) => {
      try {
        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/students/${id}`)
        
        if (!response.ok)
          throw new Error('Erro ao buscar aluno')

        const aluno = await response.json()
        
        if (!aluno)
          throw new Error('Aluno não encontrado')

        student.value = aluno
        studentId.value = id
        titleText.value = 'Salvar Aluno';

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
        studentId.value = route.params.id;
        fetchAluno(studentId.value)
      }
    })

    return {
      student, titleText, studentId, disabled
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
    justify-content: center;
    border: none;
    border-radius: 1rem;
    font-size: 1.7rem;
    padding: 1rem;
    margin-bottom: 2rem;
}
</style>
