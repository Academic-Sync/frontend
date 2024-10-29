<template>
    <div class="removeButton">
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

.removeButton{
  display: flex;
  justify-content: flex-end;
}

.removeButton Button {
    background-color: var(--Vermelho);
    color: var(--Branco);
    padding: 1.5rem 2rem;
    border: none;
    border-radius: 3rem;
    cursor: pointer;
    font-size: 2rem;
    transition: background-color 0.3s;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.233);
}

.removeButton button:hover {
    background-color: var(--VermelhoHover);
}

</style>
