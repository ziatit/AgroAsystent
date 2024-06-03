Jasne, oto kod z dodanymi komentarzami, które wyjaśniają, co każda część robi:

### 1. Konfiguracja projektu Vue.js

### 2. Instalacja Axios

```sh
npm install axios
```

### 3. Konfiguracja Axios

`src/services/api.js`:

```js
import axios from 'axios';

// Tworzymy instancję Axios z domyślną konfiguracją
const api = axios.create({
  baseURL: 'https://api.yourservice.com', // Zastąp własnym URL API
  headers: {
    'Content-Type': 'application/json', // Ustawiamy domyślny nagłówek Content-Type
  },
});

// Dodajemy interceptor do każdego żądania, aby dodać token autoryzacyjny
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Pobieramy token z localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Dodajemy token do nagłówków
  }
  return config; // Zwracamy zmodyfikowaną konfigurację
});

export default api; // Eksportujemy instancję Axios
```

### 4. Logowanie użytkownika

`src/components/Login.vue`:

```vue
<template>
  <div>
    <!-- Formularz logowania -->
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import api from '../services/api'; // Importujemy instancję Axios

export default {
  data() {
    return {
      username: '', // Pole na nazwę użytkownika
      password: '', // Pole na hasło
    };
  },
  methods: {
    async login() {
      try {
        // Wysyłamy żądanie logowania do API
        const response = await api.post('/auth/login', {
          username: this.username,
          password: this.password,
        });
        // Jeśli logowanie się powiedzie, zapisujemy token w localStorage
        localStorage.setItem('token', response.data.token);
        // Przekierowujemy użytkownika na stronę dashboardu
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login failed', error); // Obsługa błędów
      }
    },
  },
};
</script>
```

### 5. Middleware do ochrony tras

`src/router/index.js`:

```js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Login from '../components/Login.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'Home', component: Home }, // Trasa do strony głównej
  { path: '/login', name: 'Login', component: Login }, // Trasa do logowania
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, // Dodajemy meta do ochrony trasy
  },
];

const router = new VueRouter({
  mode: 'history', // Ustawiamy tryb historii
  base: process.env.BASE_URL,
  routes,
});

// Middleware do sprawdzania autoryzacji przed każdą trasą
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // Sprawdzamy, czy trasa wymaga autoryzacji
  const token = localStorage.getItem('token'); // Pobieramy token z localStorage

  if (requiresAuth && !token) {
    next('/login'); // Jeśli trasa wymaga autoryzacji, ale nie ma tokenu, przekierowujemy na stronę logowania
  } else {
    next(); // W przeciwnym razie kontynuujemy na wybraną trasę
  }
});

export default router;
```

### 6. Ochrona Dashboard

`src/views/Dashboard.vue`:

```vue
<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard!</p> <!-- Treść strony dashboardu -->
  </div>
</template>

<script>
export default {
  mounted() {
    // Można dodać dodatkowe logiki jeśli jest to konieczne
  },
};
</script>
```

### 7. Wylogowanie użytkownika

Dodaj funkcję do wylogowania użytkownika, np. w komponencie nawigacyjnym:

`src/components/Logout.vue`:

```vue
<template>
  <div>
    <button @click="logout">Logout</button> <!-- Przycisk do wylogowania -->
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token'); // Usuwamy token z localStorage
      this.$router.push('/login'); // Przekierowujemy na stronę logowania
    },
  },
};
</script>
```

### 8. Integracja komponentu logout

Możesz teraz dodać `Logout.vue` do odpowiedniego miejsca w swoim projekcie, np. w nagłówku lub nawigacji.

### 9. Podsumowanie

W powyższym przykładzie omówiliśmy podstawowe kroki do zarządzania sesjami użytkownika w Vue.js przy użyciu JWT. Mamy konfigurację Axios do obsługi żądań HTTP z tokenami, komponent logowania do uwierzytelniania użytkowników, middleware do ochrony tras oraz funkcję wylogowania. Pamiętaj, że w rzeczywistym projekcie mogą być potrzebne dodatkowe zabezpieczenia i logika biznesowa.