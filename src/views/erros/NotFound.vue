<template>
  <TheNavbar />
  <article>
    <div class="layout">
      <SideBar />
      <main class="content">
        
        <Message />
        <h1>Página Não Encontrada</h1>
        <div class="div-buttons">
          <AddButton
            href="/AddOrientadores"
            ButtonText="Adicionar Orientadores"
          />
        </div>
      </main>
    </div>
  </article>
  <TheFooter />
</template>
  
  <script>
  import TheNavbar from '../../components/TheNavbar.vue'
  import TheFooter from '../../components/TheFooter.vue'
  import SideBar from '../../components/SideBar.vue'
  
  
  export default {
    name: 'NotFound',
    components: {
      TheNavbar,
      TheFooter,
      SideBar
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
    /* text-align: center; */
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
      color: #666;
      margin-bottom: 2rem;
  }
  
  .action-buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 3rem;
      margin-bottom: 4rem;
  }
  </style>
  