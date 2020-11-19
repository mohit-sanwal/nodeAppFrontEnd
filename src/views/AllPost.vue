
<template>
    <div>
        <md-card v-for="(post,index) in allPost" v-bind:key="index">
            <md-card-header>
                <div class="md-title">Post number: {{index}}</div>
            </md-card-header>

            <md-card-content>
                {{post.post}}
            </md-card-content>

            <md-card-actions>
                <md-button>like</md-button>
                <md-button>dislike</md-button>
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
    methods: {
        getAllPost() {
            Api.getAllPost((res) => {
                if (res.data.length) {
                    allPost: res.data
                }
            }, (err) => {
            })
        }
    }
    
}
</script>
