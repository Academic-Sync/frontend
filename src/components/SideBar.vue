<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <a href="#"><li><img src="../assets/students-icon.png" alt="Alunos"> Alunos</li></a>
        <a href="#"><li><img src="../assets/groups-icon.png" alt="Grupos"> Grupos</li></a>
        <a href="#"><li><img src="../assets/report.png" alt="Relatório"> Relatório</li></a>
        <a href="#"><li><img src="../assets/plan-icon.png" alt="Plano Adaptativo"> Plano Adaptativo</li></a>
        <a href="#"><li><img src="../assets/tasks-icon.png" alt="Tarefas"> Tarefas</li></a>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style>
.sidebar {
  width: 5rem;
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
}
</style>
