import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

createApp(App).mount('#app')

// Importe os componentes das páginas
import HomeCoord from './views/HomeCoord.vue'
import Turmas from './views/Turmas.vue'
import AddTurmas from './views/AddTurmas.vue'
import Cursos from './views/cursos/listar.vue'
import AddCursos from './views/cursos/registrar.vue'
import Alunos from './views/alunos/listar.vue'
import AddAlunos from './views/alunos/registrar.vue'


// Defina as rotas da aplicação
const routes = [
  { path: '/', component: HomeCoord },
  { path: '/Turmas', component: Turmas },
  { path: '/AddTurmas', component: AddTurmas },

  { path: '/Cursos', component: Cursos },
  { path: '/Cursos/editar/:id', component: AddCursos },
  { path: '/AddCursos', component: AddCursos },

  { path: '/Alunos', component: Alunos },
  { path: '/Alunos/editar/:id', component: AddAlunos },
  { path: '/AddAlunos', component: AddAlunos },
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