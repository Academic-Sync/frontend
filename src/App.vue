<template>
  <div id="app">
    <MessageBootstrap/>
    <!-- Exibe o componente correspondente à rota atual -->
    <router-view />
  </div>
</template>

<script>
import MessageBootstrap from './components/MessageBootstrap.vue';

  export default {
    name: 'App',
    components: {
      MessageBootstrap
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
</style>
