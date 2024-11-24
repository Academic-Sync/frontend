<template>
  <header class="header">
    <div class="icon-button">
      <router-link to="/"><img src="../assets/logo.png" alt="Logo"></router-link>
    </div>
    <div class="header-icons">
      <div 
        class="icon-button notification-container"
        @mouseover="showModal = true" 
        @mouseleave="showModal = false"
      >
        <div class="has-notification" v-if="!user.email"></div>

        <img src="../assets/notifi.png" alt="Notificações">

        <div v-if="showModal" class="notification-modal">
          <!-- <a href="/conta"> -->
            <router-link to="/conta">
              <div class="notification">
                <p>Insira seu email</p>
              </div>
            </router-link>
          <!-- </a> -->
        </div>

      </div>
      <div class="icon-button">
        <router-link to="/conta">
          <img src="../assets/user.png" alt="Perfil">
        </router-link>
      </div>
      <div @click="handleLogout" class="cursor-pointer icon-button">
        <p>Sair</p>
      </div>
    </div>
  </header>
</template>

<script>
import { logout } from '../utils/auth'
import { getUser } from '@/utils/auth'
import { ref } from 'vue'

export default {
  name: 'TheNavbar',

  data() {
    return {
      showModal: false,
    };
  },

  methods: {
    handleLogout (){
      logout();
    },
  },

  setup(){
    const user = ref({})
    user.value = getUser()
    return {
      user
    }
  }

}
</script>

<style>
@import '../assets/style/cores.css';

.has-notification::after {
  content: '';
  background: red;
  height: 15px;
  width: 15px;
  border-radius: 50%; /* Garante que seja um círculo perfeito */
  position: absolute;
  right: 5px;
  top: 5px;
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.5); /* Efeito de brilho */
  animation: pulse 1s infinite; /* Aplica a animação */
}

.notification{
  border-bottom: 1px solid #d3d3d3;
  padding: 10px 0;
}

/* Definição da animação */
@keyframes pulse {
  0% {
    transform: scale(1); /* Tamanho inicial */
    opacity: 1;
  }
  50% {
    transform: scale(1.2); /* Aumenta ligeiramente */
    opacity: 0.7; /* Reduz um pouco a opacidade */
  }
  100% {
    transform: scale(1); /* Volta ao tamanho inicial */
    opacity: 1;
  }
}

/* modal */
.notification-container {
  position: relative;
}

.notification-modal {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #fff;
  color: #000;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 250px;
  z-index: 10;
  animation: fadeIn 0.5s ease-in-out;
}

.notification-modal p{
  color: #000!important;
}

/* Animação para o modal */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.header {
    position: relative;
    width: 100%;
    height: 5rem;
    background-color: var(--Azul);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px #000000aa;
    padding: 0.5rem;
}
.icon-button img {
    width: 3.5rem;
    height: auto;
}

.icon-button p {
  color: #fff;
  font-size: 1.5rem;
}

.header-icons {
    display: flex;
    align-items: center;
    gap: 1.5rem; 
}

.icon-button{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 5rem;
  transition: background-color 0.5s ;
  border-radius: 25%;
  position: relative;
}

.icon-button:hover{
  background-color: var(--AzulHover);
}

@media (max-width: 768px) {
    .header {
        height: 3.5rem; 
    }
    .icon-button{
      height: 3rem;
      width: 3rem;
    }
    .icon-button img {
        width: 2.5rem; 
    }
}

</style>