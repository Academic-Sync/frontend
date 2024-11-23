<template>
    <div class="file-component">
      <img src="@/assets/tasks-icon.png" alt="Ícone de arquivo" class="file-icon" style="filter: invert(100%);	" />
      <span class="file-name">Arquivo de video.mp4</span>
    </div>
  </template>
  
<script>

</script>
<style scoped>
.file-component {
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  width: 100%;
  height: 6rem; 
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.233);
}

.file-icon {
  width: 40px; /* Ajustar o tamanho do ícone */
  height: 40px;
  margin-right: 10px;
}

.file-name {
    font-size: 1.5rem;

}
</style>
