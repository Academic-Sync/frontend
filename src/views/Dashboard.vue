<template>
    <article>
        <TheNavbar></TheNavbar>
        <div class="layout">
            <main class="content">
                <div class="dashboard">
                    <div class="breadcrumb">
                        <Breadcrumb :items="breadcrumbItems" />
                    </div>

                    <Message />
                    <div class="box usuarios" @click="dashboardUser" style="cursor: pointer;">
                        <span v-if="!isLoadingDatas">
                            <h2>Número de Usuários</h2>
                            <p>{{ dashboardDatas.usersCount }}</p>
                        </span>
                        <div v-else>
                            <SpinnerScreen/>
                        </div>
                    </div>
                    <div class="box trabalhos">
                        <span v-if="!isLoadingDatas">
                            <h2>Número de Trabalhos</h2>
                            <p>{{ dashboardDatas.activitiesCount }}</p>
                        </span>
                        <div v-else>
                            <SpinnerScreen/>
                        </div>
                    </div>
                    <div class="box cursos">
                        <span v-if="!isLoadingDatas">
                            <h2>Número de Cursos</h2>
                            <p>{{ dashboardDatas.coursesCount }}</p>
                        </span>
                        <div v-else>
                            <SpinnerScreen/>
                        </div>
                    </div>
                    <div class="box turmas">
                        <span v-if="!isLoadingDatas">
                            <h2>Número de Turmas</h2>
                            <p>{{ dashboardDatas.classesCount }}</p>
                        </span>
                        <div v-else>
                            <SpinnerScreen/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </article>
    <TheFooter></TheFooter>
  </template>
  
<script>
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import { ref, onMounted } from 'vue'
import eventBus from '@/eventBus'
import Message from '@/components/Message.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import SpinnerScreen from '@/components/SpinnerScreen.vue'
  
export default {
    name: 'HomeAdmin',
    components: {
        TheNavbar,
        TheFooter,
        Message,
        Breadcrumb,
        SpinnerScreen,
    },

    methods: {
        dashboardUser(){
            this.$router.push("/DashboardUsuarios")
        }
    },

    data() {
        return {
        breadcrumbItems: [
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/Dashboard" },
        ],
    }
  },    

    setup() {
        const isLoadingDatas = ref(true)
        const dashboardDatas = ref({})

        const fetchData = async () => {
            try {
            // eslint-disable-next-line
            const url = process.env.VUE_APP_API_URL;

            const [response] = await Promise.all([
                fetch(`${url}/dashboard`, {
                method: 'GET',
                headers: {
                        'Content-Type': 'application/json'
                    }
                }),
            ]);

            const dashboardData = await response.json();

            // Verificando se todas as respostas foram bem-sucedidas
            if (!response.ok) throw new Error(dashboardData.error);

            dashboardDatas.value =  dashboardData;
            

            } catch (error) {
                console.error("Erro ao buscar dados:", error); // Log do erro
                const errorObject = {
                    title: "Erro ao listar: ",
                    text: error.message
                };
                eventBus.emit("error", errorObject);
            } finally{
                isLoadingDatas.value = false
            }
        };

        onMounted(() => {
            fetchData()
        })

        return {
            isLoadingDatas, dashboardDatas
        }
    }
}
</script>
  
<style scoped>
  @import '/src/assets/style/cores.css';
    /* Container principal do dashboard */
    .dashboard {
        display: flex;
        justify-content: space-between;
        gap: 30px;
        border-radius: 10px;
        width: 100%;
        margin: 0 auto;
        flex-wrap: wrap;
        padding: 0 100px;
    }
    .breadcrumb{
        width: 100%;
    }
    .content{
        min-height: 90vh;
    }

    .fas{
        width: 10px;
    }

    /* Estilos das caixas de informações */
    .box {
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        transition: transform 0.3s;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: calc(50% - 30px);
        height: 300px;
    }

    .box h2 {
        font-size: 2rem;
        margin-bottom: 10px;
        color: #333;
        text-align: center!important;
    }

    .box p {
        font-size: 1.5rem;
        color: #666;
    }

    /* Estilos para cada categoria */
    .usuarios {
        color: white;
    }

    .trabalhos {
        color: white;
    }

    .cursos {
        color: white;
    }

    .turmas {
        color: white;
    }

    /* Responsividade */
    @media (max-width: 768px) {
        .dashboard {
            padding: 0 0px;
            gap: 1;
        }
        .box{
            width: 100%;
        }
    }
</style>
  