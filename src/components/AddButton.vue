<template>
    <div class="AddButton">
        <span v-if="href">
          <a :href="href"><button>{{ButtonText}}</button></a>
        </span>
        <span v-else>
          <button :type="type">{{ButtonText}}</button>
        </span>
    </div>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: false
    },
    ButtonText: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false
    }
  }
}
</script>

<style>

.AddButton{
  display: flex;
  justify-content: flex-end;
  /* width: 100%; */
}

.AddButton Button {
    background-color: var(--Azul);
    color: var(--Branco);
    padding: 1.5rem 2rem;
    border: none;
    border-radius: 3rem;
    font-size: 2rem;
    cursor: pointer;
    transition: background-color 0.3s;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.233);
}

.AddButton button:hover {
    background-color: var(--AzulHover);
}

@media (max-width: 550px) {
  .AddButton Button {
    font-size: 1.5rem;
    padding: 1.2rem 1.5rem;

}
}

</style>
