<template>
  <div v-if="userId" id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/users">Users</router-link>
  </div>
  <div v-else></div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
  props: {
    msg: String
  },
  computed: {
    ...mapState({
      userId: state => state.auth.user.id
    })
  }
};
</script>

<style lang="scss" scoped>
#nav {
  padding: 30px;
  border-bottom: 1px solid black;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
