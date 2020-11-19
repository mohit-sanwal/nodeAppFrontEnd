<template>
    <div>
        <p> USER - {{data.email}}</p>
        <p></p>
        <p></p>
        <p></p>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Api from "../Api";


export default {
    name: "AddPost",
    data() {
        return {
            userId: "",
            data: {}
        }
    },
    activated() {
       this.getUserDetails(); 
    },
    methods: {
        getUserDetails() {
            this.userId = this.userAuthDetails._id
           if (this.userId) {
                Api.getUserDetails(this.userId, (res) => {
                    console.log("data", res.data.result[0]);
                    this.data = res.data.result[0]
                }, (err) => {
                });
           }
        }
    },
    computed: {
        ...mapGetters([
            "userAuthDetails",
        ]),
    },
}
</script>