<template>
    <header class="header">
        <h1 class="header__title">{{ title }}</h1>
        <nav class="header__nav">
            <!-- Dodaj tutaj linki do innych sekcji aplikacji -->
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Nagłówek',
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.header {
    background-color: rgb(33, 168, 33);
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; 
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999; 
}

.header__title {
    font-size: 24px;
    margin: 0;
}

.header__nav {
    display: flex;
}

.header__nav a {
    margin-right: 10px;
    text-decoration: none;
    color: #333;
}
</style>
