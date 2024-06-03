<!-- src/components/auth/RegisterForm.vue -->

<script setup>
import { ref } from "vue";
import { supabase } from '../../supabase.js';

let email = ref("");
let password = ref("");
let firstName = ref("");

async function createAccount() {
    const { data, error } = await supabase.auth.signUp(
        {
            email: email.value,
            password: password.value,
            options: {
                data: {
                    first_name: firstName.value
                }
            }
        }
    )
    if (error)
    {
        console.log(error);
    }
    else
    {
        console.log(data);
    }
}
</script>



<template>
	<h1>Register a new account:</h1>
	<div class="inputContainer">
		<label for="email"> Email: </label>
		<input type="email" id="email" v-model="email">
	</div>

	<div class="inputContainer">
		<label for="email"> Password: </label>
		<input type="password" id="password" v-model="password">
	</div>

	<div class="inputContainer">
		<label for="firstName"> First Name </label>
		<input type="firstName" id="firstName" v-model="firstName">
	</div>

	<div class="buttonContainer">
		<button @click="createAccount"> Create </button>
	</div>
</template>

<style scoped>
.inputContainer {
	display: flex;
	flex-direction: column;
}

input {
	font-size: 1.5em;
}

.buttonContainer {
	display: flex;
	flex-direction: column;
	margin-top: 1em;
}

button {
	margin-bottom: 1em;
	padding: 1em 2em 1em 2em;
}
</style>


<!-- Old implementation -->
<!-- 
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

<template>
    <div class="register-container">
        <div class="register">
            <h1>Register</h1>
            <form @submit="submitForm">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
                <button type="submit">Register</button>
            </form>
        </div>
    </div>
</template>


<style scoped>
.register-container {
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 300px;
    margin: 0 auto;
}

.register {
    background-color: #334;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #556B2F;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center;
    color: #F5F5DC;
}
</style> -->