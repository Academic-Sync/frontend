<template>
  <form @submit="handleLogin">
  <div class="login-container">

    <div class="login-image">
      <img src="../assets/login_back.png" alt="Biblioteca" />
    </div>
      <div class="login-form">
        
      <div class="logo">
        <!--<img src="../assets/logo.png" alt="AcademicSync" />-->
        <h1>AcademicSync</h1>
      </div>
      <h2>Seu grupo está esperando por você!</h2>
      <h2>Faça login e junte-se a eles!</h2>

      
      <div class="Form">
        <div class="message">
          <Message />
        </div>

        <label for="login">Login</label>
        <input v-model="login" type="login" id="login" name="login" placeholder="RA ou email"  />

        <label for="password">Senha</label>
        <input v-model="password" type="password" id="password" name="password" placeholder="Digite sua senha"  />

        <AddButton
          ButtonText="Fazer Login"
          :isLoading="isLoading"
        ></AddButton>
      </div>
    </div>
  </div>
</form>
</template>

<script>
import AddButton from '../components/AddButton.vue'
import Message from '../components/Message.vue'
import eventBus from '../eventBus'

export default {
  name: 'Turmas',
  components: {
    AddButton,
    Message
  },

  data() {
    return {
      email: '',
      password: '',
      isLoading: false
    };
  },

  methods: {
    validateData(e){
      const data = Object.fromEntries(new FormData(e.target).entries());

      if(!data.login || !data.password){
          const errorObject = {
            title: "",
            text: "Informe o login e senha"
          };
          eventBus.emit("error", errorObject);
          return;
      }

      return data;
    },

    async handleLogin(event) {
      this.isLoading = true;

      try {
        event.preventDefault();

        const data = this.validateData(event);
        if(!data)
          return;

        // eslint-disable-next-line
        const response = await fetch(`${process.env.VUE_APP_API_URL}/login`, {
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

          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));

          this.$router.push("/");

      } catch (error) {
        console.error(error);
        const errorObject = {
          title: "Erro no login: ",
          text: error.message
        }
        eventBus.emit("error", errorObject)
      } finally {
        this.isLoading = false;
      }

    }
  }
}
</script>

<style>
@import '/src/assets/style/cores.css';



.login-container h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}
.login-container h2 {
    font-size: 2rem;
}

.login-container p {
    font-size: 2rem;
    color: #666;
    margin-bottom: 2rem;
}

.login-container {
  display: flex;
  height: 100vh;
    text-align: center;
}

.login-image {
  flex: 1;
  overflow: hidden;
}

.login-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;
}

.logo {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.message{
  margin-bottom: 10px;
}

.logo img {
  width: 40px;
  margin-right: 0.5rem;
}

.logo h2 {
  font-size: rem;
  font-weight: bold;
}


.Form{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    border-radius: 1rem;    
    padding: 2rem;
    font-size: 2rem;
    margin-top: 1rem;

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

.forgot-password {
  font-size: 0.8rem;
  color: #007BFF;
  margin: 1rem 0;
  text-align: right;
  text-decoration: none;
}


@media screen and (max-width: 900px) {
  .login-image{
    display: none;
  }
}

.spinner {
  width: 16px;
  height: 16px;
  border: 3px solid #000;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  display: block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
