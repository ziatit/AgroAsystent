// src/stores/useAuthStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../supabase";

export const useAuthStore = defineStore(
    "auth",
    {
        id: "authStore",
        state: () => ({
            _data: null,
        }),
        getters:
        {
            data: (state) => state._data,
            isLoggedIn: (state) => !state._data,
        },
        actions: {
            async signIn(email, password) {
                console.log("signing in");
                await supabase.auth.signInWithPassword({ email, password })
                    .then(({ data, error }) => {
                        if (error) throw error;
                        this._data = data;
                        console.log("signed in, data:\n", this.data);
                    });
            },
            async signOut() {
                console.log("signing out");
                const { error } = await supabase.auth.signOut();
                if (error) throw error;
                this._data = null;
                console.log("signed out, data:\n", this._data);
                // router push needed here
            },
        },
    },
    {
        persist: true,
    }
);
