<template>
    <div>
        <textarea name="" id="" cols="30" placeholder="add your post" rows="10" v-model="post.post"></textarea>
        <input type="file"  @change="uploadImage" id="file-input" >
        <button @click="postStory"> Post </button>
    </div>
    
</template>

<script>
import { mapGetters } from "vuex";
import Api from "../Api";


export default {
    name: "AddPost",
    data() {
        return {
            post: {
                post: '',
                userId: '',
                postImage: null
            },
            selectedFile: null
        }
    },
    activated() {

    },
    methods: {
       uploadImage(event){
            this.selectedFile = event.target.files[0];
            console.log("this.selectedFile", this.selectedFile);
       },
        postStory() {
           if (this.post.post) {
                const fd = new FormData();
                fd.append('postImage', this.selectedFile, this.selectedFile.name);
                fd.append('post', this.post.post);
                fd.append('userId', this.userAuthDetails._id )
                // console.log("fd", fd)
                // this.post.postImage = fd
                // console.log("this.data", this.post, this.userAuthDetails._id);
                    let config = {
                        header : {
                            'Content-Type' : 'multipart/form-data'
                        }
                    }
                // this.post.userId = this.userAuthDetails._id;
                Api.addStory(fd, config, (data) => {
                    console.log("data", data);
                    if (data) {
                        this.$toasted.show('successfully posted', {duration: 2000});
                        this.$router.push("/");
                    }
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