<template>
   <div class="div-spinner">
    <span class="spinner-screen"></span>
   </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
div.div-spinner{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.spinner-screen {
  width: 36px;
  height: 36px;
  border: 3px solid #000;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  display: block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
