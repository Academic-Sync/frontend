<template>
    <TheNavbar></TheNavbar>
      <article>
        <div class="layout">
        <SideBar /> 
        
        <main class="content">
          <Breadcrumb :items="breadcrumbItems" />
  
          <Message />
          
          <h1>Minha Conta</h1>
  
          <form @submit="handleSubmit" v-if="!isLoadingDatas">
            <div class="Form">
                <div class="mb-3 text-start">
                    <label for="name" class="form-label">Nome:</label>
                    <input disabled v-model="conta.name" type="text" name="name" class="form-control" id="name" placeholder="Nome">
                </div>
  
                <div class="mb-3 text-start">
                    <label for="email" class="form-label">Email:</label>
                    <input v-model="conta.email" type="name" name="email" class="form-control" id="email" placeholder="Email">
                </div>
  
                <div class="mb-3 text-start">
                    <label for="password" class="form-label">Senha:</label>
                    <input type="password" name="password" class="form-control" id="password" placeholder="Senha">
                </div>
  
                <div class="mb-3 text-start">
                    <label for="code" class="form-label">RA:</label>
                    <input disabled v-model="conta.code" type="text" name="code" class="form-control" id="code" placeholder="RA">
                </div>
            </div>
  
            <div class="div-buttons">
              <AddButton :isLoading="isLoadingInsert" ButtonText="Atualizar" />
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
  import TheNavbar from '@/components/TheNavbar.vue'
  import TheFooter from '@/components/TheFooter.vue'
  import SideBar from '@/components/SideBar.vue'
  import AddButton from '@/components/AddButton.vue'
  import Message from '@/components/Message.vue'
  import eventBus from '@/eventBus'
  import { ref, onMounted } from 'vue'
  import { getToken, getUser } from '@/utils/auth'
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
      Breadcrumb,
      SpinnerScreen
    },
  
    data() {
      return {
        breadcrumbItems: [
          { label: "Home", href: "/" },
          { label: "Minha Conta", href: "/conta" },
        ],
      }
    },
  
    methods: {
      async handleSubmit(e){
        this.isLoadingInsert = true
        e.preventDefault();
  
        if(!this.validateEmail())
          return
  
        return await this.update(e);
      },
  
      validateEmail(){
        const email = this.conta.email;
  
        if(email){
          // Verifica se o email é do domínio fatec.sp.gov.br
          const emailPattern = /^[a-zA-Z0-9._%+-]+@fatec\.sp\.gov\.br$/;
          if (!emailPattern.test(email)) {
            const errorObject = {
              title: "",
              text: "O email precisa ser do domínio @fatec.sp.gov.br"
            };
            this.isLoadingDatas = false
            eventBus.emit("error", errorObject);
            this.isLoadingInsert = false
            return 0;
          }
        }
  
        return 1;
      },
  
      validateData(e){
        const data = Object.fromEntries(new FormData(e.target).entries());
  
        if(!data.email){
            this.isLoadingDatas = false
            const errorObject = {
              title: "",
              text: "Informe o email"
            };
            eventBus.emit("error", errorObject);
            this.isLoadingInsert = false
            return;
        }
  
        return data;
      },
  
      async update(e){
        try {
            const token = getToken();
  
            const data = this.validateData(e);
            if(!data)
              return;
   
            // eslint-disable-next-line
            const response = await fetch(`${process.env.VUE_APP_API_URL}/profile`, {
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


            let updatedUser = getUser();
            updatedUser.email = data.email

            localStorage.setItem('user', JSON.stringify(updatedUser))

  
            const successObject = {
              title: "",
              text: result.message
            }
            eventBus.emit("success", successObject)
            setTimeout(()=>{
              window.location.reload(true);
            }, 1000);
  
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
    },
  
    setup() {
      const conta = ref({
        class_id: 0,
      })
      const isLoadingDatas = ref(true)
      const isLoadingInsert = ref(false)
      const isLoadingDelete = ref(false)
  
      const fetchConta = async () => {
        const token = getToken();
  
        // eslint-disable-next-line 
        const url = process.env.VUE_APP_API_URL
        try {
          const [response] = await Promise.all([
            fetch(`${url}/profile`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }),
          ]);
  
          const data = await response.json()
  
  
          if (!response.ok)
            throw new Error(data.error)
  
          if (!data)
            throw new Error('Dados não encontrados')
  
        conta.value = data.user
          
  
        } catch (error) {
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
        fetchConta()
      })
  
      return {
        conta, isLoadingDatas, isLoadingDelete, isLoadingInsert
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
  .Form input:disabled{
    background: #d3d3d391;
    cursor:alias;
    cursor: not-allowed;
  }
  </style>
  