<template>
        <div class="AddButton">
            <a :href="href"><button>{{ButtonText}}</button></a>
        </div>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true
    },
    ButtonText: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

.AddButton{
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.AddButton Button {
    background-color: var(--Azul);
    color: var(--Branco);
    padding: 1.5rem 2rem;
    border: none;
    border-radius: 3rem;
    cursor: pointer;
    font-size: 2rem;
    transition: background-color 0.3s;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.233);
}

.AddButton button:hover {
    background-color: var(--AzulHover);
}

</style>
