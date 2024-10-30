<template>
    <div class="user" @click="redirectToLink">
        <div class="user-info">
            <h3>{{text1}}</h3>
            <p>{{subtext}}</p>
        </div>
        <div class="user-ra">
            {{tipo}} {{text2}}
        </div>
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
        required: false
        },
        text2: {
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
.users-list {
    background: var(--Branco);
    border-radius: 1rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    width: 100%;
    height: auto;
    margin-bottom: 2rem;
}

.user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 2rem;
    text-align: left;
    transition: background-color 0.3s;
    cursor: pointer;
}

.user:last-child {
    border-bottom: none;
}

.user:hover {
    background-color: var(--Branco2);
}

.user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.user-info h3 {
    font-size: 2rem;
    font-weight:500;
}

.user-info p {
    font-size: 1.5rem;
    color: var(--Cinza);
    margin: 0;
}

.user-ra {
    font-size: 2.5rem;
    font-weight:500;
    display: flex;
    align-items: center;
}

@media (max-width: 750px) {
    .user{
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        flex-direction: column;
    }
    .user-ra {
    font-size: 2rem;

}
}

</style>