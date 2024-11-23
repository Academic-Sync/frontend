<template>
  <div>
    <label for="actual-btn">
      <div id="drop_zone" @drop="dropHandler" @dragover="dragOverHandler">
        <p>Arraste um ou mais arquivos para esta <i>área de soltar</i> ou clique em "Escolher Arquivo"</p>
        
        <!-- Botão customizado -->
        <label for="actual-btn" class="custom-file-upload">Escolher Arquivo</label>
        <input multiple type="file" name="files[]" id="actual-btn" @change="fileSelected" hidden />
      </div>
    </label>

    <!-- Exibir os arquivos selecionados como cards -->
    <div v-if="files.length > 0" class="files-container">
      <div v-for="(file, index) in files" :key="index" class="file-card">
        <div class="file-component">
          <div class="div-text-atividade">
            <img src="@/assets/tasks-icon.png" alt="Ícone de arquivo" class="file-icon" style="filter: invert(100%);	" />
            <span class="file-name">{{file.name}}</span>
          </div>
          <div class="div-button-atividade">
            <button @click="removeFile(index)" class="remove-btn">Remover</button>
          </div>
        </div>

        <!-- <p class="file-name">{{ file.name }}</p>
        <button @click="removeFile(index)" class="remove-btn">Remover</button> -->
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      files: [], // Lista de arquivos selecionados
      fileName: '', // Nome do arquivo para exibição
    };
  },
  methods: {
    updateInputFiles() {
      // Cria um objeto DataTransfer para simular um novo "input[type='file']"
      const dataTransfer = new DataTransfer();

      // Adiciona todos os arquivos do array `files` ao DataTransfer
      this.files.forEach(file => dataTransfer.items.add(file));

      // Atualiza o campo de entrada com os arquivos do DataTransfer
      const input = document.getElementById("actual-btn");
      if (input) {
        input.files = dataTransfer.files;
      }
    },

    fileSelected(event) {
      const newFiles = Array.from(event.target.files); // Converte os arquivos selecionados em um array
      this.files = [...this.files, ...newFiles]; // Adiciona os novos arquivos à lista existente
      this.updateInputFiles(); // Atualiza o conteúdo do campo de entrada
      this.$emit("updateFiles", this.files);
    },

    removeFile(index) {
      this.files.splice(index, 1); // Remove o arquivo da lista pelo índice
      this.updateInputFiles(); // Atualiza o conteúdo do campo de entrada
      this.$emit("updateFiles", this.files);
    },

    addFile(file) {
      if (!this.files.some(existingFile => existingFile.name === file.name)) {
        this.files.push(file); // Adiciona o arquivo à lista
        this.updateInputFiles(); // Atualiza o conteúdo do campo de entrada
        this.$emit("updateFiles", this.files);
      }
    },
  }
};
</script>

<style>
label {
  cursor: pointer;
}

.div-buttons-file{
  display: flex;
  align-items: center;
  gap: 10px;
}

.div-text-atividade{
  flex: 1;
  display: flex;
  justify-content: start;
  align-items: center;
}

.div-button-atividade{
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 10px;
}

#drop_zone {
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: #333 0.2rem dashed;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 2rem;
}

.custom-file-upload {
  display: inline-block;
  padding: 1rem 2rem;
  margin-top: 1rem;
  background-color: #ccc;
  color: #333;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;
}

input[type="file"] {
  display: none;
}

#file-chosen {
  font-size: 1.5rem;
  margin-top: 1rem;
}

/* Estilo para os cards dos arquivos */
.files-container {
  /* margin-top: 2rem; */
}

.file-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0 1rem;
  background-color: #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.file-name {
  max-width: 600px; /* Limita o tamanho do texto */
  overflow: hidden;
  white-space: nowrap; /* Não quebra linha */
  text-overflow: ellipsis; /* Adiciona '...' caso o texto ultrapasse */
  font-size: 1.5rem;
  margin: 0;
}


.remove-btn {
  background-color: #ff5c5c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;
}

.remove-btn:hover {
  background-color: #ff3d3d;
}
</style>
