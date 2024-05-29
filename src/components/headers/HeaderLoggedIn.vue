<!-- src/components/headers/HeaderLoggedIn.vue -->
<template>
    <header class="header">
        <h1 class="header__title">{{ title }}</h1>
        <nav class="header__nav">
            <router-link class="header_nav a" :to="{ name: 'MainPage' }">Logout</router-link>
        </nav>
    </header>
</template>


<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
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
    margin-right: 10px;
    text-decoration: none;
    color: #333;
    margin-left: 0;
    ;
}
</style>
