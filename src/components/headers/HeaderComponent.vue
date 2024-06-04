<!-- src/components/headers/HeaderComponent.vue -->
<script setup>
import { useAuthStore } from '../../store/useAuthStore.js';
const authStore = useAuthStore();
</script>

<template>
    <header class="header">
        <h1 class="header__title">Agroasystent</h1>
        <nav class="header__nav">
            <div class="header_nav a" :class="{ 'no-link': $route.path === '/' }" v-if="!authStore.data">
                You are not logged in
                <router-link v-if="$route.path !== '/'" to="/">- Go to Login</router-link>
            </div>
            <div class="header_nav a" v-else>
                Logged in as: {{ authStore.data.session.user.user_metadata.email }} | 
                <button @click="authStore.signOut">Logout</button>
            </div>
            <router-link class="header_nav b" to="/aboutUs">About Us</router-link>
            <!-- Add this line -->
            <router-link class="header_nav b" to="/userScreen" style="margin-left: auto;">Home</router-link>
        </nav>
    </header>
</template>

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

button {
    background: none;
    border: none;
    padding: 0 10px 0 0;
    color: #007BFF;
    font: inherit;
    cursor: pointer;
}

.header .no-link {
    padding-right: 10px;
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