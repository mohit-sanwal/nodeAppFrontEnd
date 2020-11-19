// import axios from "axios";
// import Api from "../../Api";

const accountState = {
    userAuthDetails: localStorage.userAuthDetails ? JSON.parse(localStorage.userAuthDetails) : "",
    loggedIn: localStorage.userAuthDetails ? true : false,
};

const getters = {
    userAuthDetails: state => state.userAuthDetails,
    loggedIn: state => state.loggedIn,
};

const actions = {

    logout({ commit }) {
        localStorage.removeItem("userAuthDetails");
        commit("logout");
    },

    loggedIn({ commit }, userAuthDetails) {
        let info = userAuthDetails;
        if (!info) {
            info = JSON.parse(localStorage.getItem("userAuthDetails"));
        }
        commit("loggedIn", info);
    },

};

const mutations = {
    loggedIn(state, userAuthDetails) {
        if (userAuthDetails) {
            localStorage.setItem("userAuthDetails", JSON.stringify(userAuthDetails));
            state.loggedIn = true;
            state.userAuthDetails = userAuthDetails
        }
    },
    logout(state) {
        state.loggedIn = false;
    },
};

export default {
    state: accountState,
    getters,
    actions,
    mutations,
};
