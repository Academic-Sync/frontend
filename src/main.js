import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

createApp(App).mount('#app')

// Importe os componentes das páginas
import HomeCoord from './views/HomeCoord.vue'
import Turmas from './views/turmas/listar.vue'
import AddTurmas from './views/turmas/registrar.vue'
import Cursos from './views/cursos/listar.vue'
import AddCursos from './views/cursos/registrar.vue'
import Alunos from './views/alunos/listar.vue'
import AddAlunos from './views/alunos/registrar.vue'
import HomeAdmin from './views/HomeAdmin.vue'
import Professores from './views/professores/listar.vue'
import AddProfessor from './views/professores/registrar.vue'


// Defina as rotas da aplicação
const routes = [
  { path: '/', component: HomeCoord },

  { path: '/Turmas', component: Turmas },
  { path: '/Turmas/editar/:id', component: AddTurmas },
  { path: '/AddTurmas', component: AddTurmas },

  { path: '/Cursos', component: Cursos },
  { path: '/Cursos/editar/:id', component: AddCursos },
  { path: '/AddCursos', component: AddCursos },

  { path: '/Alunos', component: Alunos },
  { path: '/Alunos/editar/:id', component: AddAlunos },
  { path: '/AddAlunos', component: AddAlunos },

  { path: '/Admin', component: HomeAdmin },

  { path: '/Professores', component: Professores },
  { path: '/Professores/editar/:id', component: AddProfessor },
  { path: '/AddProfessores', component: AddProfessor },
]

// Crie o router e defina o modo de histórico
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Crie a aplicação e monte-a com o router
const app = createApp(App)
app.use(router)
app.mount('#app')