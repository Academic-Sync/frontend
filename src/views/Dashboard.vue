<template>
  <TheNavbar></TheNavbar>
    <article>
      <div class="container">
        <h1>Dashboard</h1>
        <div class="action-buttons">
          <TheCard 
          href="/Professores"
          alt_image="Professores"
          :image="require('../assets/grupo.png')" 
          Titulo="Professores" 
          text="Gerencie professores no sistema" 
        />
        <TheCard 
          href="/Coordenadores"
          alt_image="Coordenadores"
          :image="require('../assets/grupo.png')" 
          Titulo="Coordenadores" 
          text="Gerencie coordenadores no sistema" 
        />
        
        <TheCard 
          href="/Orientadores"
          alt_image="Orientadores"
          :image="require('../assets/grupo.png')" 
          Titulo="Orientadores" 
          text="Gerencie orientadores no sistema" 
        />
      </div>
      </div>
    </article>
  <TheFooter></TheFooter>
</template>

<script>
import TheNavbar from '../components/TheNavbar.vue'
import TheFooter from '../components/TheFooter.vue'
import TheCard from '../components/TheCard.vue'


export default {
  name: 'HomeAdmin',
  components: {
    TheNavbar,
    TheFooter,
    TheCard,
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
