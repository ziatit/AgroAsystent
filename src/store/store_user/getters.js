import {IS_USER_AUTHENTICATED, GET_USERNAME } from "../storeconstants.js";

export default {
    [IS_USER_AUTHENTICATED](state) {
        return state.authenticated;
    },

    [GET_USERNAME](state) {
        return state.username;
    }
}