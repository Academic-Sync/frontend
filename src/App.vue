<template>
  <div id="app">
    <!-- Exibe o componente correspondente à rota atual -->
    <router-view v-if="!showErrorPage" />
  </div>
</template>

<script>
  export default {
    name: 'App',
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
  /* text-align: center; */
  color: var(--preto);
}

h2{
  text-align: start!important;
  font-weight: normal;
}

.invert-color-image{
  filter: invert(100%);
}

.cursor-pointer{
  cursor: pointer;
}

.text-nao-encontrado{
  margin-top: 10px;
}

/* plugin de acessibilidade */
body .uwy.userway_p1 .userway_buttons_wrapper{
  top: calc(50% + 15px)!important;
  left: auto!important;
  right: -30px!important;
  /* right: 0!important; */
}
body .uwy .uai, body .uwy .ulsti{
  width: 41px!important;
  height: 41px!important;
  border-radius: 8px!important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.uwy .uai, .uwy .ulsti{
  border-radius: 8px!important;
}

/* v-libras */
[vw].enabled{
  right: 0px !important;
  top: calc(50% - 15px)!important;
}

.div-buttons{
  display: flex;
  justify-content: end;
  gap: 20px;
  width: 100%;
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

.select2-container .select2-selection--single{
    width: 100%!important;
    background-color: var(--Branco2)!important;
    display: flex;
    justify-content: left;
    border: none;
    border-radius: 1rem;
    font-size: 1.7rem;
    padding: .5rem;
    height: auto;
    margin-bottom: 2rem;
}

.select2 {
  width: 100%!important;
}

.select2-container--open .select2-dropdown--below{
  background: var(--Branco2);
  border: 0;
  border-radius: 5px;
}

.select2-container--default .select2-results>.select2-results__options{
  font-size: 1.7rem!important;
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

  /* v-libras */
  [vw].enabled{
    right: -5px !important;
    top: calc(50% - 20px)!important;
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

.Form select:focus, .Form select:focus {
    outline: none;
    border: 1px solid var(--Azul);
}

ul{
  padding: 10px!important;
}

input[role="textbox"] {
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
