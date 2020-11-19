<template>

    <div class="container">
    <div class="row vertical-offset-100">
    	<div class="col-md-4 col-md-offset-4">
    		<div class="panel panel-default">
			  	<div class="panel-heading">
			    	<h3 class="panel-title">Please sign up</h3>
			 	</div>
			  	<div class="panel-body">
			    	<form accept-charset="UTF-8" role="form" >
                    <fieldset>
			    	  	<div class="form-group">
			    		    <input class="form-control" v-model="data.email" placeholder="E-mail" name="email" type="text">
			    		</div>
			    		<div class="form-group">
			    			<input class="form-control" v-model="data.password" placeholder="Password" name="password" type="password" value="">
			    		</div>
			    		<!-- <div class="checkbox">
			    	    	<label>
			    	    		<input name="remember" type="checkbox" value="Remember Me"> Remember Me
			    	    	</label>
			    	    </div> -->
                         <router-link to="/login"> Login </router-link>
			    		<input class="btn btn-lg btn-success btn-block"  @click="userRegistration" type="button" value="Register">
			    	</fieldset>
			      	</form>
			    </div>
			</div>
		</div>
	</div>
</div>
   
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import Api from "../Api";

export default {
    data() {
        return {
            data: {
                email: "",
                password: ""
            }
        };
    },
    deactivated() {
        this.skipTruecaller = false;
    },
    computed: {
        ...mapGetters([
            "userAuthDetails",
        ]),
    },
    watch: {
       
    },
    mounted() {
       
    },
    methods: {
        userRegistration() {
            Api.register(this.data, (res) => {
               this.$store.dispatch("loggedIn", res.data.tokens[0].token);
               this.$router.push("/");
            },(error) => {

            })
        }
    },
    components: {
        // Modal: () => import("../components/Modal"),
    },
};

</script>

<style scoped>
body{
    background: url(http://mymaplist.com/img/parallax/back.png);
	background-color: #444;
    background: url(http://mymaplist.com/img/parallax/pinlayer2.png),url(http://mymaplist.com/img/parallax/pinlayer1.png),url(http://mymaplist.com/img/parallax/back.png);    
}

.vertical-offset-100{
    padding-top:100px;
}
</style>
