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
import Tarefas from './views/tarefas/listar.vue'
import AddTarefas from './views/tarefas/registrar.vue'
import HomeProf from './views/HomeProf.vue'
import HomeAluno from './views/HomeAluno.vue'
import { hasPermission, isAuthenticated } from './utils/auth'
import VisuTarefas from './views/VisuTarefas.vue'
import NotFound from '@/views/erros/NotFound.vue';
import AccessDenied from '@/views/erros/AccessDenied.vue';


// Defina as rotas da aplicação
const routes = [
  {
    path: '/404',
    component: NotFound,
  },
  {
    path: '/403',
    component: AccessDenied,
  },

  { 
    path: '/visualizarTarefas', 
    component: VisuTarefas,
    meta: { requiresAuth: true, requiredUserType: 'student' }
  },

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
  { path: '/Tarefas/editar/:id', component: AddTarefas, meta: { requiresAuth: true, requiredUserType: 'teacher' } },
  { path: '/AddTarefas', component: AddTarefas, meta: { requiresAuth: true, requiredUserType: 'teacher' } },

  {
    path: '/:catchAll(.*)', // Rota curinga para capturar todas as rotas inválidas
    redirect: '/404',
  },
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
              next("/403");
          } else {
              // Está autenticado, prossiga
              next();
          }
      }
  } else {
    if (to.matched.length === 0) {
      app.showErrorPage = true;
      app.errorType = '404'; // Mostra a página 404
      next(false); // Cancela a navegação
    } else {
      next(); // Prossegue normalmente
    }
  }
});


// Crie a aplicação e monte-a com o router
const app = createApp(App)
app.use(router)
app.mount('#app')