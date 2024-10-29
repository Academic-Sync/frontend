<template>
    <div class="accessibility-bar">
        <button @click="increaseFont">A+</button>
        <button @click="decreaseFont">A-</button>
        <button @click="toggleContrast">
            {{ isHighContrast ? "Desativar Contraste" : "Ativar Contraste" }}
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fontSize: 16, // Tamanho padrão da fonte
            isHighContrast: false // Controle de alto contraste
        };
    },
    methods: {
        increaseFont() {
            this.fontSize += 2;
            document.documentElement.style.fontSize = `${this.fontSize}px`;
        },
        decreaseFont() {
            if (this.fontSize > 10) { // Limite mínimo
                this.fontSize -= 2;
                document.documentElement.style.fontSize = `${this.fontSize}px`;
            }
        },
        toggleContrast() {
            this.isHighContrast = !this.isHighContrast;
            document.body.classList.toggle("high-contrast", this.isHighContrast);
        }
    }
};
</script>

<style>
/* Estilos da barra de acessibilidade */
.accessibility-bar {
    display: flex;
    gap: 10px;
    padding: 10px;
    background-color: #f1f1f1;
}

/* Estilos de alto contraste */
.high-contrast {
    background-color: #000;
    color: #fff;
}

.high-contrast a {
    color: #ff0;
}

.high-contrast .footer-column ul li {
    color: #ff0; /* Exemplo de link em alto contraste */
}

/* Adapte outros elementos conforme necessário */
</style>
