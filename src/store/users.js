// src/store/users.js
import { defineStore } from "pinia";
import { supabase } from '../supabase'

export const useUserStore = defineStore({
    id: "userStore",
    state: () => ({
        session: null,
    }),
    actions: {
        setSession(session) {
            this.session = session;
        },
        clearSession() {
            this.session = null;
        },
    },
});
