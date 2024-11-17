import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

createApp(App).mount('#app')

// Importe os componentes das páginas
import Acessibilidade from './views/Acessibilidade.vue'
import Login from './views/Login.vue'
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
import AddOrientador from './views/orientadores/registrar.vue'
import Orientadores from './views/orientadores/listar.vue'
import Coordenadores from './views/coordenadores/listar.vue'
import AddCoordenador from './views/coordenadores/registrar.vue'
import Tarefas from './views/Tarefas.vue'
import AddTarefas from './views/AddTarefas.vue'
import HomeProf from './views/HomeProf.vue'
import HomeAluno from './views/HomeAluno.vue'
import { hasPermission, isAuthenticated, getUserType } from './utils/auth'


// Defina as rotas da aplicação
const routes = [
  { path: '/Coordenador',
    component: HomeCoord, 
    meta: { requiresAuth: true, requiredUserType: 'coordinator' }
  },
  { path: '/Professor',
    component: HomeProf, 
    meta: { requiresAuth: true, requiredUserType: 'teacher' }
  },
  { 
    path: '/Admin', 
    component: HomeAdmin, 
    meta: { requiresAuth: true, requiredUserType: 'admin' } 
  },
  { 
    path: '/Aluno', 
    component: HomeAluno, 
    meta: { requiresAuth: true } 
  },

  { path: '/',
    component: HomeCoord, 
    meta: { requiresAuth: true }
  },

  { path: '/Acessibilidade', component: Acessibilidade }, { path: '/Login', component: Login },

  // TURMAS
  { path: '/Turmas',
    component: Turmas, 
    meta: { requiresAuth: true, requiredUserType: ['teacher', 'coordinator', 'advisor'] }
  },
  { path: '/Turmas/editar/:id',
    component: AddTurmas, 
    meta: { requiresAuth: true, requiredUserType: ['teacher', 'coordinator', 'advisor'] }
  },
  { path: '/AddTurmas',
    component: AddTurmas,
    meta: { requiresAuth: true, requiredUserType: ['teacher', 'coordinator', 'advisor'] }
  },

  // CURSOS
  { path: '/Cursos',
    component: Cursos, 
    meta: { requiresAuth: true,  requiredUserType: ['teacher', 'coordinator', 'advisor']  }
  },
  { path: '/Cursos/editar/:id',
    component: AddCursos,
    meta: { requiresAuth: true, requiredUserType: ['teacher', 'coordinator', 'advisor'] }
  },
  { path: '/AddCursos',
    component: AddCursos, 
    meta: { requiresAuth: true, requiredUserType: 'coordinator' }
  },

  {
    path: '/Alunos',
    component: Alunos,
    meta: { requiresAuth: true, requiredUserType: ['teacher', 'coordinator', 'advisor'] }
  },
  {
    path: '/Alunos/editar/:id',
    component: AddAlunos,
    meta: { requiresAuth: true, requiredUserType: ['teacher', 'coordinator', 'advisor'] }
  },
  {
    path: '/AddAlunos',
    component: AddAlunos,
    meta: { requiresAuth: true, requiredUserType: ['teacher', 'coordinator', 'advisor'] }
  },

  { path: '/Usuarios', component: HomeAdmin, meta: { requiresAuth: true, requiredUserType: 'admin' } },

  { path: '/Professores', component: Professores, meta: { requiresAuth: true, requiredUserType: 'admin' } },
  { path: '/Professores/editar/:id', component: AddProfessor, meta: { requiresAuth: true, requiredUserType: 'admin' } },
  { path: '/AddProfessores', component: AddProfessor, meta: { requiresAuth: true, requiredUserType: 'admin' } },

  { path: '/Orientadores', component: Orientadores, meta: { requiresAuth: true, requiredUserType: 'admin' } },
  { path: '/Orientadores/editar/:id', component: AddOrientador, meta: { requiresAuth: true, requiredUserType: 'admin' } },
  { path: '/AddOrientadores', component: AddOrientador, meta: { requiresAuth: true, requiredUserType: 'admin' } },

  { path: '/Coordenadores', component: Coordenadores, meta: { requiresAuth: true, requiredUserType: 'admin' } },
  { path: '/Coordenadores/editar/:id', component: AddCoordenador, meta: { requiresAuth: true, requiredUserType: 'admin' } },
  { path: '/AddCoordenadores', component: AddCoordenador, meta: { requiresAuth: true, requiredUserType: 'admin' } },

  { path: '/Tarefas', component: Tarefas, meta: { requiresAuth: true } },
  { path: '/AddTarefas', component: AddTarefas, meta: { requiresAuth: true, requiredUserType: 'teacher' } },
]

// Crie o router e defina o modo de histórico
const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      // Esta rota requer autenticação, verifique se o usuário está autenticado
      if (!isAuthenticated()) {
          // Não está autenticado, redirecione para a página de login
          next({ path: '/Login' });
      } else {
          if (to.meta.requiredUserType && !hasPermission(to.meta.requiredUserType)) {
              // Verifique se o tipo de usuário tem permissão para acessar a rota
              next({ path: '/' }); // Redireciona para a página inicial ou uma página de acesso negado
          } else {
              // Está autenticado, prossiga
              next();
          }
      }
  } else {
      // Verifique se o usuário está autenticado e redirecione para a página correspondente
      const userType = getUserType();
      
      if (isAuthenticated() && userType) {
          switch (userType) {
              case 'admin':
                  next({ path: '/Admin' });
                  break;
              case 'student':
                  next({ path: '/Tarefas' });
                  break;
              case 'teacher':
                  next({ path: '/Professor' });
                  break;
              case 'coordinator':
                  next({ path: '/Coordenador' });
                  break;
              case 'advisor':
                  next({ path: '/Professor' });
                  break;
              default:
                  next(); // Se o tipo de usuário não corresponder a nenhuma condição, prossiga normalmente
                  break;
          }
      } else {
          next(); // Se não estiver autenticado, prossiga para a página inicial
      }
  }
});


// Crie a aplicação e monte-a com o router
const app = createApp(App)
app.use(router)
app.mount('#app')