<template>

<div class="action-buttons">
    <a :href="href">
      <div class="card">
        <img :src="image" :alt="alt_image">
        <h3>{{ Titulo }}</h3>
        <p>{{ text }}</p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    alt_image: {
      type: String,
      required: true
    },
    Titulo: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
@import '../assets/style/cores.css';



.card {
    background: var(--Branco);
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    width: 100%; 
    height: auto;
    max-width: 28rem;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
}

.action-buttons .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.card img {
    width: 100%;
    height: auto;
    max-width: 8rem; 
    margin-bottom: 1rem;
}

.card h3 {
    font-size: 2rem; 
    margin-bottom: 1rem;
}

.card p {
    font-size: 1.4rem; 
    color: var(--Cinza);
}
</style>