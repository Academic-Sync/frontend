<template>
        <div class="Form">
            <div class="mb-3 text-start">
                <label class="form-label">Coordenador:</label>
                <input type="name" name="Coordenador" class="form-control" id="Coordenador" placeholder="Coordenador">
            </div>

            <div class="mb-3 text-start">
                <label class="form-label">Nome do curso:</label>
                <input type="name" name="Nome do curso" class="form-control" id="Nome do curso" placeholder="Nome do curso">
            </div>

            <div class="mb-3 text-start">
                <label class="form-label">Periodo:</label>
                <input type="name" name="Periodo" class="form-control" id="Periodo" placeholder="Periodo">
            </div>

            <div class="mb-3 text-start">
                <label class="form-label">Tipo de trabalho final:</label>
                <input type="name" name="TTF" class="form-control" id="TTF" placeholder="Tipo de trabalho final">
            </div>

            <label class="form-label">Curso anual ou bimestral:</label>
            <form>
                <label class="custom-radio">
                    <input type="radio" name="opcao" value="1">
                    <span class="radio-btn"></span>
                    Bimestral
                </label>
                <br>
                <label class="custom-radio">
                    <input type="radio" name="opcao" value="2">
                    <span class="radio-btn"></span>
                    Anual
                </label>
                <br>
            </form>
        </div>
</template>

<script>
export default {
  props: {
    text1: {
      type: String,
      required: true
    },
    subtext: {
      type: String,
      required: true
    },
    tipo: {
      type: String,
      required: true
    },
    text2: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.Form{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 70%;
    background-color: #fff;
    border-radius: 1rem;    
    padding: 2rem;
    font-size: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

}
.Form label{
    font-size: 2rem;
    
}
.Form input{
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: start;
    border: none;
    border-radius: 1rem;
    font-size: 1.7rem;
    padding: 1rem;
    margin-bottom: 2rem;
}

form {
    margin: 20px;
}

</style>