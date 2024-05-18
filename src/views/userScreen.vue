<template>
    <div class="container">
        <h2 class="greeting">Hello, {{ username }}</h2>
        <div class="content">
        </div> 
    </div>
    <router-link to="/ogrody" class="garden-link">Go to Gardens</router-link>
    <div class="task-list">
        <p> Wstawić kalendarz</p>
        <p> Wstawić zadania</p>
        <button class="create" @click="showcreateForm" >Dodaj Ogród</button>
        <gardenForm v-if="showCreate" class="overlay" @formSubmitted="hideForm" />
    </div>
</template>

<script setup>
import gardenForm from '../components/gardenForm.vue';
import { ref, computed } from 'vue';
import { GET_USERNAME } from "../store/storeconstants";
import { useStore } from 'vuex';

const store = useStore();
const showCreate = ref(false);

const username = computed(() => store.getters[`auth/${GET_USERNAME}`]);
function showcreateForm() {
    showCreate.value = true;
};

function hideForm() {
    showCreate.value = false;
};
</script>

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
    position: fixed; /* Change from absolute to fixed */
    top: 50%; /* Center vertically */
    left: 50%; /* Center horizontally */
    transform: translate(-50%, -50%); /* Adjust for element's own dimensions */
    width: 80%; /* Adjust to desired width */
    height: 80%; /* Adjust to desired height */
    background-color: #fff; /* Change to non-transparent color */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
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
