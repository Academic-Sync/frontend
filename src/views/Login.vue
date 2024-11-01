<template>
  <div class="login-container">
    <div class="login-image">
      <img src="../assets/login_back.png" alt="Biblioteca" />
    </div>
    <div class="login-form">
      <div class="logo">
        <img src="../assets/logo.png" alt="AcademicSync" />
        <h1>AcademicSync</h1>
      </div>
      <h2>Seu grupo está esperando por você!</h2>
      <h2>faça login e junte-se a eles!</h2>
      <div class="Form">
        <label for="email">EMAIL</label>
        <input type="email" id="email" placeholder="Digite seu email" required />

        <label for="password">SENHA</label>
        <input type="password" id="password" placeholder="Digite sua senha" required />

        <AddButton
        href="/"
        ButtonText="Fazer Login"
        ></AddButton>
      </div>
    </div>
  </div>
</template>

<script>
import AddButton from '../components/AddButton.vue'

export default {
  name: 'Turmas',
  components: {
    AddButton,
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


</style>
