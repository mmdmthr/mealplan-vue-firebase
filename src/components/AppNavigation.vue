<template>
  <span>
    <v-navigation-drawer
      app
      v-model="drawer"
      class="brown lighten-2"
      dark
      disable-resize-watcher
    >
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-item :key="index">
            <router-link :to="item.path">
              <v-list-item-content class="white--text">
                {{ item.title }}
              </v-list-item-content>
            </router-link>
          </v-list-item>
          <v-divider :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="brown darken-4" dark>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <router-link to="/">
        <v-toolbar-title to="/" class="white--text">{{
          appTitle
        }}</v-toolbar-title>
      </router-link>
      <v-btn text class="hidden-sm-and-down" to="/menu">Menu</v-btn>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <div v-if="!isAuthenticated" class="hidden-sm-and-down">
        <v-btn text class="hidden-sm-and-down" to="/sign-in">SIGN IN</v-btn>
        <v-btn color="brown lighten-3" class="hidden-sm-and-down" to="/join"
          >JOIN</v-btn
        >
      </div>
      <div v-else>
        <v-btn text to="/about" class="mx-1">PROFILE</v-btn>
        <v-btn outlined color="white" class="mx-1" @click="logout"
          >Logout</v-btn
        >
      </div>
    </v-app-bar>
  </span>
</template>

<script>
export default {
  name: 'AppNavigation',
  data() {
    return {
      appTitle: 'Meal Prep',
      drawer: false,
      items: [
        { title: 'Menu', path: '/menu' },
        { title: 'Sign In', path: '/sign-in' },
        { title: 'Join', path: '/join' },
        { title: 'Profile', path: '/about' },
      ],
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      return this.$store.dispatch('userLogout');
    },
  },
};
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>
