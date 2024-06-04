<!-- src/views/UserScreen.vue -->
<script setup>
import GardenForm from '../components/GardenForm.vue';
import { ref, computed } from 'vue';
import { useAuthStore } from '../store/useAuthStore';

const userStore = useAuthStore();
const showCreate = ref(false);

const username = computed(() => userStore.getLoggedInUser);
function showcreateForm() {
    showCreate.value = true;
};

function hideForm() {
    showCreate.value = false;
};
</script>

<template>
    <h2 class="greeting">Hello, {{ username }}</h2>
    <router-link to="/GardensPage" class="garden-link">Twoje Ogrody</router-link>
    <div class="task-list">
        <button class="create" @click="showcreateForm">Dodaj Ogród</button>
        <GardenForm v-if="showCreate" class="overlay" @formSubmitted="hideForm" />
        <p class="calendar"> Kalendarz</p>
    </div>
</template>

<style scoped>
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    color: #333;
}

.container {
    display: flex;
    margin-left: 130px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
}

.greeting {
    text-align: center;
}

.overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    border-radius: 10px;
}

.calendar {
    color: #333;
}

.content {
    flex: 2;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.spacer {
    flex: 1;
}

.garden-link {
    display: inline-block;
    padding: 10px 20px;
    margin-bottom: 20px;
    background-color: #008000;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
}

.task-list {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.task-list p {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
}
</style>
