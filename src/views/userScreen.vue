<template>
    <div class="container">
        <h2 class="greeting">Hello, {{ username }}</h2>
        <div class="content">
            <router-link to="/ogrody" class="garden-link">Go to Gardens</router-link>
            <div class="task-list">
                <p> Wstawić kalendarz</p>
                <p> Wstawić zadania</p>
                <button class="create" @click="showcreateForm" >Dodaj Ogród</button>
            </div>
            <gardenForm v-if ="showCreate"/>
        </div>
        <div class="spacer"></div>
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
        showCreate.value = !showCreate.value;
        console.log(showCreate.value);
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
}

.greeting {
    text-align: center;
    color: #666;
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

.task-list p {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
}
</style>
