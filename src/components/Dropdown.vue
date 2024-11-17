<template>
    <div id="drop_zone" @drop="dropHandler" @dragover="dragOverHandler">
      <p>Arraste um ou mais arquivos para esta <i>área de soltar</i> ou clique em "Escolher Arquivo"</p>
      
      <!-- Botão customizado -->
      <label for="actual-btn" class="custom-file-upload">Escolher Arquivo</label>
      <input type="file" id="actual-btn" @change="fileSelected" hidden />
      
      <span id="file-chosen">{{ fileName }}</span>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fileName: '',
      };
    },
    methods: {
      dropHandler(event) {
        console.log("Arquivo(s) solto(s)");
        event.preventDefault();
  
        if (event.dataTransfer.items) {
          [...event.dataTransfer.items].forEach((item, i) => {
            if (item.kind === "file") {
              const file = item.getAsFile();
              console.log(`Arquivo [${i}]: ${file.name}`);
              this.fileName = file.name;
            }
          });
        } else {
          [...event.dataTransfer.files].forEach((file, i) => {
            console.log(`Arquivo [${i}]: ${file.name}`);
            this.fileName = file.name;
          });
        }
      },
      dragOverHandler(event) {
        console.log("Arquivo(s) na área de soltar");
        event.preventDefault();
      },
      fileSelected(event) {
        const file = event.target.files[0];
        if (file) {
          this.fileName = file.name;
        }
      },
    },
  };
  </script>
  
  <style>
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
  
  /* Oculta o elemento padrão */
  input[type="file"] {
    display: none;
  }
  
  #file-chosen {
    font-size: 1.5rem;
    margin-top: 1rem;
  }
  </style>
  