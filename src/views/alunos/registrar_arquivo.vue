<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="layout">
      <SideBar /> 
      
      <main class="content">
        <Breadcrumb :items="breadcrumbItems" />

        <Message />
        

        <h1>{{titleText}}</h1>

        <form @submit="handleFileUpload" v-if="!isLoadingDatas"  enctype="multipart/form-data">
          <div class="Form">
            <input v-model="studentId" type="hidden" name="id" id="id">
              <div class="mb-3 text-start">
                  <label for="course_id" class="form-label">Turma:</label>
                  <select v-model="student.class_id" name="class_id" id="class_id">
                    <option value="0">Selecione a Turma</option> 
                    <option v-for="thisClass in classes" :key="thisClass.id" :value="thisClass.id">{{ thisClass?.semester + "º" + " - " + thisClass?.course?.name  }}</option>
                  </select>
              </div>

              <label for="actual-btn">Arquivo</label>
              <Dropdown :isNotMultiple="true" :files="files" @updateFiles="updateFiles"/>
          </div>

          <div class="div-buttons">
            <AddButton :isLoading="isLoadingInsert" :ButtonText="titleText" />
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
import Message from '../../components/Message.vue'
import { useRoute } from 'vue-router'
import eventBus from '../../eventBus'
import { ref, onMounted } from 'vue'
import { getToken } from '../../utils/auth'
import Breadcrumb from "@/components/Breadcrumb.vue"
import SpinnerScreen from '@/components/SpinnerScreen.vue'
import Dropdown from '../../components/Dropdown.vue'
import * as XLSX from 'xlsx'

export default {
  name: 'Turmas',
  components: {
    TheNavbar,
    TheFooter,
    SideBar,
    AddButton,
    Message,
    Breadcrumb,
    SpinnerScreen,
    Dropdown
  },

  data() {
    return {
      breadcrumbItems: [
        { label: "Home", href: "/" },
        { label: "Listar Alunos", href: "/alunos" },
        { label: "Adicionar Aluno", href: "/alunos" },
      ],
    }
  },

  methods: {
    async handleSubmit(e){
      this.isLoadingInsert = true
      e.preventDefault();

      if(!this.validateEmail())
        return

        await this.create(e);
    },

    validateEmail(){
      const email = this.student.email;

      if(email){
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
      }

      return 1;
    },

    async handleFileUpload (event) {
      this.isLoadingInsert = true
      const token = getToken();

      try {
        event.preventDefault()
        const formData = new FormData(event.target);
        const file = formData.get('files[]');

        console.log(formData.get('class_id'));
        

        if (!formData.get('class_id') || formData.get('class_id') == 0) {
          throw new Error("Insira a turma");
        }

        if (!file.name) {
          throw new Error("Insira um arquivo");
        }

        // Validação do tipo de arquivo (Excel)
        if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xlsx')) {
          throw new Error("O Arquivo precisa ser um Excel (.xlsx)");
        }
        
          const reader = new FileReader();

          reader.onload = async (e) => {
              const data = e.target.result;
              const wb = XLSX.read(data, { type: 'binary' });
              const ws = wb.Sheets["Sheet1"];
              const rawData = XLSX.utils.sheet_to_json(ws, { header: 1 });

              // Remover cabeçalhos
              rawData.shift();
              rawData.shift();

              // Formatar os dados
              const students = rawData.map(row => {
                  const formattedName = row[1].split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
                  const password = row[0].trim();  // A senha será o RA (ou um gerador de senha)

                  return {
                      ra: row[0].trim(),
                      name: formattedName,
                      password: password,
                  };
              });

              // Enviar o JSON para o backend
              try {
                  // eslint-disable-next-line
                  const response = await fetch(`${process.env.VUE_APP_API_URL}/students/store-by-file`, {
                      method: 'POST',
                      headers: {
                          "Authorization": `Bearer ${token}`,
                          'Content-Type': 'application/json',
                          'Accept': 'application/json'
                      },
                      body: JSON.stringify({ students }),
                  });

                  const result = await response.json();

                  if (!response.ok) {
                    throw new Error(result.error); // Tratamento de erro
                  }

                  console.log(students.length);
                  console.log(result);
                  

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
          };

          reader.readAsBinaryString(file);
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


    validateData(e){
      const data = Object.fromEntries(new FormData(e.target).entries());

      if(!data.name || !data.code || !data.class_id){
          const errorObject = {
            title: "",
            text: "Informe todos os campos"
          };
          eventBus.emit("error", errorObject);
          return;
      }

      // Validação para verificar se o código tem 13 caracteres numéricos
      const isValidCode = /^\d{13}$/.test(data.code);

      if (!isValidCode) {
          const errorObject = {
            title: "",
            text: "O RA deve ter exatamente 13 caracteres numéricos"
          };
          eventBus.emit("error", errorObject);
          return;
      }
      return data;
    },

    async update(e){
      try {
          const studentId = document.querySelector("#id")
          const token = getToken();

          const data = this.validateData(e);
          if(!data)
            return;
 
          // eslint-disable-next-line
          const response = await fetch(`${process.env.VUE_APP_API_URL}/students/${studentId.value}`, {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${token}`,
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
        const data = this.validateData(e);
        const token = getToken();

          if(!data)
            return;

          // eslint-disable-next-line
          const response = await fetch(`${process.env.VUE_APP_API_URL}/students`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
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
            window.location.href = `/Alunos/editar/${result.student.id}`
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
    }
  },

  setup() {
    const route = useRoute()
    const student = ref({
      class_id: 0,
    })
    const titleText = ref("Adicionar Aluno")
    const studentId = ref(0)
    const disabled = ref(false)
    const classes = ref([{}])
    const isLoadingDatas = ref(true)
    const isLoadingInsert = ref(false)
    const isLoadingDelete = ref(false)

    const fetchAluno = async (id) => {
      const token = getToken();

      // eslint-disable-next-line 
      const url = process.env.VUE_APP_API_URL
      try {
        // const response = await fetch(`${process.env.VUE_APP_API_URL}/students/${id}`, {
        //   headers: {
        //     "Authorization": `Bearer ${token}`,
        //     "Content-Type": "application/json"
        //   }
        // })

        const [response, responseCurso] = await Promise.all([
          fetch(`${url}/students/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }),
          fetch(`${url}/classes`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
        ]);

        const aluno = await response.json()
        const cursosData = await responseCurso.json()

        classes.value = cursosData;

        if (!response.ok)
          throw new Error(aluno.error)

          
        if (!responseCurso.ok)
          throw new Error(cursosData.error)
        
        if (!aluno && id)
          throw new Error('Aluno não encontrado')

        if(id){
          student.value = aluno
          studentId.value = id
          titleText.value = 'Salvar Aluno';
          student.value.class_id = student.value.classes[0]?.id
        }
        

      } catch (error) {
        disabled.value = true
        const errorObject = {
          title: "Erro ao listar: ",
          text: error.message
        }
        eventBus.emit("error", errorObject)
      } finally{
        isLoadingDatas.value = false
      }
    }

    onMounted(() => {
      const routeId = route.params.id;
      if (routeId) {
        studentId.value = routeId;
      } else{
        isLoadingDatas.value = false
      }

      fetchAluno(studentId.value)
    })

    return {
      student, titleText, studentId, disabled, classes, isLoadingDatas, isLoadingDelete, isLoadingInsert
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
