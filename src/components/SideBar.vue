<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <router-link to="/professores" v-if="userType == 'admin'">
          <li>
            <img class="invert-color-image" src="../assets/professor-no-quadro.png" alt="Professores">
            <div class="text">Professores</div>
          </li>
        </router-link>

        <router-link to="/coordenadores" v-if="userType == 'admin'">
          <li>
            <img class="invert-color-image" src="../assets/coordenacao.png" alt="Coordenadores">
            <div class="text">Coordenador</div>
          </li>
        </router-link>

        <router-link to="/alunos" v-if="userType == 'admin' || userType == 'teacher' || userType == 'coordinator'">
          <li>
            <img src="../assets/students-icon.png" alt="Alunos">
            <div class="text">Alunos</div>
          </li>
        </router-link>

        <!-- <router-link to="#" v-if="userType == 'student' || userType == 'teacher' || userType == 'coordinator'">
          <li>
            <img src="../assets/groups-icon.png" alt="Grupos">
            <div class="text">Grupos</div>
          </li>
        </router-link> -->

        <router-link to="#" v-if="userType == 'admin'">
          <li>
            <img src="../assets/report.png" alt="Relatório">
            <div class="text">Relatório</div>
          </li>
        </router-link>

        <router-link to="/turmas" v-if="userType == 'teacher' || userType == 'coordinator'">
          <li>
            <img class="invert-color-image" src="../assets/aulas.png" alt="Plano Adaptativo">
            <div class="text">Turmas</div>
          </li>
        </router-link>

        <!-- <router-link to="#" v-if="userType == 'teacher' || userType == 'student'">
          <li>
            <img src="../assets/plan-icon.png" alt="Plano Adaptativo">
            <div class="text">Plano Adaptativo</div>
          </li>
        </router-link> -->

        <router-link to="/tarefas" v-if="userType == 'teacher' || userType == 'student'">
          <li>
            <img src="../assets/tasks-icon.png" alt="Tarefas">
            <div class="text">Tarefas</div>
          </li>
        </router-link>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { getUserType } from '@/utils/auth'
import { ref, onMounted } from 'vue'

export default {
  name: 'Sidebar',

  setup() {
    const userType = ref('');

    onMounted(async () => {
      // Se getUserType for assíncrono
      userType.value = await getUserType();
    });

    return {
      userType,
    };
  },
};
</script>

<style>
.sidebar {
  width: 7rem;
  background-color: var(--Azul);
  color: var(--Branco);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  min-height: 100vh;
  overflow: hidden;
}



.sidebar nav ul {
  list-style: none;
  padding: 0;
}

.sidebar nav ul li {
  height: 100%;
  padding: 1.5rem;
  transition: background-color 0.3s;
}

.sidebar ul li img {
    width: 3rem;
}

.sidebar nav ul li a {
  color: var(--Branco);
  text-decoration: none;
  font-weight: bold;
}

.sidebar nav ul li:hover {
  background-color: var(--AzulHover);
}

@media (max-width: 550px) {
  .sidebar {
    width: 4rem;
  }
  .sidebar ul li img {
      width: 2.5rem;
  }
  .sidebar .text{
    display: none;
  }

}
</style>
