import { defineStore } from "pinia";
export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        loggedInUser: null,
    }),
    getters: {
        getLoggedInUser() {
            return this.loggedInUser;
        },
    },
    actions: {
        setLoggedInUser(user) {
            this.loggedInUser = user;
        },
    },
});