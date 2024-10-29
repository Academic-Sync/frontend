<template>
    <div
      v-if="errorMessage"
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      <strong>{{ errorMessage.title }}</strong>
      <span>{{ errorMessage.text }}</span>
    </div>

    <div
      v-if="successMessage"
      class="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      <strong>{{ successMessage.title }}</strong>
      <span>{{ successMessage.text }}</span>
    </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: null,
      successMessage: null,
    };
  },
  methods: {
    showError(title, text) {
      this.errorMessage = { title, text };
    },
    showSuccess(text) {
      this.successMessage = { title: "Sucesso!", text };
    },
  },
  mounted() {
    const error = sessionStorage.getItem("error");
    const success = sessionStorage.getItem("success");

    if (error) {
      const parsedError = JSON.parse(error);
      this.showError(parsedError.title, parsedError.text);
      sessionStorage.removeItem("error");
    }

    if (success) {
      this.showSuccess(success);
      sessionStorage.removeItem("success");
    }
  },
};
</script>

<style scoped>
.alert {
  margin-top: 1rem;
}
</style>
