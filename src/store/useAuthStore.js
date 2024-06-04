// src/stores/useAuthStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../supabase";

export const useAuthStore = defineStore(
    "auth",
    {
        id: "authStore",
        state: () => ({
            _session: null,
        }),
        getters:
        {
            session: (state) => state._session,
            isLoggedIn: (state) => !state._session,
        },
        actions: {
            async signIn(email, password) {
                console.log("signing in");
                const { session, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                this.session = session;
                console.log("signed in, session:\n", this.session);
            },
            async signOut() {
                console.log("signing out");
                const { error } = await supabase.auth.signOut();
                if (error) throw error;
                this.session = null;
                console.log("signed out, session:\n", this.session);
            },
        },
    },
    {
        persist: true,
    }
);
