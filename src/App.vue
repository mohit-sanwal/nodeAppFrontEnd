<template>
  <div id="app">
    <keep-alive><router-view /></keep-alive>
  </div>
</template>

<script>
import "./assets/js/script";

export default {
    // watch: {
    // },
    data() {
        return {
        };
    },
    activated() {
    },
    deactivated() {
    },
    created() {
    },
    mounted() {
        this.$store.dispatch("loggedIn");
    },
    updated() {
        if (["OTP"].includes(this.$route.name)) {
            document.body.classList.add("white");
        } else {
            document.body.classList.remove("white");
        }
    },
    methods: {
    },
    computed: {
    },
    components: {
    },
};
</script>
