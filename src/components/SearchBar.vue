<template>
    <div class="search-bar">
        <input v-model="textSearch" @keyup="handleKeyup" type="text" placeholder="Buscar">
        <button><img src="../assets/search.png" alt="Buscar"></button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            textSearch: ""
        }
    },
    
    methods: {
      handleKeyup(event) {
        this.$emit('key-up', event); // Emite o evento com o objeto de evento `keyup`
      }
    }
  }
</script>

<style>
.search-bar {
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    border-radius: 10rem;
    overflow: hidden;
}

.search-bar input {
    width: 90%;
    padding: 1rem 2rem;
    border: none;
    outline: none;
    font-size: 1.5rem;
}

.search-bar button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10%;
    padding: 1rem;
    background-color: #ccc;
    border: none;
    border-left: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    transition: background-color 0.3s;
}
.search-bar img {
    width: 2.5rem;
}

.search-bar button:hover{
    background-color: var(--Cinza);
}

@media (max-width: 550px) {
    .search-bar button {
    width: 15%;
    }

    .search-bar img {
    width: 2rem;
}
}
</style>