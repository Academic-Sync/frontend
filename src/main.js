import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

createApp(App).mount('#app')

// Importe os componentes das páginas
import Acessibilidade from './views/Acessibilidade.vue'
import Login from './views/Login.vue'
import HomeCoord from './views/HomeCoord.vue'
import Turmas from './views/Turmas.vue'
import AddTurmas from './views/AddTurmas.vue'
import Cursos from './views/Cursos.vue'
import AddCursos from './views/AddCursos.vue'
import Alunos from './views/Alunos.vue'
import AddAlunos from './views/AddAlunos.vue'
import Tarefas from './views/Tarefas.vue'
import AddTarefas from './views/AddTarefas.vue'

// Defina as rotas da aplicação
const routes = [
  { path: '/', component: HomeCoord },
  { path: '/Acessibilidade', component: Acessibilidade },
  { path: '/Login', component: Login },
  { path: '/Turmas', component: Turmas },
  { path: '/AddTurmas', component: AddTurmas },
  { path: '/Cursos', component: Cursos },
  { path: '/AddCursos', component: AddCursos },
  { path: '/Alunos', component: Alunos },
  { path: '/AddAlunos', component: AddAlunos },
  { path: '/Tarefas', component: Tarefas },
  { path: '/AddTarefas', component: AddTarefas },
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