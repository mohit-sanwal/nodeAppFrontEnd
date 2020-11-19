<template>
   <div>
        <md-card v-for="(post,index) in myPost" v-bind:key="index">
            <md-card-header>
                <div class="md-title">Post number: {{index + 1}}</div>
            </md-card-header>

            <md-card-content>
                {{post.post}}
            </md-card-content>

            <md-card-actions>
                <!-- <md-button>like</md-button>
                <md-button>dislike</md-button> -->
                <img :src="getImage(post.postImage)"  v-if="post.postImage" />
            </md-card-actions>
        </md-card>
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
            myPost: []
        }
    },
    activated() {
       this.getMyPost(); 
    },
    methods: {
        getImage(image) {
            return `http://localhost:3000/${image}`
        },
        getMyPost() {
            this.userId = this.userAuthDetails._id
           if (this.userId) {
                Api.getMyPost(this.userId, (res) => {
                    console.log("data", res.data.result[0]);
                    this.myPost = res.data.result
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

<style lang="scss" scoped>
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>