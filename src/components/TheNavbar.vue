<template>

      <header class="header">
        <div class="icon-button">
          <a href="/"><img src="../assets/logo.png" alt="Logo"></a>
        </div>
          <div class="header-icons">
            <div class="icon-button">
              <img src="../assets/notifi.png" alt="Notificações">
            </div>
            <div class="icon-button">
              <img src="../assets/user.png" alt="Perfil">
            </div>
            <div @click="handleLogout" class="icon-button">
              <p>Sair</p>
            </div>
          </div>
      </header>

</template>

<script>
import { logout } from '../utils/auth'; // Importa a função de logout

export default {
  name: 'TheNavbar',

  methods: {
    handleLogout (){
      logout();
    },
  },

}
</script>

<style>
@import '../assets/style/cores.css';


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