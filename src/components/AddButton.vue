<template>
    <div class="AddButton">
        <span v-if="href">
          <a :href="href"><button>{{ButtonText}}</button></a>
        </span>
        <span v-else>
          <button :type="type" :disabled="isLoading">
            <span v-if="isLoading" class="spinner"></span>
            <span v-else>{{ ButtonText }}</span>
          </button>
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
    },
    isLoading: {
      type: Boolean,
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

.AddButton button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
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

.spinner {
  width: 16px;
  height: 16px;
  border: 3px solid white;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  display: block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
