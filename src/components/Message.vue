<template>
  <div
    v-if="errorMessage"
    class="alert alert-danger alert-dismissible"
    role="alert"
  >
    <strong>{{ errorMessage.title }}</strong>
    <span>{{ errorMessage.text }}</span>
  </div>

  <div
    v-if="successMessage"
    class="alert alert-success alert-dismissible"
    role="alert"
  >
    <strong>{{ successMessage.title }}</strong>
    <span>{{ successMessage.text }}</span>
  </div>
</template>

<script>
import eventBus from '../eventBus'; // Ajuste o caminho conforme necessário

export default {
  data() {
    return {
      errorMessage: null,
      successMessage: null,
    };
  },
  mounted() {
    // Escuta os eventos de erro e sucesso
    eventBus.on("error", (msg) => {
      console.error(msg);
      this.errorMessage = msg;
    });
    eventBus.on("success", (msg) => {
      this.successMessage = msg;
    });
  },
  beforeUnmount() {
    // Limpa os ouvintes de eventos ao desmontar o componente
    eventBus.off("error");
    eventBus.off("success");
  },
};
</script>


<style scoped>
  .alert{
      font-size: 1.5rem;
      width: 100%;
      position: relative;
      padding: .75rem 1.25rem;
      margin-bottom: 1rem;
      border: 1px solid transparent;
      border-radius: .25rem;
      text-align: left
  }

  .alert-danger{
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
  }

  .alert-success {
      color: #155724;
      background-color: #d4edda;
      border-color: #c3e6cb;
  }

  .d-flex{
      display: flex;
  }
</style>