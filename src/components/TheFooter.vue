<template>
    <footer>
        <div class="footer-container">
            <div class="footer-column">
                <h4>ACADEMIC SYNC</h4>
                <ul>
                    <li>Academic Sync é uma plataforma gerenciadora de trabalhos de graduação...</li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>MAPA DO SITE</h4>
                <ul>
                    <li><a href="#">Xxxxxxx</a></li>
                    <li><a href="#">Xxxxxxx</a></li>
                    <li><a href="#">Xxxxxxx</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>CONTATO</h4>
                <ul>
                    <li>(11) 2058-4585</li>
                    <li>academicsync@gmail.com</li>
                    <li>Rua Xxxx Xxxx, 787</li>
                </ul>
            </div>
            <div class="footer-column">
                <h4>PRECISA DE SUPORTE?</h4>
                <ul>
                    <li><a href="#">Chat online</a></li>
                    <li><a href="#">E-mail</a></li>
                    <li><a href="#">Fale conosco</a></li>
                    <li><a href="#">Fóruns</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; AcademicSync 2024 | Todos os direitos reservados
        </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style>
footer {
    position: relative;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background-color: var(--Branco);
    padding: 2rem 0;
    width: 100%;
    margin-top: auto;
}

.footer-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    text-align: left;
}

.footer-column {
    flex: 1;
    padding: 0 1rem;
}

.footer-column h4 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
}

.footer-column ul {
    list-style: none;
}

.footer-column ul li {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--Cinza);
}

.footer-column ul li a {
    color: var(--Cinza);

    text-decoration: none;
    transition: color 0.3s;
}

.footer-column ul li a:hover {
    color: var(--Cinza);
}

.footer-bottom {
    font-size: 1.2rem;
    text-align: center;
    margin-top: 2rem;
    color: var(--Cinza);
}

@media (max-width: 768px) {
    .footer-container {
        flex-direction: column;
        text-align: center;
    }

    .footer-column {
        padding: 1rem 0;
    }

    .footer-column h4 {
    font-size: 1.5rem;
}
    .footer-column ul li {
        font-size: 1.3rem;
    }

    footer {
        padding: 2rem 1rem;
    }
}
</style>