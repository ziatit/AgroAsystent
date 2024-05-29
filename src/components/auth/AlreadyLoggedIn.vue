<!-- src/components/konto/AlreadyLoggedIn.vue -->
<template>
    <div>
        <h1>Witaj w Agro-asystencie!</h1>
        <p>Jesteś już zalogowany jako {{ username }}</p>
        <router-link to="/user-screen">Przejdź do swojego konta</router-link>
    </div>
</template>