

<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head>Gender</md-table-head>
        <md-table-head>Job Title</md-table-head>
      </md-table-row>

      <md-table-row v-for="(user, index) in users" v-bind:key="user._id">
        <md-table-cell md-numeric> {{index + 1}}</md-table-cell>
        <md-table-cell>{{user.email}}</md-table-cell>
        <md-table-cell>sdubbin0@geocities.com</md-table-cell>
        <md-table-cell>Male</md-table-cell>
        <md-table-cell>Assistant Media Planner</md-table-cell>
      </md-table-row>

    </md-table>
  </div>
</template>

<script>
import Api from "../Api";
export default {
    name: 'AllUsers',
    data() {
      return {
        users: []
      };
    },
    activated() {
       this.getAllUsers();  
    },
    methods: {
        getAllUsers() {
          Api.getAllUsers((res) => {
            console.log(res)
            if (res.data.length) {
                this.users = res.data
            }
          },(error) => {

          })
        }
    },
}
</script>

<style>

</style>
