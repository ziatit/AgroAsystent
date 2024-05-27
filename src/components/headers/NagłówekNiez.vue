<template>
    <header class="header">
        <h1 class="header__title">Agroasystent</h1>
        <nav>
            <router-link to="/aboutUs">About Us</router-link>
        </nav>
    </header>
</template>

<script>

</script>

<style scoped>
.header {
    background-color: rgb(33, 168, 33);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%; 
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999; 
}

.header__title {
    font-size: 24px;
    margin: 10;
}
</style>