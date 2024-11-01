<template>
  <div id="app">
    <!-- Exibe o componente correspondente à rota atual -->
    <router-view />
  </div>
</template>

<script>



export default {
  name: 'App',
  components: {

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

.layout {
  display: flex;
  flex: 1; /* Ocupa o espaço restante entre o cabeçalho e o rodapé */
}

.content {
    display: flex;
    flex: 1;
    padding: 2rem 5rem;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;
}

.content h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.content p {
    font-size: 2rem;
    color: var(--Cinza);
    margin-bottom: 2rem;
}

@media (max-width: 550px) {
  .content {
    padding: 1.5rem 2.5rem;
}
}


.Form {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--Branco);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  font-size: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.Form label {
  display: flex;
  font-size: 2rem;
  color: var(--preto);
  margin-bottom: 0.5rem;
}

.Form input,
.Form textarea {
  width: 100%;
  background-color: var(--Branco2);
  border: none;
  border-radius: 1rem;
  font-size: 1.7rem;
  padding: 1rem;
  margin-bottom: 2rem;
  box-sizing: border-box;
  text-align: left;
  transition: outline 0.3s;
}
.Form input:focus,
.Form textarea:focus {
  outline: none;
  border: 1px solid var(--Azul);  
}

.Form textarea {
  height: 8rem;
  resize: vertical; 
}

.form-group {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-field label {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: var(--preto);
}

.form-control {
  width: 100%;
  padding: 1rem;
  font-size: 1.7rem;
  border-radius: 20px;
  outline: none;
  background-color: var(--Branco2);
  text-align: center;
}

.form-control:focus {
  border-color: var(--Azul); 
}

.radio-group {
    display: flex;
    flex-direction: column;
    gap: 1rem; 
    align-items: flex-start;
}

.radio-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.radio-option input[type="radio"] {
    margin: 0;
    accent-color: var(--Azul); 
}


</style>
