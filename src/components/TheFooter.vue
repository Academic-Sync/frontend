<template>
    <footer>
        <div class="footer-container">
            <div class="footer-column">
                <h4>ACADEMIC SYNC</h4>
                <ul>
                    <li>Academic Sync é uma plataforma gerenciadora de trabalhos de graduação...</li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>MAPA DO SITE</h4>
                <ul>
                    <!-- Acessibilidade -->
                    <li><a href="/Acessibilidade">Acessibilidade</a></li>

                    <!-- Páginas Públicas -->
                    <li><a href="/">Página Inicial</a></li>
                    <!-- <li><a href="/Login">Login</a></li> -->

                    <!-- Rotas com Permissão de Acesso para Diversos Usuários -->
                    <li><a href="/Turmas">Turmas</a></li>
                    <li><a href="/Cursos">Cursos</a></li>
                    <li><a href="/Alunos">Alunos</a></li>
                    

                    <!-- Páginas Restritas a Professores -->
                    <div v-if="userType.value == 'teacher'">
                        <li><a href="/Tarefas">Tarefas</a></li>
                    </div>

                    <!-- Páginas Restritas a Administradores -->
                    <div v-if="userType.value == 'admin'">
                        <li><a href="/Admin">Início Administrador</a></li>
                        <li><a href="/Usuarios">Usuários</a></li>
                        <li><a href="/Professores">Professores</a></li>
                        <li><a href="/Professores/editar/:id">Editar Professor</a></li>
                        <li><a href="/AddProfessores">Adicionar Professor</a></li>
                        <li><a href="/Orientadores">Orientadores</a></li>
                        <li><a href="/Orientadores/editar/:id">Editar Orientador</a></li>
                        <li><a href="/AddOrientadores">Adicionar Orientador</a></li>
                        <li><a href="/Coordenadores">Coordenadores</a></li>
                        <li><a href="/Coordenadores/editar/:id">Editar Coordenador</a></li>
                        <li><a href="/AddCoordenadores">Adicionar Coordenador</a></li>
                    </div>
                </ul>
            </div>

            <div class="footer-column">
                <h4>CONTATO</h4>
                <ul>
                    <li>(11) 2058-4585</li>
                    <li>academicsync@gmail.com</li>
                    <li>Av. Águia de Haia, 2983 </li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>PRECISA DE SUPORTE?</h4>
                <ul>
                    <li><a href="#">Chat online</a></li>
                    <li><a href="#">E-mail</a></li>
                    <li><a href="#">Fale conosco</a></li>
                    <li><a href="#">Fóruns</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; AcademicSync 2024 | Todos os direitos reservados
        </div>
    </footer>
</template>

<script>
import { getUserType } from '@/utils/auth';
import { ref, onMounted } from 'vue'

export default {
    setup() {
    const userType = ref("")

    onMounted(() => {
        userType.value = getUserType()
    })


    return {
        userType
    }
  }

}
</script>

<style>
footer {
    position: relative;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background-color: var(--Branco);
    padding: 2rem 0;
    width: 100%;
    margin-top: auto;
}

.footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    text-align: left;
}

.footer-column {
    flex: 1;
    padding: 0 1rem;
}

.footer-column h4 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
}

.footer-column ul {
    list-style: none;
}

.footer-column ul li {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--Cinza);
}

.footer-column ul li a {
    color: var(--Cinza);

    text-decoration: none;
    transition: color 0.3s;
}

.footer-column ul li a:hover {
    color: var(--Cinza);
}

.footer-bottom {
    font-size: 1.2rem;
    text-align: center;
    margin-top: 2rem;
    color: var(--Cinza);
}

@media (max-width: 768px) {
    .footer-container {
        flex-direction: column;
        text-align: center;
    }

    .footer-column {
        padding: 1rem 0;
    }

    .footer-column h4 {
    font-size: 1.5rem;
}
    .footer-column ul li {
        font-size: 1.3rem;
    }

    footer {
        padding: 2rem 1rem;
    }
}
</style>