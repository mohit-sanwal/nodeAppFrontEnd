<template>
    <div>
        <md-card v-for="(post,index) in allPost" v-bind:key="index">
            <md-card-header>
                <div class="md-title">Post number: {{index + 1}}</div>
            </md-card-header>

            <md-card-content>
                {{post.post}}
                <img :src="getImage(post.postImage)"  v-if="post.postImage" />
            </md-card-content>

            <md-card-actions>
                <!-- <md-button>like</md-button>
                <md-button>dislike</md-button> -->
            </md-card-actions>
        </md-card>
    </div>
</template>


<script>
import Api from "../Api";
export default {
    data() {
        return {
            allPost: []
        }
    },
    activated() {
        this.getAllPost();
    },
    methods: {
        getImage(image) {
            console.log("called");
            return `http://localhost:3000/${image}`
        },
        getAllPost() {
            Api.getAllPost((res) => {
                if (res.data.length) {
                    this.allPost = res.data
                }
            }, (err) => {
            })
        }
    }
    
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