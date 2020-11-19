import Vue from "vue";
// import VueI18n from "vue-i18n";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Api from "./Api";
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Toasted from 'vue-toasted';
 

Vue.use(Toasted)

Vue.use(VueMaterial)



Vue.config.productionTip = false;
// Vue.use(VueI18n);

Api.init();

/*
const userLang = localStorage.lang ? localStorage.lang : "en";
const i18n = new VueI18n({
    locale: userLang,
    fallbackLocale: "en",
});

const loadedLanguages = []; // our default language that is preloaded

function setI18nLanguage(lang) {
    i18n.locale = lang;
    axios.defaults.headers.common["Accept-Language"] = lang;
    document.querySelector("html").setAttribute("lang", lang);
    return lang;
}

router.beforeEach((to, from, next) => {
    if (!loadedLanguages.includes(userLang)) {
        axios.get(`${process.env.VUE_APP_RESOURCE_BUNDLE_PATH}/${userLang}.json`).then((response) => {
            i18n.setLocaleMessage(userLang, response.data);
            loadedLanguages.push(userLang);
            setI18nLanguage(userLang);

            checkLoginAndProceed(to, from, next);
        }, (error) => {
            console.log(error);
            checkLoginAndProceed(to, from, next);
        });
    } else {
        checkLoginAndProceed(to, from, next);
    }
    store.dispatch("saveConfigData");
});
*/

router.beforeEach((to, from, next) => {

checkLoginAndProceed(to, from, next)

})

function checkLoginAndProceed(to, from, next) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.loggedIn) {
            next();
        } else {
            next({
                path: "/login",
                query: { back: to.fullPath },
            });
        }
    } else {
        next();
    }
}

let filesLoaded = false;



new Vue({
    router,
    store,
    // i18n,
    render: h => h(App),
}).$mount("#app");

// require("./assets/scss/style.scss");

function updateOnlineStatus() {
    if (navigator.onLine) {
        document.body.classList.remove("ofl");
    } else {
        document.body.classList.add("ofl");
    }
    const condition = navigator.onLine ? "online" : "offline";
    window.showToast(`You are ${condition}`, 2000);
}

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
