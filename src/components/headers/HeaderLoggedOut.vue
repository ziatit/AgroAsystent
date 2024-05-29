<!-- src/components/headers/HeaderLoggedOut.vue -->
<template>
    <header class="header">
        <h1 class="header__title">Agroasystent</h1>
        <nav class="header__nav">
            <router-link class="header_nav a" to="/">Login</router-link>
            <router-link class="header_nav b" to="/aboutUs">About Us</router-link>
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

.header__nav {
    display: flex;
    margin: 0;
    justify-content: flex-start;
}

.header__nav a {
    color: rgb(99, 93, 93);
    text-decoration: none;
    margin-right: 20px;
}

.header__nav b {
    color: rgb(99, 93, 93);
    text-decoration: none;

}
</style>