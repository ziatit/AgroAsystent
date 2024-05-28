<template>
    <div>
        <h1>Register</h1>
        <form @submit="submitForm">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../../supabase.js';

let username = ref('');
let password = ref(''); 
const router = useRouter();

const submitForm = async (event) => {
    event.preventDefault()
    console.log('Username:', username.value);
    console.log('Password:', password.value);

    try {
        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    username: username.value,
                    userpass: password.value,
                }
            ])
            .single();

        if (error) {
            console.log('Registration failed');
        } else {
            console.log('Registration successful');
            router.push({ name: 'MainPage' });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
</script>