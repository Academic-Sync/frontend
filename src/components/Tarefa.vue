<template>
    <div class="tarefa" @click="redirectToLink">
        <div class="tarefa-left">
        <div class="tarefa-img">
            <img :src="image" :alt="alt_img">
        </div>
        <div class="tarefa-info">
            <h3>{{Nome}}</h3>
            <p>{{Entrega}}</p>
        </div>
        </div>
        <div class="tarefa-nota">
            {{Nota}}
        </div>
    </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    alt_img: {
      type: String,
      required: true
    },
    Nome: {
      type: String,
      required: true
    },
    Entrega: {
      type: String,
      required: true
    },
    Nota: {
      type: String,
      required: true
    },
    link: {
        type: String,
        require: false,
    }
  },

    methods: {
        redirectToLink() {
            if (this.link) {
                window.location.href = this.link;
            }
        }
    }
}
</script>

<style>

.tarefa {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    padding: 2rem;
    border-radius: 2rem;
    margin-bottom: 2rem;
    text-align: left;
    background-color: var(--Branco);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
}

.tarefa:last-child {
    border-bottom: none;
}

.tarefa:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.tarefa-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.tarefa-info h3 {
    font-size: 2rem;
    font-weight:500;
}

.tarefa-info p {
    font-size: 1.5rem;
    color: var(--Cinza);
    margin: 0;
}

.tarefa-left{
    display: flex;
}

.tarefa-nota {
    font-size: 1.5rem;
    font-weight:500;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
}

.tarefa-img img {
    display: flex;
    align-items: center;
    width: 5rem;
    height: auto;
    margin-right: 1rem;
}


@media (max-width: 750px) {
    .tarefa{
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        flex-direction: column;
    }
    .tarefa-left {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
    }
    .tarefa-img img {
        width: 0rem;

    }
}

</style>