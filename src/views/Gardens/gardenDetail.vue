<template>
    <div>
        <h1>{{ props.id }}</h1>
        <p v-if="garden">Lokalizacja: {{ garden.location }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../store/users.js';

const userStore = useUserStore();
const username = ref(userStore.getLoggedInUser);
const garden = ref(null);


const props = defineProps({
    id: {
        type: String,
        default: ''
    }
}
)

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:3000/users/' + username.value + 'id');
        const user = await response.json();
        const fetchedGarden = user.gardens.find(g => g.gardenName === props.id);
        garden.value = fetchedGarden;
        console.log(garden);
    } catch (error) {
        console.error('Error:', error);
    }
});
</script>