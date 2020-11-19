<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">My Title</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
           <router-link to="/"><md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Dashboard</span>
          </md-list-item></router-link>

           <router-link to="/about"><md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">About</span>
          </md-list-item></router-link>
          
          <router-link to="/all-users"><md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">All Users</span>
          </md-list-item></router-link>

         <router-link to="/add-post"> <md-list-item>
            <md-icon>Add Post</md-icon>
            <span class="md-list-item-text">Add Post</span>
          </md-list-item> </router-link> 

          <router-link to="/my-post"> <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">My Post</span>
          </md-list-item> </router-link>

           <md-list-item @click="logOut()">
            <md-icon>logout</md-icon>
            <span class="md-list-item-text">logOut</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
  export default {
    name: 'Layout',
    data: () => ({
      menuVisible: false
    }),
    methods: {
      toggleMenu () {
        this.menuVisible = !this.menuVisible
      },
      logOut() {
        this.$store.dispatch("logout");
        this.$router.push("/login");
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-app {
    min-height: 350px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>